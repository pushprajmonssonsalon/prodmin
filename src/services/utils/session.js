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
  if (redirecting || window.location.pathname === "/login") return;
  redirecting = true;
  clearSession();
  toast.error("Session expired. Please log in again.");
  setTimeout(() => window.location.replace("/login"), 600);
};

const LOGIN_URL = /login/i;

export const attachSessionInterceptor = (instance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      const url = error?.config?.url || "";
      if (status === 401 && !LOGIN_URL.test(url)) handleSessionExpired();
      return Promise.reject(error);
    }
  );
};
