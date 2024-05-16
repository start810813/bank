import express from "express";
import useAccountManager from "../modules/useAccountManager.js";

const accountManager = useAccountManager();

const router = express.Router();

router.post("/:accountNumber", (req, res) => {
    try {
        const accountNumber = Number(req.params.accountNumber) || 0;
        const balance =  Number(req.body.balance) || 0;
        accountManager.createAccount(accountNumber, balance);
        res.status(201).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/:accountNumber/balance", (req, res) => {
    try {
        const accountNumber = Number(req.params.accountNumber) || 0;
        const balance = accountManager.getBalance(accountNumber);
        res.status(200).json({ balance });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/:accountNumber/withdraw", (req, res) => {
    try {
        const accountNumber = Number(req.params.accountNumber) || 0;
        const amount = Number(req.body.amount) || 0;
        const balance = accountManager.withdraw(accountNumber, amount);
        res.status(200).json({ balance });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/:accountNumber/deposit", (req, res) => {
    try {
        const accountNumber = Number(req.params.accountNumber) || 0;
        const amount = Number(req.body.amount) || 0;
        const balance = accountManager.deposit(accountNumber, amount);
        res.status(200).json({ balance });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/:accountNumber/transfer", (req, res) => {
    try {
        const accountNumber = Number(req.params.accountNumber) || 0;
        const targetAccountNumber = Number(req.body.targetAccountNumber) || 0;
        const amount = Number(req.body.amount) || 0;
        const balance = accountManager.transfer(accountNumber, targetAccountNumber, amount);
        res.status(200).json({ balance });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;