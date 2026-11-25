import axios from "axios";
import apiRequest from "./user.services";

jest.mock("axios", () => {
  const instance = { request: jest.fn(), interceptors: { response: { use: jest.fn() } } };
  return {
    create: jest.fn(() => instance),
    isAxiosError: (error) => error?.isAxiosError === true,
    isCancel: () => false,
  };
});

const instance = axios.create.mock.results[0].value;

beforeEach(() => { jest.clearAllMocks(); localStorage.clear(); });

test("keeps the franchise response and authentication contract", async () => {
  localStorage.setItem("frntoken", "test-token");
  const data = { data: [{ id: 1 }], totalLeads: 1 };
  instance.request.mockResolvedValueOnce({ data });
  await expect(apiRequest("post", "getAllLeads", {}, { page: 1 })).resolves.toBe(data);
  expect(instance.request).toHaveBeenCalledWith({
    method: "post", url: "getAllLeads", data: {}, params: { page: 1 },
    headers: { Authorization: "Bearer test-token" },
  });
});

test("throws an Error with the server message instead of a string or object", async () => {
  instance.request.mockRejectedValueOnce({ response: { status: 401, data: { message: "Invalid credentials" } } });
  await expect(apiRequest("post", "login", {})).rejects.toMatchObject({
    name: "ApiError", message: "Invalid credentials", status: 401,
  });
});
