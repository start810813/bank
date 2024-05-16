import BankAccount from "./BankAccount.js";
import Receipt from "./Receipt.js";

export default class AccountManager {
    constructor() {
        this.bankAccounts = new Map();
        this.receipts = [];
    }
    
    createAccount(accountNumber, balance) {
        if (balance <= 0) {
            throw new Error("Balance must be greater than 0");
        }
        if (accountNumber === 0 || this.bankAccounts.has(accountNumber)) {
            throw new Error("Account already exists");
        }
        const bankAccount = new BankAccount(accountNumber, balance);
        this.receipts.push(new Receipt(accountNumber, accountNumber, balance));
        this.bankAccounts.set(accountNumber, bankAccount);
    }

    getBalance(accountNumber) {
        const bankAccount = this.bankAccounts.get(accountNumber);
        if (!bankAccount) {
            throw new Error("Account does not exist");
        }
        return this.bankAccounts.get(accountNumber).balance;
    }

    withdraw(accountNumber, amount) {
        const bankAccount = this.bankAccounts.get(accountNumber);
        if (!bankAccount) {
            throw new Error("Account does not exist");
        }
        if (amount <= 0) {
            throw new Error("Withdraw amount must be greater than 0");
        }
        if (amount > bankAccount.balance) {
            throw new Error(`Insufficient balance in account ${accountNumber}`);
        }
        const balance = bankAccount.balance - amount;
        bankAccount.updateBalance(balance);
        this.receipts.push(new Receipt(accountNumber, accountNumber, -amount));
        return balance;
    }

    deposit(accountNumber, amount) {
        const bankAccount = this.bankAccounts.get(accountNumber);
        if (!bankAccount) {
            throw new Error("Account does not exist");
        }
        if (amount <= 0) {
            throw new Error("Deposit amount must be greater than 0");
        }
        const balance = bankAccount.balance + amount;
        bankAccount.updateBalance(balance);
        this.receipts.push(new Receipt(accountNumber, accountNumber, amount));
        return balance;
    }

    transfer(accountNumber, targetAccountNumber, amount) {
        const bankAccount = this.bankAccounts.get(accountNumber);
        const targetBankAccount = this.bankAccounts.get(targetAccountNumber);
        if (!bankAccount) {
            throw new Error("Account does not exist");
        }
        if (!targetBankAccount) {
            throw new Error("Target account does not exist");
        }
        if (amount <= 0) {
            throw new Error("Transfer amount must be greater than 0");
        }
        if (amount > bankAccount.balance) {
            throw new Error(`Insufficient balance in account ${accountNumber}`);
        }
        const balance = bankAccount.balance - amount;
        const targetBalance = targetBankAccount.balance + amount;
        bankAccount.updateBalance(balance);
        targetBankAccount.updateBalance(targetBalance);
        this.receipts.push(new Receipt(accountNumber, targetAccountNumber, amount));
        return balance; 
    }

    getReceipts(accountNumber) {
        const hasBankAccount = this.bankAccounts.has(accountNumber);
        if (!hasBankAccount) {
            throw new Error("Account does not exist");
        }
        return this.receipts
            .filter((log) => log.accountNumber === accountNumber || log.targetAccountNumber === accountNumber)
            .map((log) => ({
                timestamp: log.timestamp,
                accountNumber: log.accountNumber,
                targetAccountNumber: log.targetAccountNumber,
                amount: log.amount
            }));
    }
}

