import express from "express";
import cookieParser from "cookie-parser";
import account from "./controllers/account.js";
import transaction from "./controllers/transaction.js";

const app = express();
const port = 3002;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/account", account);
app.use("/transaction", transaction);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});