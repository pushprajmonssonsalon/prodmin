import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import toast from "react-hot-toast";
import apiRequest from "../services/franchise/user.services";
import Login from "./Login";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({ useNavigate: () => mockNavigate }));
jest.mock("axios", () => {
  const request = jest.fn();
  request.isAxiosError = () => false;
  request.isCancel = () => false;
  return request;
});
jest.mock("../services/franchise/user.services", () => jest.fn());
jest.mock("react-hot-toast", () => ({ error: jest.fn() }));

beforeEach(() => { jest.clearAllMocks(); localStorage.clear(); });

test.each(["crm", "pro", "franchise"])("a failed %s login shows the error without saving a token or navigating", async (portal) => {
  localStorage.setItem("isAdmin", portal);
  const error = { response: { status: 401, data: { message: "Invalid credentials" } } };
  axios.mockRejectedValueOnce(error);
  apiRequest.mockRejectedValueOnce(error);
  const { container } = render(<Login />);
  const usernames = screen.getAllByPlaceholderText("Username");
  const passwords = screen.getAllByPlaceholderText("Password");
  fireEvent.change(usernames[usernames.length - 1], { target: { value: "test-user" } });
  fireEvent.change(passwords[passwords.length - 1], { target: { value: "test-password" } });
  fireEvent.submit(container.querySelectorAll("form")[1]);
  await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Invalid credentials", undefined));
  expect(toast.error).toHaveBeenCalledTimes(1);
  expect(mockNavigate).not.toHaveBeenCalled();
  for (const key of ["crmtoken", "protoken", "frntoken"]) expect(localStorage.getItem(key)).toBeNull();
});
