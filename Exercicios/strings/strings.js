function confirmEnding(param1, param2){
  let tamanhoParam2 = param2.length;
  let verificarFinal = param1.slice(-tamanhoParam2)
  return verificarFinal === param2;

}

console.log(confirmEnding("Bastian", "n"))