import { NEWLINE_SEPARATOR } from "./constants";

interface IBankAccount {
  deposit(amount: number): void;
  printStatement(): void;
}

interface Transaction {
  date: string;
  amount: number;
  balance: number;
}

export default class BankAccount implements IBankAccount {
  transactions: Transaction[] = [];

  deposit(amount: number): void {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();

    const lastTransaction = this.transactions[0];

    this.transactions.unshift({
      date: `${year}-${month}-${date}`,
      amount,
      balance: lastTransaction ? lastTransaction.balance + amount : amount,
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
