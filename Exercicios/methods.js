//Métodos em Javascript

let phrase = "JavaScript is awesome!";
let result = phrase.includes("awesome");

console.log(result);  // true

let text = "Hello, JavaScript world!";
let result2 = text.includes("JavaScript", 7);

console.log(result);  // true

//How Can You Extract a Substring from a String?
let message = "Hello, world!";
let greeting = message.slice(0, 5);

console.log(greeting);  // Hello

let message2 = "Hello, world!";
let world = message.slice(7);

console.log(world);  // world!