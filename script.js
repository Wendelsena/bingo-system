const TOTAL_NUMEROS = 75;
let numerosSorteados = [];

if (localStorage.getItem('numerosSorteados')) {
  numerosSorteados = JSON.parse(localStorage.getItem('numerosSorteados'));
}

function letraBingo(numero) {
  if (numero <= 15) return "B";
  if (numero <= 30) return "I";
  if (numero <= 45) return "N";
  if (numero <= 60) return "G";
  return "O";
}

function atualizarLista() {
  const lista = document.getElementById("listaNumeros");
  lista.innerHTML = "";

  numerosSorteados.forEach(num => {
    const span = document.createElement("span");
    span.className = "numero";
    span.textContent = `${letraBingo(num)}-${num}`;
    lista.appendChild(span);
  });

  const ultimo = numerosSorteados[numerosSorteados.length - 1];
  document.getElementById("sorteado").textContent = ultimo
    ? `${letraBingo(ultimo)}-${ultimo}`
    : "?";
}

function sortearNumero() {
  if (numerosSorteados.length >= TOTAL_NUMEROS) {
    alert("Todos os números já foram sorteados!");
    return;
  }

  let numero;
  do {
    numero = Math.floor(Math.random() * TOTAL_NUMEROS) + 1;
  } while (numerosSorteados.includes(numero));

  numerosSorteados.push(numero);
  localStorage.setItem('numerosSorteados', JSON.stringify(numerosSorteados));
  atualizarLista();
}

function resetarJogo() {
  if (confirm("Deseja realmente resetar o jogo?")) {
    numerosSorteados = [];
    localStorage.removeItem('numerosSorteados');
    document.getElementById("sorteado").textContent = "?";
    atualizarLista();
  }
}

atualizarLista();
