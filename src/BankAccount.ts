interface IBankAccount {
  printStatement(): void;
}

export default class BankAccount implements IBankAccount {
  printStatement(): void {
    const statement = ["Date | Amount | Balance"].join("\n");

    console.log(statement);
  }
}
