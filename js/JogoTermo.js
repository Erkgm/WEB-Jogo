// Lista de palavras possíveis
const palavras = ["array", "class", "debug", "while", "float"];

// Número máximo de tentativas permitido
const maxTentativas = 6;
// Variável para rastrear o número de tentativas realizadas
let tentativas = 0;

// Seleciona os elementos da interface
const tabuleiro = document.getElementById("board");
const entrada = document.getElementById("guess-input");
const botao = document.getElementById("submit-guess");
const mensagem = document.getElementById("message");

// Seleciona uma palavra aleatória da lista como a palavra secreta
const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];

// Inicializa o tabuleiro do jogo
function inicializarTabuleiro() {
  tabuleiro.innerHTML = ""; // Limpa o tabuleiro
  for (let i = 0; i < maxTentativas * 5; i++) {
    // Cria blocos para cada letra das tentativas
    const tile = document.createElement("div");
    tile.classList.add("tile"); // Adiciona a classe CSS para estilização
    tabuleiro.appendChild(tile); // Adiciona o bloco ao tabuleiro
  }
}

// Verifica o palpite do jogador
function verificarPalpite() {
  const palpite = entrada.value.toLowerCase(); // Converte o palpite para letras minúsculas
  if (palpite.length !== 5) {
    // Exibe mensagem de erro se o palpite não tiver 5 letras
    mensagem.textContent = "A palavra deve ter 5 letras!";
    return;
  }

  const blocos = document.querySelectorAll(".tile"); // Seleciona todos os blocos no tabuleiro
  const inicio = tentativas * 5; // Calcula o índice inicial para a linha atual
  const letrasRestantes = palavraSecreta.split(""); // Cria uma cópia da palavra secreta como um array de letras

  for (let i = 0; i < 5; i++) {
    const bloco = blocos[inicio + i]; // Seleciona o bloco correspondente à letra atual
    bloco.textContent = palpite[i]; // Exibe a letra no bloco

    if (palpite[i] === palavraSecreta[i]) {
      // Letra correta na posição correta
      bloco.classList.add("correct");
      letrasRestantes[i] = null; // Marca a letra como usada
    } else if (letrasRestantes.includes(palpite[i])) {
      // Letra correta, mas na posição errada
      bloco.classList.add("present");
      letrasRestantes[letrasRestantes.indexOf(palpite[i])] = null; // Marca a letra como usada
    } else {
      // Letra não está na palavra secreta
      bloco.classList.add("absent");
    }
  }

  tentativas++; // Incrementa o número de tentativas
  entrada.value = ""; // Limpa o campo de entrada

  if (palpite === palavraSecreta) {
    // Se o jogador acertar a palavra secreta
    mensagem.textContent = "Parabéns! Você acertou!";
  } else if (tentativas === maxTentativas) {
    // Se o jogador atingir o número máximo de tentativas sem acertar
    mensagem.textContent = `Você perdeu! A palavra era "${palavraSecreta}".`;
  }
}

// Adiciona o evento de clique ao botão para verificar o palpite
botao.addEventListener("click", verificarPalpite);

// Inicializa o tabuleiro quando o jogo começa
inicializarTabuleiro();
