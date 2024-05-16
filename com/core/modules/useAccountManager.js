import AccountManager from "./AccountManager.js"

let instance = null;

export default function() {
    if (instance === null) {
        instance = new AccountManager();
    }
    return instance;
}