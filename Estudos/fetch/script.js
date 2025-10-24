fetch("https://rickandmortyapi.com/api/character")
  .then((response) => {
    return response.json();
  })
  .then((dados) => console.log(dados));
