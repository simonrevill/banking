import { NEWLINE_SEPARATOR } from "./constants";

import { IBankAccount, Transaction } from "./types";

export default class BankAccount implements IBankAccount {
  public transactions: Transaction[] = [];

  private addTransaction(transaction: Transaction): void {
    this.transactions.unshift(transaction);
  }

  private getTransactionDateString(): string {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();

    return `${year}-${month}-${date}`;
  }

  public deposit(amount: number): void {
    const lastTransaction = this.transactions[0];

    this.addTransaction({
      date: this.getTransactionDateString(),
      amount,
      balance: lastTransaction ? lastTransaction.balance + amount : amount,
    });
  }

  public withdraw(amount: number): void {
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
      date: this.getTransactionDateString(),
      amount: -amount,
      balance: lastTransaction.balance - amount,
    });
  }

  public printStatement(): void {
    const statement = [
      "Date | Amount | Balance",
      ...this.transactions.map((transaction) => {
        return `${transaction.date} | ${transaction.amount} | ${transaction.balance}`;
      }),
    ].join(NEWLINE_SEPARATOR);

    console.log(statement);
  }
}
