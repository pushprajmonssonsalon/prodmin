import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import toast from "react-hot-toast";
import SopList from "./SopList";

jest.mock("react-router-dom", () => ({ useNavigate: () => jest.fn() }));
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
afterEach(() => jest.restoreAllMocks());

test.each(["Delete", "Duplicate", "Active"])("failed SOP %s keeps the row and never claims success", async (action) => {
  jest.spyOn(window, "confirm").mockReturnValue(true);
  axios.mockResolvedValueOnce({ data: { success: true, data: [{ _id: "1", name: "Test SOP", category: "Hair", isActive: true }] } });
  render(<SopList />);
  await screen.findByText("Test SOP");
  axios.mockResolvedValueOnce({ status: 200, data: { success: false, message: "Action failed" } });
  fireEvent.click(screen.getByRole("button", { name: action, exact: true }));
  await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Action failed", undefined));
  expect(toast.success).not.toHaveBeenCalled();
  expect(screen.getByText("Test SOP")).toBeInTheDocument();
  expect(axios).toHaveBeenCalledTimes(2);
});
