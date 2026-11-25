import toast from "react-hot-toast";

// Keys that hold credentials. `isAdmin` (selected portal) is intentionally kept
// so the login page opens for the same portal after an expiry.
const SESSION_KEYS = ["crmtoken", "role", "protoken", "prorole", "frntoken"];

let redirecting = false;

export const clearSession = () => {
  try {
    SESSION_KEYS.forEach((key) => localStorage.removeItem(key));
  } catch (e) {
    // ignore storage errors
  }
};

// Returns true only when the token is a decodable JWT whose `exp` is in the past.
// Non-JWT tokens return false (expiry is then detected through a 401 response).
export const isTokenExpired = (token) => {
  if (!token) return false;
  try {
    const part = token.split(".")[1];
    if (!part) return false;
    const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")));
    return typeof payload.exp === "number" && payload.exp * 1000 <= Date.now();
  } catch (e) {
    return false;
  }
};

export const handleSessionExpired = () => {
  if (redirecting || window.location.pathname === "/") return;
  redirecting = true;
  clearSession();
  toast.error("Session expired. Please log in again.");
  setTimeout(() => window.location.replace("/"), 600);
};

const LOGIN_URL = /login/i;

const getBearerToken = (config) => {
  const headers = config?.headers;
  const value = headers?.get?.("Authorization") ?? headers?.Authorization ?? headers?.authorization;
  return typeof value === "string" ? value.replace(/^Bearer\s+/i, "") : null;
};

// A 401 only means "session expired" when the request actually carried a token
// and that token is not a still-valid JWT. A 401 with a valid, unexpired token is
// a permission error from the server, so it must not log the user out.
const isSessionExpiry = (error) => {
  if (error?.response?.status !== 401) return false;
  const url = error?.config?.url || "";
  if (LOGIN_URL.test(url)) return false;
  const token = getBearerToken(error.config);
  if (!token) return false;
  if (isTokenExpired(token)) return true;
  // Decodable JWT with a future/absent exp -> not an expiry
  try {
    const part = token.split(".")[1];
    if (part) {
      JSON.parse(atob(part.replace(/-/g, "+").replace(/_/g, "/")));
      return false;
    }
  } catch (e) {
    // not a JWT: fall through
  }
  return true;
};

export const attachSessionInterceptor = (instance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        // eslint-disable-next-line no-console
        console.warn("[session] 401 from", error?.config?.url, error?.response?.data);
      }
      if (isSessionExpiry(error) && window.location.pathname !== "/") {
        error.sessionExpired = true;
        handleSessionExpired();
      }
      return Promise.reject(error);
    }
  );
};
