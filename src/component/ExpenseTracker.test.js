import { render, screen } from "@testing-library/react";
import Home from "./page/Home";
import Login from "./page/Login";
import { MemoryRouter } from "react-router-dom";
import Signup from "./page/Singup";
import Profile from "./page/Profile";
import ForgotPassword from "./page/ForgotPass";

test("Test First React app case", () => {
  render(<Home />);

  const text = screen.getByText("Welcome to Expense Tracker");
  expect(text).toBeInTheDocument();
});

test("Test Second React app case", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const text = screen.getByText("Expense Tracker");
  expect(text).toBeInTheDocument();
});


test("Test Third React app case", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const text = screen.getByText("Email");
  expect(text).toBeInTheDocument();
});

test("Test Fourth React app case", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const text = screen.getByText("Password");
  expect(text).toBeInTheDocument();
});

test("Test Fifth React app case", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const text = screen.getByText("Forgot Password?");
  expect(text).toBeInTheDocument();
});

test("Test Sixth React app case", () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  const text = screen.getByText("Sign up");
  expect(text).toBeInTheDocument();
});

test("Test Seventh React app case", () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  const text = screen.getByText("Confrim Password");
  expect(text).toBeInTheDocument();
});

test("Test Eighth React app case", () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );

  const text = screen.getByText("Winners never quit, quitters never win");
  expect(text).toBeInTheDocument();
});

test("Test Ninth React app case", () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );

  const text = screen.getByText("Contact Details");
  expect(text).toBeInTheDocument();
});

test("Test Tenth React app case", () => {
  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  );

  const text = screen.getByText("Forget Password");
  expect(text).toBeInTheDocument();
});
