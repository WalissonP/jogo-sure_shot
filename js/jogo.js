// =========================================================
// 1. SELEÇÃO DE ELEMENTOS DO DOM
// =========================================================
const canvas = document.querySelector("#tela-jogo");
const ctx = canvas.getContext("2d");

const hudNivel = document.querySelector("#hud-nivel");
const hudVida = document.querySelector("#hud-vida");
const hudPontos = document.querySelector("#hud-pontos");
const hudProgresso = document.querySelector("#hud-progresso");

const overlayInicio = document.querySelector("#overlay-inicio");
const overlayFim = document.querySelector("#overlay-fim");
const tituloFim = document.querySelector("#titulo-fim");
const mensagemFim = document.querySelector("#mensagem-fim");
const pontuacaoFinalEl = document.querySelector("#pontuacao-final");

const btnIniciar = document.querySelector("#btn-iniciar");
const btnReiniciar = document.querySelector("#btn-reiniciar");

// =========================================================
// 2. CONFIGURAÇÃO DOS 5 NÍVEIS E EVOLUÇÃO DOS INIMIGOS
// =========================================================
const CHAO_Y = 380;
const GRAVIDADE = 0.65;

const NIVEIS = [
  {
    numero: 1,
    nome: "Setor 1 - Perímetro",
    corCeu: "#162436",
    corChao: "#2d4030",
    distanciaMeta: 2200,
    intervaloSpawn: 115,
    tiposInimigos: ["rastejador"]
  },
  {
    numero: 2,
    nome: "Setor 2 - Trincheiras",
    corCeu: "#1f2937",
    corChao: "#3f3a2c",
    distanciaMeta: 2600,
    intervaloSpawn: 95,
    tiposInimigos: ["rastejador", "saltador"]
  },
  {
    numero: 3,
    nome: "Setor 3 - Base Aérea",
    corCeu: "#231f38",
    corChao: "#353148",
    distanciaMeta: 3000,
    intervaloSpawn: 85,
    tiposInimigos: ["saltador", "atirador", "drone"]
  },
  {
    numero: 4,
    nome: "Setor 4 - Fortaleza",
    corCeu: "#331c24",
    corChao: "#42272e",
    distanciaMeta: 3400,
    intervaloSpawn: 75,
    tiposInimigos: ["atirador", "drone", "blindado"]
  },
  {
    numero: 5,
    nome: "Setor 5 - Núcleo do Boss",
    corCeu: "#2b1215",
    corChao: "#3b1d22",
    distanciaMeta: 900,
    intervaloSpawn: 150,
    tiposInimigos: ["drone"]
  }
];

// =========================================================
// 3. ESTADO DO JOGO (OBJETOS E ARRAYS)
// =========================================================
const teclas = {};

const estadoJogo = {
  status: "menu", // "menu" | "jogando" | "vitoria" | "derrota"
  nivelIndice: 0,
  pontuacao: 0,
  cameraX: 0,
  frameAtual: 0,
  ultimoTiroFrame: 0,
  invulneravelAte: 0,
  avisoNivelFrames: 0,
  plataformas: [],
  inimigos: [],
  tirosJogador: [],
  tirosInimigos: [],
  boss: null
};

const soldado = {
  x: 120,
  y: CHAO_Y - 56,
  largura: 34,
  alturaEmPe: 56,
  alturaAgachado: 32,
  alturaAtual: 56,
  vx: 0,
  vy: 0,
  velocidade: 4.5,
  forcaPulo: -13.5,
  noChao: false,
  agachado: false,
  olhandoCima: false,
  direcao: 1, // 1 = direita, -1 = esquerda
  vida: 100,
  vidaMaxima: 100
};

// =========================================================
// 4. INICIALIZAÇÃO, NÍVEIS E REINÍCIO
// =========================================================
function iniciarPartida() {
  estadoJogo.status = "jogando";
  estadoJogo.nivelIndice = 0;
  estadoJogo.pontuacao = 0;
  estadoJogo.frameAtual = 0;
  estadoJogo.ultimoTiroFrame = 0;
  estadoJogo.invulneravelAte = 0;

  soldado.vida = soldado.vidaMaxima;
  soldado.direcao = 1;

  overlayInicio.classList.add("oculto");
  overlayFim.classList.add("oculto");

  carregarNivel(0);
  atualizarHUD();
}

