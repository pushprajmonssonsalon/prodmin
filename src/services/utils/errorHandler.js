import axios from "axios";
import toast from "react-hot-toast";

const DEFAULT_MESSAGE = "Something went wrong. Please try again.";
const reportedErrors = new WeakSet();
const normalizedErrors = new WeakMap();

const messageFrom = (value) => {
  if (typeof value === "string" && value.trim() && !/<[^>]+>/.test(value)) {
    return value.trim();
  }
  return null;
};

const validationMessage = (errors, depth = 0) => {
  if (depth > 3 || !errors) return null;
  const message = messageFrom(errors) || messageFrom(errors.message) || messageFrom(errors.msg);
  if (message) return message;
  if (typeof errors !== "object") return null;
  for (const value of Object.values(errors)) {
    const nestedMessage = validationMessage(value, depth + 1);
    if (nestedMessage) return nestedMessage;
  }
  return null;
};

export const normalizeError = (error) => {
  if (error?.name === "ApiError") return error;
  const isObject = error !== null && typeof error === "object";
  if (isObject && normalizedErrors.has(error)) return normalizedErrors.get(error);
  const status = error?.response?.status ?? error?.status;
  const data = error?.response?.data;
  let message = messageFrom(data?.message) || messageFrom(data?.error?.message)
    || messageFrom(data?.error) || validationMessage(data?.errors) || messageFrom(data);

  if (!message && (error?.code === "ECONNABORTED" || error?.code === "ETIMEDOUT")) {
    message = "The request timed out. Please try again.";
  }
  if (!message && axios.isAxiosError(error) && !error.response && error.request) {
    message = "Unable to connect. Check your connection and try again.";
  }
  if (!message && status) {
    message = {
      400: "The request could not be processed. Please check your input.",
      401: "Authentication failed. Please log in again.",
      403: "You do not have permission to perform this action.",
      404: "The requested information could not be found.",
      409: "This action conflicts with existing information.",
      422: "Please check your input and try again.",
      429: "Too many requests. Please wait and try again.",
    }[status] || "The server could not complete the request. Please try again.";
  }
  const normalized = new Error(message || messageFrom(error?.message) || messageFrom(error) || DEFAULT_MESSAGE);
  normalized.name = "ApiError";
  normalized.cause = error;
  normalized.status = status;
  normalized.code = error?.code;
  normalized.response = error?.response;
  normalized.config = error?.config;
  normalized.details = data?.errors;
  normalized.cancelled = axios.isCancel(error) || error?.code === "ERR_CANCELED";
  normalized.sessionExpired = error?.sessionExpired;
  if (isObject) normalizedErrors.set(error, normalized);
  return normalized;
};

// Shared request middleware. The selector preserves each API's success format.
export const withErrorHandling = async (request, select = (data) => data) => {
  try {
    const response = await request();
    if (response.data?.success === false) {
      const error = new Error(DEFAULT_MESSAGE);
      error.response = response;
      error.config = response.config;
      throw error;
    }
    return select(response.data, response);
  } catch (error) {
    throw normalizeError(error);
  }
};

// Report at the UI boundary, once, while keeping forms and existing data intact.
export const handleError = (error, options) => {
  const normalized = normalizeError(error);
  if (!normalized.cancelled && !normalized.sessionExpired && !reportedErrors.has(normalized)) {
    toast.error(normalized.message, options);
    reportedErrors.add(normalized);
  } else if ((normalized.cancelled || normalized.sessionExpired) && options?.id) {
    toast.dismiss(options.id);
  }
  return normalized;
};
