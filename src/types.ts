export interface IBankAccount {
  deposit(amount: number): void;
  withdraw(amount: number): void;
  printStatement(): void;
}

export interface Transaction {
  date: string;
  amount: number;
  balance: number;
}
