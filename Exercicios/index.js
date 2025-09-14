const pessoa1 = {
    nome: 'João',
    idade: 30,
    profissao: 'Engenheiro',

    fala() {
        console.log(`Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.profissao}.`);
    },

    incrementaIdade() {
        this.idade += 1;
        console.log(`Agora tenho ${this.idade} anos.`);
    }
};

pessoa1.fala(); // Olá, meu nome é João, tenho 30 anos e sou Engenheiro.
pessoa1.incrementaIdade(); // Agora tenho 31 anos.


