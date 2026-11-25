import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import toast from "react-hot-toast";
import axios from "axios";
import Notification from "./Notification";

jest.mock("axios", () => {
  const request = jest.fn();
  request.isAxiosError = () => false;
  request.isCancel = () => false;
  return request;
});
jest.mock("react-hot-toast", () => ({ error: jest.fn(), success: jest.fn() }));
jest.mock("../components/Layout", () => ({ children }) => <div>{children}</div>);
jest.mock("../components/commoncomponents/TopBar", () => () => null);
jest.mock("../components/commoncomponents/Wrapper", () => ({ children }) => <div>{children}</div>);

beforeEach(() => jest.clearAllMocks());

test("a failed notification preserves input, shows the server error, and enables retry", async () => {
  axios.mockRejectedValueOnce({ response: { status: 500, data: { message: "Notification service unavailable" } } });
  const { container } = render(<Notification />);
  fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Test title" } });
  fireEvent.change(screen.getByLabelText("Text"), { target: { value: "Test body" } });
  fireEvent.change(screen.getByLabelText("Image"), { target: { value: "https://example.com/image.png" } });
  fireEvent.submit(container.querySelector("form"));
  await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Notification service unavailable", undefined));
  expect(toast.success).not.toHaveBeenCalled();
  expect(screen.getByLabelText("Title")).toHaveValue("Test title");
  expect(screen.getByLabelText("Text")).toHaveValue("Test body");
  expect(container.querySelector('button[type="submit"]')).toBeEnabled();

  axios.mockResolvedValueOnce({ data: { success: true, data: true } });
  fireEvent.submit(container.querySelector("form"));
  await waitFor(() => expect(toast.success).toHaveBeenCalledTimes(1));
  expect(screen.getByLabelText("Title")).toHaveValue("");
});