function carregarNivel(indice) {
  const configNivel = NIVEIS[indice];
  estadoJogo.nivelIndice = indice;
  estadoJogo.cameraX = 0;
  estadoJogo.inimigos = [];
  estadoJogo.tirosJogador = [];
  estadoJogo.tirosInimigos = [];
  estadoJogo.boss = null;
  estadoJogo.avisoNivelFrames = 140;

  soldado.x = 100;
  soldado.y = CHAO_Y - soldado.alturaEmPe;
  soldado.vx = 0;
  soldado.vy = 0;
  soldado.noChao = true;

  // Recupera parte da vida ao avançar de fase
  if (indice > 0) {
    soldado.vida = Math.min(soldado.vidaMaxima, soldado.vida + 25);
  }

  // Gera plataformas ao longo do nível
  estadoJogo.plataformas = [];
  if (configNivel.numero < 5) {
    for (let posX = 420; posX < configNivel.distanciaMeta - 300; posX += 460) {
      estadoJogo.plataformas.push({
        x: posX,
        y: CHAO_Y - 95,
        largura: 150,
        altura: 16
      });
      estadoJogo.plataformas.push({
        x: posX + 210,
        y: CHAO_Y - 175,
        largura: 140,
        altura: 16
      });
    }
  } else {
    // Plataformas da arena do Boss (Nível 5)
    estadoJogo.plataformas.push(
      { x: 140, y: CHAO_Y - 105, largura: 160, altura: 16 },
      { x: 600, y: CHAO_Y - 105, largura: 160, altura: 16 }
    );
    criarBoss();
  }
}

function criarBoss() {
  estadoJogo.boss = {
    x: 680,
    y: CHAO_Y - 110,
    largura: 88,
    altura: 110,
    vx: -2.2,
    vy: 0,
    vida: 35,
    vidaMaxima: 35,
    cadenciaTiro: 75,
    ultimoTiro: 0
  };
}

function finalizarPartida(venceu) {
  estadoJogo.status = venceu ? "vitoria" : "derrota";
  tituloFim.textContent = venceu ? "Missão Cumprida!" : "Soldado Abatido!";
  mensagemFim.textContent = venceu
    ? "Você atravessou os 5 setores e destruiu o Colosso Bélico!"
    : "Sua energia chegou a zero. Tente novamente!";
  pontuacaoFinalEl.textContent = estadoJogo.pontuacao;
  overlayFim.classList.remove("oculto");
}

// =========================================================
// 5. EVENTOS (APENAS addEventListener)
// =========================================================
function registrarEventos() {
  btnIniciar.addEventListener("click", iniciarPartida);
  btnReiniciar.addEventListener("click", iniciarPartida);

  window.addEventListener("keydown", function (evento) {
    const codigo = evento.code;
    teclas[codigo] = true;

    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(codigo)) {
      evento.preventDefault();
    }

    if (codigo === "KeyR" && estadoJogo.status !== "menu") {
      iniciarPartida();
    }
  });

  window.addEventListener("keyup", function (evento) {
    teclas[evento.code] = false;
  });
}

