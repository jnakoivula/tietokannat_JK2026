const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter the first number: ", function(num1) {
    rl.question("Enter the second number: ", function(num2) {

        num1 = Number(num1);
        num2 = Number(num2);

        if (num1 > num2) {
            console.log(num1, "is the bigger number");
        } else if (num2 > num1) {
            console.log(num2, "is the bigger number");
        } else {
            console.log("The numbers are equal");
        }
        rl.close();
    });
});