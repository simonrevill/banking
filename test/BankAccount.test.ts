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

  it("prints a deposit row entry with the date in YYYY-MM-DD format, the amount, and the correct balance", () => {
    const dateString = getTodaysDateString();
    const amount = 1000;
    const balance = amount;

    bankAccount.deposit(amount);
    bankAccount.printStatement();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(`${dateString} | ${amount} | ${balance}`)
    );
  });

  it("prints a deposit row entry with the correct balance when there is an existing transaction", () => {
    const dateString = getTodaysDateString();
    const firstDepositAmount = 500;
    const secondDepositAmount = 1000;
    const balance = 1500;

    bankAccount.deposit(firstDepositAmount);
    bankAccount.deposit(secondDepositAmount);
    bankAccount.printStatement();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        `${dateString} | ${secondDepositAmount} | ${balance}`
      )
    );
  });

  it("should throw an error when trying to make a withdrawal when there are no previous transactions", () => {
    expect(() => {
      bankAccount.withdraw(1000);
    }).toThrow("Insufficient funds. No previous transactions.");
  });

  it("should throw an error when trying to make a withdrawal when there are insufficient funds", () => {
    expect(() => {
      bankAccount.deposit(500);
      bankAccount.withdraw(1000);
    }).toThrow("Insufficient funds. Your current balance is 500");
  });

  it("should not throw an error when trying to make a withdrawal that is equal to the funds available", () => {
    expect(() => {
      bankAccount.deposit(500);
      bankAccount.withdraw(500);
    }).not.toThrow();
  });

  it("prints a withdrawal row entry with the correct balance when a valid withrawal has been made", () => {
    const dateString = getTodaysDateString();
    const depositedAmount = 500;
    const withdrawalAmount = 25;
    const balance = 475;

    bankAccount.deposit(depositedAmount);
    bankAccount.withdraw(withdrawalAmount);
    bankAccount.printStatement();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        `${dateString} | -${withdrawalAmount} | ${balance}`
      )
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