// =========================================================
// 6. LÓGICA DO SOLDADO E DISPAROS
// =========================================================
function atualizarSoldado() {
  const esquerda = teclas["KeyA"] || teclas["ArrowLeft"];
  const direita = teclas["KeyD"] || teclas["ArrowRight"];
  const cima = teclas["KeyW"] || teclas["ArrowUp"];
  const baixo = teclas["KeyS"] || teclas["ArrowDown"];
  const pular = teclas["Space"];
  const atirar = teclas["KeyJ"] || teclas["KeyZ"];

  // Agachar (apenas quando está no chão)
  if (baixo && soldado.noChao) {
    if (!soldado.agachado) {
      soldado.y += soldado.alturaEmPe - soldado.alturaAgachado;
    }
    soldado.agachado = true;
    soldado.alturaAtual = soldado.alturaAgachado;
  } else {
    if (soldado.agachado) {
      soldado.y -= soldado.alturaEmPe - soldado.alturaAgachado;
    }
    soldado.agachado = false;
    soldado.alturaAtual = soldado.alturaEmPe;
  }

  // Mirar para cima
  soldado.olhandoCima = Boolean(cima && !soldado.agachado);

  // Movimento horizontal (mais lento se estiver agachado)
  const fatorVelocidade = soldado.agachado ? 0.45 : 1;
  if (esquerda && !direita) {
    soldado.vx = -soldado.velocidade * fatorVelocidade;
    soldado.direcao = -1;
  } else if (direita && !esquerda) {
    soldado.vx = soldado.velocidade * fatorVelocidade;
    soldado.direcao = 1;
  } else {
    soldado.vx = 0;
  }

  // Pulo
  if (pular && soldado.noChao && !soldado.agachado) {
    soldado.vy = soldado.forcaPulo;
    soldado.noChao = false;
  }

  // Aplica movimento e gravidade
  const yAnterior = soldado.y;
  soldado.x += soldado.vx;
  soldado.vy += GRAVIDADE;
  soldado.y += soldado.vy;

  // Limites da câmera/mapa
  const configNivel = NIVEIS[estadoJogo.nivelIndice];
  if (soldado.x < estadoJogo.cameraX) {
    soldado.x = estadoJogo.cameraX;
  }
  if (soldado.x + soldado.largura > configNivel.distanciaMeta) {
    soldado.x = configNivel.distanciaMeta - soldado.largura;
  }

  // Colisão com plataformas (pousando por cima)
  soldado.noChao = false;
  for (let i = 0; i < estadoJogo.plataformas.length; i++) {
    const plat = estadoJogo.plataformas[i];
    const dentroX = soldado.x + soldado.largura > plat.x && soldado.x < plat.x + plat.largura;
    const cruzouTopo =
      yAnterior + soldado.alturaAtual <= plat.y &&
      soldado.y + soldado.alturaAtual >= plat.y;

    if (soldado.vy >= 0 && dentroX && cruzouTopo) {
      soldado.y = plat.y - soldado.alturaAtual;
      soldado.vy = 0;
      soldado.noChao = true;
    }
  }

  // Colisão com o chão principal
  if (soldado.y + soldado.alturaAtual >= CHAO_Y) {
    soldado.y = CHAO_Y - soldado.alturaAtual;
    soldado.vy = 0;
    soldado.noChao = true;
  }

  // Atualiza câmera lateral (estilo plataforma 2D)
  if (configNivel.numero < 5) {
    const limiteCamera = soldado.x - canvas.width * 0.38;
    if (limiteCamera > estadoJogo.cameraX) {
      estadoJogo.cameraX = Math.min(limiteCamera, configNivel.distanciaMeta - canvas.width);
    }
  }

  // Disparo da arma (cadência controlada)
  if (atirar && estadoJogo.frameAtual - estadoJogo.ultimoTiroFrame >= 14) {
    dispararTiroSoldado();
    estadoJogo.ultimoTiroFrame = estadoJogo.frameAtual;
  }

  // Verifica conclusão dos níveis 1 a 4
  if (configNivel.numero < 5 && soldado.x + soldado.largura >= configNivel.distanciaMeta - 20) {
    estadoJogo.pontuacao += 200;
    carregarNivel(estadoJogo.nivelIndice + 1);
  }
}

function dispararTiroSoldado() {
  const velocidadeTiro = 10;

  if (soldado.olhandoCima) {
    estadoJogo.tirosJogador.push({
      x: soldado.x + soldado.largura / 2 - 3,
      y: soldado.y - 10,
      largura: 6,
      altura: 14,
      vx: 0,
      vy: -velocidadeTiro
    });
  } else {
    const saidaX = soldado.direcao === 1 ? soldado.x + soldado.largura : soldado.x - 14;
    const saidaY = soldado.y + (soldado.agachado ? 12 : 20);
    estadoJogo.tirosJogador.push({
      x: saidaX,
      y: saidaY,
      largura: 14,
      altura: 6,
      vx: velocidadeTiro * soldado.direcao,
      vy: 0
    });
  }
}

