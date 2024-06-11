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

  it("prints a table with a date and an amount heading", () => {
    bankAccount.printStatement();

    expect(logSpy).toHaveBeenCalledWith("Date | Amount |");
  });
});
