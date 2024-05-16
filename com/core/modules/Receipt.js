export default class Receipt {
    constructor(accountNumber, targetAccountNumber, amount) {
        this.timestamp = new Date();
        this.accountNumber = accountNumber;
        this.targetAccountNumber = targetAccountNumber;
        this.amount = amount;
    }
}
