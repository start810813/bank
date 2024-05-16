export default class BankAccount {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    updateBalance(amount) {
        this.balance = amount;
    }
}