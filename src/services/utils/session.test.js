import toast from "react-hot-toast";
import { attachSessionInterceptor } from "./session";
import { handleError } from "./errorHandler";

jest.mock("react-hot-toast", () => ({ error: jest.fn(), dismiss: jest.fn() }));
jest.mock("axios", () => ({ isAxiosError: () => false, isCancel: () => false }));

const tokenFor = (payload) => `header.${btoa(JSON.stringify(payload))}.signature`;
let rejectResponse;

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  localStorage.clear();
  window.history.replaceState({}, "", "/orders");
  attachSessionInterceptor({ interceptors: { response: { use: (success, failure) => { rejectResponse = failure; } } } });
});
afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
  window.history.replaceState({}, "", "/");
});

test.each([
  ["/admin/login", "opaque-token"],
  ["/orders", tokenFor({ exp: Math.floor(Date.now() / 1000) + 3600 })],
])("keeps existing login and valid-token 401 behavior", async (url, token) => {
  localStorage.setItem("protoken", token);
  const error = { config: { url, headers: { Authorization: `Bearer ${token}` } }, response: { status: 401, data: { message: "Unauthorized" } } };
  await expect(rejectResponse(error)).rejects.toBe(error);
  expect(localStorage.getItem("protoken")).toBe(token);
  expect(error.sessionExpired).toBeUndefined();
  handleError(error);
  expect(toast.error).toHaveBeenCalledTimes(1);
});

test("expired sessions keep the existing redirect and produce one notification", async () => {
  const token = tokenFor({ exp: 1 });
  localStorage.setItem("protoken", token);
  localStorage.setItem("isAdmin", "pro");
  const error = { config: { url: "/orders", headers: { Authorization: `Bearer ${token}` } }, response: { status: 401 } };
  await expect(rejectResponse(error)).rejects.toBe(error);
  handleError(error);
  expect(error.sessionExpired).toBe(true);
  expect(localStorage.getItem("protoken")).toBeNull();
  expect(localStorage.getItem("isAdmin")).toBe("pro");
  expect(toast.error).toHaveBeenCalledTimes(1);
  expect(toast.error).toHaveBeenCalledWith("Session expired. Please log in again.");
  expect(jest.getTimerCount()).toBe(1);
});
