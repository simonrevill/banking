import { NEWLINE_SEPARATOR } from "./constants";

import { IBankAccount, Transaction } from "./types";

export default class BankAccount implements IBankAccount {
  transactions: Transaction[] = [];

  addTransaction(transaction: Transaction): void {
    this.transactions.unshift(transaction);
  }

  deposit(amount: number): void {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();

    const lastTransaction = this.transactions[0];

    this.addTransaction({
      date: `${year}-${month}-${date}`,
      amount,
      balance: lastTransaction ? lastTransaction.balance + amount : amount,
    });
  }

  withdraw(amount: number): void {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();

    const lastTransaction = this.transactions[0];

    if (!this.transactions.length) {
      throw new Error("Insufficient funds. No previous transactions.");
    }

    if (lastTransaction.balance < amount) {
      throw new Error(
        `Insufficient funds. Your current balance is ${lastTransaction.balance}`
      );
    }

    this.addTransaction({
      date: `${year}-${month}-${date}`,
      amount: -amount,
      balance: lastTransaction.balance - amount,
    });
  }

  printStatement(): void {
    const statement = [
      "Date | Amount | Balance",
      ...this.transactions.map((transaction) => {
        return `${transaction.date} | ${transaction.amount} | ${transaction.balance}`;
      }),
    ].join(NEWLINE_SEPARATOR);

    console.log(statement);
  }
}
