const { DateTime } = require("luxon");

document.getElementById("btnCalcular").addEventListener("click", () => {
  const dataInicioStr = document.getElementById("dataInicio").value;
  const dataFimStr = document.getElementById("dataFim").value;

  if (!dataInicioStr || !dataFimStr) {
    document.getElementById("resultado").innerText = "Selecione as duas datas.";
    return;
  }

  // Criando objetos DateTime da Luxon
  const inicio = DateTime.fromISO(dataInicioStr);
  const fim = DateTime.fromISO(dataFimStr);

  // Calculando a diferença em anos, meses e dias
  // O Luxon lida internamente com a lógica de "empréstimo" de dias dos meses anteriores
  const diff = fim.diff(inicio, ["years", "months", "days"]).toObject();

  // Arredondando os valores (o diff pode retornar decimais se houver diferença de horas)
  const anos = Math.floor(diff.years || 0);
  const meses = Math.floor(diff.months || 0);
  const dias = Math.floor(diff.days || 0);

  document.getElementById("resultado").innerText =
    `Diferença: ${anos} anos, ${meses} meses e ${dias} dias.`;
});
