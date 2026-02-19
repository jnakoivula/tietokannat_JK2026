const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a word: ", function(word) {
    //to make it case-insensitive
    word = word.toLowerCase();

    //reverse the word
    reversed = word.split("").reverse().join("");

    if (word === reversed) {
        console.log("The word is a palindrome");
    } else {
        console.log("The word is not a palindrome");
    }
    rl.close();
});
