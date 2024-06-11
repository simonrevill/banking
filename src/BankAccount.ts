interface IBankAccount {
  deposit(amount: number): void;
  printStatement(): void;
}

interface Transaction {
  date: string;
  amount: number;
  balance?: number;
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
    });
  }

  printStatement(): void {
    const statement = [
      "Date | Amount | Balance",
      ...this.transactions.map((transaction) => {
        return `${transaction.date} | ${transaction.amount}`;
      }),
    ].join("\n");

    console.log(statement);
  }
}
