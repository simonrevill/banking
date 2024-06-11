interface IBankAccount {
  printStatement(): void;
}

export default class BankAccount implements IBankAccount {
  printStatement(): void {
    console.log("Date | Amount | Balance");
  }
}
