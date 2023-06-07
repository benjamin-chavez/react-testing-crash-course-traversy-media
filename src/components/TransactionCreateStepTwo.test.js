import { render, screen } from "@testing-library/react";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";
import userEvent from "@testing-library/user-event";

// UNIT TESTS
// test("on initial render, the pay button is disabled", async () => {
//   render(<TransactionCreateStepTwo receiver={{ id: "1" }} sender={{ id: "2" }} />);

//   // screen.debug();

//   // screen.getByRole("");
//   // expect(screen.getByRole("button", { name: /pay/i })).toBeEnabled();
//   // expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
//   expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
// });

// // ARRANGE -> ACT -> ASSERT Testing Pattern
// test("if the amount and note fields have been entered, the pay button becomes enabled ", async () => {
//   // ARRANGE
//   render(<TransactionCreateStepTwo receiver={{ id: "1" }} sender={{ id: "2" }} />);

//   // ACT
//   // screen.getByRole(""); // <- USE TO LOOK AT HTML TO GET IDENTIFIERS
//   // screen.getByPlaceholderText("")
//   userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
//   userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

//   // ASSERT
//   expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
// });

// INTEGRATION TEST - THIS COMBINES THE TWO UNIT TESTS FROM ABOVE
test("if the amount and note fields have been entered, the pay button becomes enabled ", async () => {
  render(<TransactionCreateStepTwo receiver={{ id: "1" }} sender={{ id: "2" }} />);

  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});
