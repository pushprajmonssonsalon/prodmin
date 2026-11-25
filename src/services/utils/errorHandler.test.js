import axios from "axios";
import toast from "react-hot-toast";
import API_REQUEST from "./axios.utils";
import { handleError, normalizeError, withErrorHandling } from "./errorHandler";

jest.mock("axios", () => {
  const request = jest.fn();
  request.isAxiosError = (error) => error?.isAxiosError === true;
  request.isCancel = (error) => error?.code === "ERR_CANCELED";
  return request;
});
jest.mock("react-hot-toast", () => ({ error: jest.fn(), dismiss: jest.fn() }));

beforeEach(() => jest.clearAllMocks());

test.each([
  { success: true, data: [{ id: 1 }] },
  { data: { orders: [], totalOrders: 0 } },
  { success: true, data: false },
  { success: true, data: null },
])("preserves the CRM/PRO successful response format: %j", async (body) => {
  axios.mockResolvedValueOnce({ data: body });
  await expect(API_REQUEST("/test", "post", { name: "test" }, "token")).resolves.toEqual(body.data);
  expect(axios).toHaveBeenCalledWith(expect.objectContaining({
    method: "post", url: "/test", data: { name: "test" },
    headers: { Authorization: "Bearer token" }, timeout: 10000,
  }));
});

test("preserves the complete payload for APIs using the default selector", async () => {
  const body = { token: "token", data: [1], totalLeads: 1 };
  await expect(withErrorHandling(() => Promise.resolve({ data: body }))).resolves.toBe(body);
});

test("can preserve the complete Axios response for existing direct callers", async () => {
  const response = { status: 200, data: { data: [1] } };
  await expect(withErrorHandling(() => Promise.resolve(response), (data, res) => res)).resolves.toBe(response);
});

test("rejects HTTP failures with the server message and original details", async () => {
  const original = { response: { status: 422, data: { message: "SKU is required", errors: { sku: "Required" } } } };
  axios.mockRejectedValueOnce(original);
  await expect(API_REQUEST("/test", "post")).rejects.toMatchObject({
    name: "ApiError", message: "SKU is required", status: 422,
    response: original.response, details: { sku: "Required" }, cause: original,
  });
  expect(toast.error).not.toHaveBeenCalled();
});

test("rejects explicit application failures even with an HTTP 200", async () => {
  axios.mockResolvedValueOnce({ status: 200, data: { success: false, message: "Already exists", data: { id: 1 } } });
  await expect(API_REQUEST("/test", "post")).rejects.toThrow("Already exists");
});

test.each([
  [{ code: "ECONNABORTED", message: "timeout" }, "The request timed out. Please try again."],
  [{ isAxiosError: true, request: {}, message: "Network Error" }, "Unable to connect. Check your connection and try again."],
  [{ response: { status: 403, data: {} } }, "You do not have permission to perform this action."],
  [{ response: { status: 422, data: { errors: [{ msg: "Invalid phone number" }] } } }, "Invalid phone number"],
  [{ response: { status: 422, data: { errors: { sku: ["SKU is required"] } } } }, "SKU is required"],
  [{ response: { status: 502, data: "<html>Bad gateway</html>" } }, "The server could not complete the request. Please try again."],
  [null, "Something went wrong. Please try again."],
  ["Upload failed", "Upload failed"],
])("normalizes failures into useful messages", (error, message) => {
  expect(normalizeError(error)).toBeInstanceOf(Error);
  expect(normalizeError(error).message).toBe(message);
});

test("reports an error once, including when it crosses multiple catches", () => {
  const original = new Error("Upload failed");
  const error = normalizeError(original);
  expect(handleError(error)).toBe(error);
  handleError(original);
  handleError(error, { id: "loading" });
  expect(toast.error).toHaveBeenCalledTimes(1);
  expect(toast.dismiss).not.toHaveBeenCalled();
});

test.each([{ code: "ERR_CANCELED" }, { sessionExpired: true }])("does not duplicate session or cancellation notifications", (error) => {
  handleError(error, { id: "loading" });
  expect(toast.error).not.toHaveBeenCalled();
  expect(toast.dismiss).toHaveBeenCalledWith("loading");
});

test("replaces a loading toast with the error", () => {
  handleError(new Error("Could not save"), { id: "saving" });
  expect(toast.error).toHaveBeenCalledWith("Could not save", { id: "saving" });
});
