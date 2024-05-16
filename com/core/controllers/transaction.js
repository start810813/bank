import express from "express";
import useAccountManager from "../modules/useAccountManager.js";

const accountManager = useAccountManager();

const router = express.Router();

router.get("/:accountNumber", (req, res) => {
    try {
        const accountNumber = Number(req.params.accountNumber) || 0;
        const logs = accountManager.getReceipts(accountNumber);
        res.status(200).json({ logs });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;