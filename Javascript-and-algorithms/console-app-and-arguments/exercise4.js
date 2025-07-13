// Exercise 4

import promptSync from 'prompt-sync';
const prompt = promptSync();

let balance = 100;

while (true) {
    console.log("\n=== Banking System ===");
    console.log("1) Check Balance");
    console.log("2) Deposit Money");
    console.log("3) Withdraw Money");
    console.log("4) Exit");

    const answer = prompt("Choose option (1-4): ");
    if (!["1", "2", "3", "4"].includes(answer)) {
        console.log("Please pick a number from the menu!");
        continue;
    }

    if (answer === "1") {
        console.log(`Your balance: $${balance}`);
    } else if (answer === "2") {
        const depositStr = prompt("Enter amount to deposit: $");
        const depositAmt = Number(depositStr);
        if (Number.isNaN(depositAmt) || depositAmt <= 0) {
            console.log("Invalid deposit amount!");
        } else {
            balance += depositAmt;
            console.log(`New balance: $${balance}`);
        }
    } else if (answer === "3") {
        const withdrawStr = prompt("Enter amount to withdraw: $");
        const withdrawAmt = Number(withdrawStr);
        if (Number.isNaN(withdrawAmt) || withdrawAmt <= 0) {
            console.log("Invalid withdrawal amount!");
        } else if (withdrawAmt > balance) {
            console.log("Insufficient funds!");
        } else {
            balance -= withdrawAmt;
            console.log(`New balance: $${balance}`);
        }
    } else if (answer === "4") {
        console.log("Have a nice day!");
        break;
    }
}
