// const { cy } = require("date-fns/locale");
const { v4: uuidv4 } = require("uuid");

describe("payment", () => {
  it("user can make payment", () => {
    // Login
    cy.visit("localhost:3000/");
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", { name: /remember me/i }).click();
    cy.findByRole("button", { name: /sign in/i }).click();

    // Check account balance
    let oldBalance;
    cy.get('[data-test="sidenav-user-balance"]').then(($balance) => (oldBalance = $balance.text()));
    // .then((balance) => console.log(balance));
    // data-test="sidenav-user-balance"

    // Click on `new` button
    cy.findByText(/new/i).click();

    // Search for a specific user
    cy.findByRole("textbox").type("Devon Becker");
    cy.findByText(/devon becker/i).click();

    // Add amount and note and click pay
    const paymentAmount = "5.00";
    cy.findByPlaceholderText(/amount/i).type(paymentAmount);

    const note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note);
    cy.findByRole("button", { name: /pay/i }).click();

    // Return to transactions
    cy.findByRole("button", { name: /return to transactions/i }).click();

    // Go to personal payments
    cy.findByRole("tab", { name: /mine/i }).click();

    // Click on payment
    // cy.findByText(note).scrollIntoView();
    cy.findByText(note).click({ force: true });

    // Verify that payment was made
    cy.findByText(`-$${paymentAmount}`).should("be.visible");
    cy.findByText(note).should("be.visible");

    // Verify that payment was deducted from account balance
    cy.get('[data-test="sidenav-user-balance"]').then(($balance) => {
      const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
      const convertedNewBalance = parseFloat($balance.text().replace(/\$|,/g, ""));

      expect(convertedOldBalance - convertedNewBalance).to.equal(parseFloat(paymentAmount));
    });
  });
});
