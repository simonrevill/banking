import BankAccount from "../src";

const logSpy = jest.spyOn(global.console, "log");

describe("bank account tests", () => {
  afterEach(() => {
    logSpy.mockRestore();
  });

  it("prints a table with a date heading", () => {
    const bankAccount = new BankAccount();

    bankAccount.printStatement();

    expect(logSpy).toHaveBeenCalledWith("Date |");
  });
});
