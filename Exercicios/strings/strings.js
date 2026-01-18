function confirmEnding(param1, param2){
  let tamanhoParam2 = param2.length;
  let verificarFinal = param1.slice(-tamanhoParam2)
  return verificarFinal === param2;

}

console.log(confirmEnding("Bastian", "n"))

/*
const calculateTotal = (amount, taxRate = 0.05) => {
  return amount + (amount * taxRate);
};

console.log(calculateTotal(100));*/
const sum = (num1, num2) => num1 + num2
console.log(sum(0, 0) + 10);

let x = 8;  // Binary: 1000
console.log(x << 2);