const numeros = [5, 50, 80, 1, 2, 5, 7, 8, 11, 15, 22, 27]

const numerosFiltrados = numeros.filter(valor => valor > 10)

console.log(numerosFiltrados)

// o método filter sempre retorna um array do mesmo tamanho ou menor que o array original, sem modificar o array
//  original