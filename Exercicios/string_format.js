let greeting = "Hello, World!";
let uppercaseGreeting = greeting.toUpperCase();
console.log(uppercaseGreeting);  // "HELLO, WORLD!"

let shout = "I AM LEARNING JAVASCRIPT!";
let lowercaseShout = shout.toLowerCase();
console.log(lowercaseShout);  // "i am learning javascript!"

//How Can You Trim Whitespace from a String?
console.log(message); // "   Hello!   "
let trimmedMessage = message.trim();
console.log(trimmedMessage);  // "Hello!"

let greeting1 = "   Hello!   ";
console.log(greeting1);  // "   Hello!   "
let trimmedStart = greeting1.trimStart();
console.log(trimmedStart);  // "Hello!   "

let greeting2 = "   Hello!   ";
console.log(greeting2);  // "   Hello!   "
let trimmedEnd = greeting2.trimEnd();
console.log(trimmedEnd);  // "   Hello!"

//How Can You Replace Parts of a String with Another?
//The replace() method is case-sensitive
let text = "I love JavaScript!";
console.log(text); // "I love JavaScript!"
let newText = text.replace("JavaScript", "coding");
console.log(newText);  // "I love coding!"

//By default, the replace() method will only replace the first occurrence of the searchValue
let phrase = "Hello, world! Welcome to the world of coding.";
console.log(phrase);  // "Hello, world! Welcome to the world of coding."
let updatedPhrase = phrase.replace("world", "universe");
console.log(updatedPhrase);  // "Hello, universe! Welcome to the world of coding."

//How Can You Repeat a String x Number of Times?
let word = "Hello!";
let repeatedWord = word.repeat(3);
console.log(repeatedWord);  // "Hello!Hello!Hello!"