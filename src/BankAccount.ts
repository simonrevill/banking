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

    this.transactions.unshift({
      date: `${year}-${month}-${date}`,
      amount,
      balance: amount,
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
