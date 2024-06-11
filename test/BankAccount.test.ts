import BankAccount from "../src";

let bankAccount: BankAccount;
const logSpy = jest.spyOn(global.console, "log");

describe("bank account tests", () => {
  beforeEach(() => {
    bankAccount = new BankAccount();
  });

  afterEach(() => {
    logSpy.mockReset();
  });

  it("should initialise a bank account with an empty transaction list", () => {
    expect(bankAccount.transactions).toEqual([]);
  });

  it("prints a table with a date, an amount, and a balance heading", () => {
    bankAccount.printStatement();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("Date | Amount | Balance")
    );
  });

  it("prints a deposit row entry with the date in YYYY-MM-DD format", () => {
    const dateString = getTodaysDateString();

    bankAccount.deposit(1000);
    bankAccount.printStatement();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(dateString));
  });

  it("prints a deposit row entry with the amount deposited", () => {
    const amount = 1000;

    bankAccount.deposit(amount);
    bankAccount.printStatement();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(amount.toString())
    );
  });

  it("prints a deposit row entry with the correct balance", () => {
    const amount = 1000;
    const balance = amount;

    bankAccount.deposit(amount);
    bankAccount.printStatement();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(`| ${balance}`)
    );
  });

  it("prints a deposit row entry with the correct balance when there is an existing transaction", () => {
    const firstDepositAmount = 500;
    const secondDepositAmount = 1000;
    const balance = 1500;

    bankAccount.deposit(firstDepositAmount);
    bankAccount.deposit(secondDepositAmount);
    bankAccount.printStatement();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(`| ${balance}`)
    );
  });
});

function getTodaysDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return `${year}-${month}-${date}`;
}
