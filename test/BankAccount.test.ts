import BankAccount from "../src";

let bankAccount: BankAccount;
const logSpy = jest.spyOn(global.console, "log");

describe("bank account tests", () => {
  beforeEach(() => {
    bankAccount = new BankAccount();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it("prints a table with a date, an amount, and a balance heading", () => {
    bankAccount.printStatement();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("Date | Amount | Balance")
    );
  });
});
