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
const FPS_ESTIMADO = 60;

const NIVEIS = [
  {
    numero: 1,
    nome: "Setor 1 - Ruínas Pós-Apocalípticas",
    corCeu: "#232726",
    corChao: "#3b362e",
    distanciaMeta: 2200,
    intervaloSpawn: 120,
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
  danoSoldadoFrames: 0,
  pulsoTelaDano: 0,
  inclinacaoDano: 0,
  avisoNivelFrames: 0,
  plataformas: [],
  estruturasQuebradas: [],
  obstaculos: [],
  buracosChao: [],
  caminhosSubterraneos: [],
  itensChao: [],
  inimigos: [],
  particulasDano: [],
  tirosJogador: [],
  tirosInimigos: [],
  boss: null
};

const soldado = {
  x: 120,
  y: CHAO_Y - 56,
  larguraEmPe: 34,
  larguraDeitado: 52,
  largura: 34,
  alturaEmPe: 56,
  alturaDeitado: 20,
  alturaAtual: 56,
  vx: 0,
  vy: 0,
  velocidade: 4.5,
  forcaPulo: -13.5,
  noChao: false,
  deitado: false,
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
  estadoJogo.danoSoldadoFrames = 0;
  estadoJogo.pulsoTelaDano = 0;
  estadoJogo.inclinacaoDano = 0;
  estadoJogo.particulasDano = [];
  estadoJogo.buracosChao = [];
  estadoJogo.caminhosSubterraneos = [];

  soldado.vida = soldado.vidaMaxima;
  soldado.direcao = 1;
  soldado.deitado = false;
  soldado.largura = soldado.larguraEmPe;
  soldado.alturaAtual = soldado.alturaEmPe;

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
  estadoJogo.obstaculos = [];
  estadoJogo.estruturasQuebradas = [];
  estadoJogo.buracosChao = [];
  estadoJogo.caminhosSubterraneos = [];
  estadoJogo.itensChao = [];
  estadoJogo.particulasDano = [];
  estadoJogo.tirosJogador = [];
  estadoJogo.tirosInimigos = [];
  estadoJogo.boss = null;
  estadoJogo.danoSoldadoFrames = 0;
  estadoJogo.pulsoTelaDano = 0;
  estadoJogo.inclinacaoDano = 0;
  estadoJogo.avisoNivelFrames = 140;

  soldado.deitado = false;
  soldado.largura = soldado.larguraEmPe;
  soldado.alturaAtual = soldado.alturaEmPe;
  soldado.x = 100;
  soldado.y = CHAO_Y - soldado.alturaEmPe;
  soldado.vx = 0;
  soldado.vy = 0;
  soldado.noChao = true;

  if (indice > 0) {
    soldado.vida = Math.min(soldado.vidaMaxima, soldado.vida + 25);
  }

  estadoJogo.plataformas = [];
  if (configNivel.numero === 1) {
    configurarMapaFase1(configNivel.distanciaMeta);
    posicionarRastejadoresMapa();
  } else if (configNivel.numero < 5) {
    for (let posX = 420; posX < configNivel.distanciaMeta - 300; posX += 460) {
      estadoJogo.plataformas.push({
        x: posX,
        y: CHAO_Y - 95,
        largura: 150,
        altura: 16,
        tipo: "padrao",
        desmoronavel: false
      });
      estadoJogo.plataformas.push({
        x: posX + 210,
        y: CHAO_Y - 175,
        largura: 140,
        altura: 16,
        tipo: "padrao",
        desmoronavel: false
      });
    }
  } else {
    estadoJogo.plataformas.push(
      { x: 140, y: CHAO_Y - 105, largura: 160, altura: 16, tipo: "padrao", desmoronavel: false },
      { x: 600, y: CHAO_Y - 105, largura: 160, altura: 16, tipo: "padrao", desmoronavel: false }
    );
    criarBoss();
  }
}

function configurarMapaFase1(distanciaMeta) {
  const posicoesPlataformas = [470, 1180, 1760];
  for (let i = 0; i < posicoesPlataformas.length; i++) {
    const px = posicoesPlataformas[i];
    estadoJogo.plataformas.push({
      x: px,
      y: CHAO_Y - 105,
      largura: 135,
      altura: 20,
      tipo: "predio",
      desmoronavel: true,
      pisada: false,
      tempoRestanteFrames: FPS_ESTIMADO * 2,
      desmoronando: false,
      vy: 0,
      removida: false
    });
  }

  const posicoesEscombros = [390, 840, 1460, 1920];
  for (let i = 0; i < posicoesEscombros.length; i++) {
    const obsX = posicoesEscombros[i];
    estadoJogo.obstaculos.push({
      x: obsX,
      y: CHAO_Y - 26,
      largura: 54,
      altura: 26,
      tipo: "escombros"
    });
  }

  const posicoesPredios = [660, 1580];
  for (let i = 0; i < posicoesPredios.length; i++) {
    const bx = posicoesPredios[i];
    estadoJogo.estruturasQuebradas.push({
      x: bx,
      y: CHAO_Y - 135,
      largura: 110,
      alturaTotal: 135,
      alturaPassagem: 34
    });
  }
}

function posicionarRastejadoresMapa() {
  const pontosMapa = [
    { x: 520, alcance: 245, velocidadeAtaque: 1.35 },
    { x: 960, alcance: 260, velocidadeAtaque: 1.45 },
    { x: 1340, alcance: 265, velocidadeAtaque: 1.55 },
    { x: 1690, alcance: 255, velocidadeAtaque: 1.65 },
    { x: 2020, alcance: 250, velocidadeAtaque: 1.75 }
  ];

  for (let i = 0; i < pontosMapa.length; i++) {
    const ponto = pontosMapa[i];
    estadoJogo.inimigos.push(criarRastejador(ponto.x, ponto.alcance, ponto.velocidadeAtaque, i));
  }
}

function criarRastejador(x, alcance = 250, velocidadeAtaque = 1.5, indice = 0) {
  return {
    tipo: "rastejador",
    x: x,
    y: CHAO_Y - 26,
    largura: 52,
    altura: 26,
    vx: 0,
    vy: 0,
    vida: 1,
    pontos: 60,
    estado: "esperando", // "esperando" | "atacando" | "saltando_mergulho" | "mergulhando" | "subterraneo" | "saindo_terra"
    obstaculoAlvo: null,
    buracoEntradaId: null,
    caminhoId: null,
    rastroPulo: [],
    ocultoNaTerra: false,
    alcanceAtaque: alcance,
    velocidadeAtaque: velocidadeAtaque,
    direcaoOlhar: -1,
    faseCobra: indice * 1.1,
    danoFrames: 0,
    cor: "#9c6644"
  };
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
    ultimoTiro: 0,
    danoFrames: 0
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
// 6. LÓGICA DO SOLDADO, PLATAFORMAS, ESTRUTURAS E DISPAROS
// =========================================================
function atualizarPlataformas() {
  for (let i = estadoJogo.plataformas.length - 1; i >= 0; i--) {
    const plat = estadoJogo.plataformas[i];
    if (!plat.desmoronavel) continue;

    if (plat.pisada && !plat.desmoronando) {
      plat.tempoRestanteFrames--;
      if (plat.tempoRestanteFrames <= 0) {
        plat.desmoronando = true;
        plat.vy = 1.5;

        for (let p = 0; p < 8; p++) {
          estadoJogo.particulasDano.push({
            x: plat.x + Math.random() * plat.largura,
            y: plat.y + plat.altura,
            vx: (Math.random() - 0.5) * 2.5,
            vy: Math.random() * 1.5,
            vida: 18 + Math.floor(Math.random() * 10),
            tamanho: 3 + Math.random() * 3,
            cor: "#8c8275"
          });
        }
      }
    }

    if (plat.desmoronando) {
      plat.vy += GRAVIDADE * 0.7;
      plat.y += plat.vy;
      if (plat.y > canvas.height + 60) {
        estadoJogo.plataformas.splice(i, 1);
      }
    }
  }
}

function obterBlocoPassagemBaixa(estrutura) {
  const alturaBlocoSuperior = Math.max(20, estrutura.alturaTotal - estrutura.alturaPassagem);
  return {
    x: estrutura.x + 12,
    y: estrutura.y,
    largura: estrutura.largura - 24,
    altura: alturaBlocoSuperior
  };
}

function resolverColisaoHorizontal(caixaAtual, xAnterior, bloco) {
  if (!colidiu(caixaAtual, bloco)) return false;

  if (xAnterior + soldado.largura <= bloco.x + 6) {
    soldado.x = bloco.x - soldado.largura;
    soldado.vx = 0;
    return true;
  }
  if (xAnterior >= bloco.x + bloco.largura - 6) {
    soldado.x = bloco.x + bloco.largura;
    soldado.vx = 0;
    return true;
  }
  return false;
}

function atualizarSoldado() {
  const esquerda = teclas["KeyA"] || teclas["ArrowLeft"];
  const direita = teclas["KeyD"] || teclas["ArrowRight"];
  const cima = teclas["KeyW"] || teclas["ArrowUp"];
  const baixo = teclas["KeyS"] || teclas["ArrowDown"];
  const pular = teclas["Space"];
  const atirar = teclas["KeyJ"] || teclas["KeyZ"];

  const querDeitar = Boolean(baixo && soldado.noChao);

  let bloqueadoParaLevantar = false;
  if (!querDeitar && soldado.deitado) {
    const xCentro = soldado.x + soldado.largura / 2;
    const xEmPe = xCentro - soldado.larguraEmPe / 2;
    const yEmPe = soldado.y + soldado.alturaDeitado - soldado.alturaEmPe;
    const caixaEmPe = {
      x: xEmPe,
      y: yEmPe,
      largura: soldado.larguraEmPe,
      altura: soldado.alturaEmPe
    };

    for (let i = 0; i < estadoJogo.estruturasQuebradas.length; i++) {
      const blocoAlto = obterBlocoPassagemBaixa(estadoJogo.estruturasQuebradas[i]);
      if (colidiu(caixaEmPe, blocoAlto)) {
        bloqueadoParaLevantar = true;
        break;
      }
    }
  }

  if (querDeitar && !soldado.deitado) {
    const centroXAntigo = soldado.x + soldado.largura / 2;
    soldado.y += soldado.alturaEmPe - soldado.alturaDeitado;
    soldado.deitado = true;
    soldado.largura = soldado.larguraDeitado;
    soldado.alturaAtual = soldado.alturaDeitado;
    soldado.x = centroXAntigo - soldado.largura / 2;
  } else if (!querDeitar && !bloqueadoParaLevantar && soldado.deitado) {
    const centroXAntigo = soldado.x + soldado.largura / 2;
    soldado.y -= soldado.alturaEmPe - soldado.alturaDeitado;
    soldado.deitado = false;
    soldado.largura = soldado.larguraEmPe;
    soldado.alturaAtual = soldado.alturaEmPe;
    soldado.x = centroXAntigo - soldado.largura / 2;
  }

  soldado.olhandoCima = Boolean(cima && !soldado.deitado);

  const emRecuoDano = estadoJogo.danoSoldadoFrames > 8;
  const fatorVelocidade = soldado.deitado ? 0.55 : 1;

  if (!emRecuoDano) {
    if (esquerda && !direita) {
      soldado.vx = -soldado.velocidade * fatorVelocidade;
      soldado.direcao = -1;
    } else if (direita && !esquerda) {
      soldado.vx = soldado.velocidade * fatorVelocidade;
      soldado.direcao = 1;
    } else {
      soldado.vx *= 0.6;
      if (Math.abs(soldado.vx) < 0.15) {
        soldado.vx = 0;
      }
    }
  }

  if (pular && soldado.noChao && !soldado.deitado) {
    soldado.vy = soldado.forcaPulo;
    soldado.noChao = false;
  }

  const xAnterior = soldado.x;
  const yAnterior = soldado.y;
  soldado.x += soldado.vx;

  for (let i = 0; i < estadoJogo.estruturasQuebradas.length; i++) {
    const blocoAlto = obterBlocoPassagemBaixa(estadoJogo.estruturasQuebradas[i]);
    const caixaAtual = {
      x: soldado.x,
      y: soldado.y,
      largura: soldado.largura,
      altura: soldado.alturaAtual
    };
    resolverColisaoHorizontal(caixaAtual, xAnterior, blocoAlto);
  }

  for (let i = 0; i < estadoJogo.obstaculos.length; i++) {
    const obs = estadoJogo.obstaculos[i];
    const caixaAtual = {
      x: soldado.x,
      y: soldado.y,
      largura: soldado.largura,
      altura: soldado.alturaAtual
    };
    resolverColisaoHorizontal(caixaAtual, xAnterior, obs);
  }

  soldado.vy += GRAVIDADE;
  soldado.y += soldado.vy;

  const configNivel = NIVEIS[estadoJogo.nivelIndice];
  if (soldado.x < estadoJogo.cameraX) {
    soldado.x = estadoJogo.cameraX;
  }
  if (soldado.x + soldado.largura > configNivel.distanciaMeta) {
    soldado.x = configNivel.distanciaMeta - soldado.largura;
  }

  soldado.noChao = false;
  for (let i = 0; i < estadoJogo.plataformas.length; i++) {
    const plat = estadoJogo.plataformas[i];
    if (plat.desmoronando) continue;

    const dentroX = soldado.x + soldado.largura > plat.x && soldado.x < plat.x + plat.largura;
    const cruzouTopo =
      yAnterior + soldado.alturaAtual <= plat.y + 4 &&
      soldado.y + soldado.alturaAtual >= plat.y;

    if (soldado.vy >= 0 && dentroX && cruzouTopo) {
      soldado.y = plat.y - soldado.alturaAtual;
      soldado.vy = 0;
      soldado.noChao = true;

      if (plat.desmoronavel && !plat.pisada) {
        plat.pisada = true;
      }
    }
  }

  for (let i = 0; i < estadoJogo.obstaculos.length; i++) {
    const obs = estadoJogo.obstaculos[i];
    const dentroX = soldado.x + soldado.largura > obs.x && soldado.x < obs.x + obs.largura;
    const cruzouTopo =
      yAnterior + soldado.alturaAtual <= obs.y + 6 &&
      soldado.y + soldado.alturaAtual >= obs.y;

    if (soldado.vy >= 0 && dentroX && cruzouTopo) {
      soldado.y = obs.y - soldado.alturaAtual;
      soldado.vy = 0;
      soldado.noChao = true;
    }
  }

  for (let i = 0; i < estadoJogo.estruturasQuebradas.length; i++) {
    const blocoAlto = obterBlocoPassagemBaixa(estadoJogo.estruturasQuebradas[i]);
    const dentroX =
      soldado.x + soldado.largura > blocoAlto.x &&
      soldado.x < blocoAlto.x + blocoAlto.largura;
    const cruzouTopo =
      yAnterior + soldado.alturaAtual <= blocoAlto.y + 4 &&
      soldado.y + soldado.alturaAtual >= blocoAlto.y;

    if (soldado.vy >= 0 && dentroX && cruzouTopo) {
      soldado.y = blocoAlto.y - soldado.alturaAtual;
      soldado.vy = 0;
      soldado.noChao = true;
    }
  }

  if (soldado.y + soldado.alturaAtual >= CHAO_Y) {
    soldado.y = CHAO_Y - soldado.alturaAtual;
    soldado.vy = 0;
    soldado.noChao = true;
  }

  if (configNivel.numero < 5) {
    const limiteCamera = soldado.x - canvas.width * 0.38;
    if (limiteCamera > estadoJogo.cameraX) {
      estadoJogo.cameraX = Math.min(limiteCamera, configNivel.distanciaMeta - canvas.width);
    }
  }

  if (atirar && estadoJogo.frameAtual - estadoJogo.ultimoTiroFrame >= 14) {
    dispararTiroSoldado();
    estadoJogo.ultimoTiroFrame = estadoJogo.frameAtual;
  }

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
      vy: -velocidadeTiro,
      nivelTiro: "alto"
    });
  } else if (soldado.deitado) {
    const saidaX = soldado.direcao === 1 ? soldado.x + soldado.largura : soldado.x - 14;
    const saidaY = soldado.y + 9;
    estadoJogo.tirosJogador.push({
      x: saidaX,
      y: saidaY,
      largura: 14,
      altura: 6,
      vx: velocidadeTiro * soldado.direcao,
      vy: 0,
      nivelTiro: "baixo"
    });
  } else {
    const saidaX = soldado.direcao === 1 ? soldado.x + soldado.largura : soldado.x - 14;
    const saidaY = soldado.y + 20;
    estadoJogo.tirosJogador.push({
      x: saidaX,
      y: saidaY,
      largura: 14,
      altura: 6,
      vx: velocidadeTiro * soldado.direcao,
      vy: 0,
      nivelTiro: "medio"
    });
  }
}

// =========================================================
// 7. INIMIGOS, BURACOS, CAMINHO SUBTERRÂNEO EM "U" E BOSS
// =========================================================
function gerarInimigos() {
  const configNivel = NIVEIS[estadoJogo.nivelIndice];

  if (configNivel.numero === 1) return;

  if (estadoJogo.frameAtual % configNivel.intervaloSpawn !== 0) return;

  if (configNivel.numero === 5 && (!estadoJogo.boss || estadoJogo.inimigos.length >= 2)) {
    return;
  }

  const tipos = configNivel.tiposInimigos;
  const tipoEscolhido = tipos[Math.floor(Math.random() * tipos.length)];
  const spawnX =
    configNivel.numero === 5
      ? canvas.width - 40
      : Math.min(estadoJogo.cameraX + canvas.width + 30, configNivel.distanciaMeta - 80);

  if (tipoEscolhido === "rastejador") {
    estadoJogo.inimigos.push(criarRastejador(spawnX, 250, 1.55, estadoJogo.frameAtual));
  } else if (tipoEscolhido === "saltador") {
    estadoJogo.inimigos.push({
      tipo: "saltador",
      x: spawnX,
      y: CHAO_Y - 40,
      largura: 34,
      altura: 40,
      vx: -2.7,
      vy: -9,
      vida: 2,
      pontos: 80,
      danoFrames: 0,
      cor: "#d19a66"
    });
  } else if (tipoEscolhido === "atirador") {
    estadoJogo.inimigos.push({
      tipo: "atirador",
      x: spawnX,
      y: CHAO_Y - 48,
      largura: 36,
      altura: 48,
      vx: -1.6,
      vy: 0,
      vida: 2,
      pontos: 110,
      danoFrames: 0,
      cor: "#c678dd",
      ultimoTiro: estadoJogo.frameAtual
    });
  } else if (tipoEscolhido === "drone") {
    estadoJogo.inimigos.push({
      tipo: "drone",
      x: spawnX,
      y: CHAO_Y - 165 - Math.random() * 50,
      largura: 38,
      altura: 24,
      vx: -3.1,
      vy: 0,
      vida: 1,
      pontos: 90,
      danoFrames: 0,
      cor: "#56b6c2"
    });
  } else if (tipoEscolhido === "blindado") {
    estadoJogo.inimigos.push({
      tipo: "blindado",
      x: spawnX,
      y: CHAO_Y - 58,
      largura: 48,
      altura: 58,
      vx: -1.4,
      vy: 0,
      vida: 5,
      pontos: 180,
      danoFrames: 0,
      cor: "#e5c07b"
    });
  }
}

function encontrarObstaculoAFrente(inimigo, dir) {
  const proximoX = dir === 1 ? inimigo.x + inimigo.largura + 18 : inimigo.x - 32;
  const caixaFrente = {
    x: proximoX,
    y: CHAO_Y - 26,
    largura: 32,
    altura: 26
  };

  for (let i = 0; i < estadoJogo.obstaculos.length; i++) {
    if (colidiu(caixaFrente, estadoJogo.obstaculos[i])) {
      return estadoJogo.obstaculos[i];
    }
  }
  return null;
}

function criarBuracoNoSolo(xPos, larguraCorpo, fechandoDesdeInicio = false, duracaoFrames = 140) {
  const id = estadoJogo.frameAtual * 1000 + Math.floor(Math.random() * 999);
  estadoJogo.buracosChao.push({
    id: id,
    x: xPos,
    larguraInicial: larguraCorpo,
    largura: larguraCorpo,
    vidaMax: duracaoFrames,
    vida: duracaoFrames,
    fechando: fechandoDesdeInicio
  });
  return id;
}

function gerarMonticulosFormigueiro(xCentro, larguraFaixa, seedOffset = 0) {
  const montes = [];
  const quantidade = 18;
  for (let m = 0; m < quantidade; m++) {
    const s = seedOffset + m * 37.7;
    const frac = m / Math.max(1, quantidade - 1);
    const dx = (frac - 0.5) * larguraFaixa + Math.sin(s) * 4;
    const raioX = 2.2 + ((m * 13) % 5) * 0.85;
    const raioY = 1.6 + ((m * 7) % 4) * 0.7;
    const deslocY = ((m * 11) % 7) - 2;
    const cores = ["#4a321e", "#6b492b", "#8c6239", "#a47548"];
    montes.push({
      dx: dx,
      dy: deslocY,
      rx: raioX,
      ry: raioY,
      cor: cores[m % cores.length]
    });
  }
  return montes;
}

function criarCaminhoSubterraneo(xEntrada, xSaida, dir, profundidadeMax = 28) {
  const id = estadoJogo.frameAtual * 1000 + Math.floor(Math.random() * 999);
  const distanciaHoriz = Math.abs(xSaida - xEntrada);
  estadoJogo.caminhosSubterraneos.push({
    id: id,
    xEntrada: xEntrada,
    xSaida: xSaida,
    xAtual: xEntrada,
    dir: dir,
    progressoU: 0, // 0 = entrada, 0.5 = fundo do U, 1 = saída
    profundidadeMax: profundidadeMax,
    monticulos: gerarMonticulosFormigueiro(
      (xEntrada + xSaida) / 2,
      Math.max(36, distanciaHoriz + 26),
      id
    ),
    ativo: true,
    vida: 120,
    vidaMax: 120
  });
  return id;
}

function calcularPontoCurvaU(caminho, t) {
  const tClamped = Math.max(0, Math.min(1, t));
  const x = caminho.xEntrada + (caminho.xSaida - caminho.xEntrada) * tClamped;
  const y = CHAO_Y + caminho.profundidadeMax * Math.sin(Math.PI * tClamped);
  return { x, y };
}

function atualizarCaminhosSubterraneos() {
  for (let i = estadoJogo.caminhosSubterraneos.length - 1; i >= 0; i--) {
    const cam = estadoJogo.caminhosSubterraneos[i];
    if (!cam.ativo) {
      cam.vida--;
      if (cam.vida <= 0) {
        estadoJogo.caminhosSubterraneos.splice(i, 1);
      }
    }
  }
}

function atualizarBuracosChao() {
  for (let i = estadoJogo.buracosChao.length - 1; i >= 0; i--) {
    const buraco = estadoJogo.buracosChao[i];
    if (!buraco.fechando) continue;

    buraco.vida--;
    const proporcao = Math.max(0, buraco.vida / buraco.vidaMax);
    const novaLargura = buraco.larguraInicial * proporcao;
    const deltaLargura = buraco.largura - novaLargura;
    buraco.x += deltaLargura / 2;
    buraco.largura = novaLargura;

    if (buraco.vida <= 0 || buraco.largura <= 2) {
      estadoJogo.buracosChao.splice(i, 1);
    }
  }
}

function obterPosicaoCabecaRastejador(inimigo) {
  const dir = inimigo.direcaoOlhar || -1;
  return {
    x: inimigo.x + inimigo.largura / 2 + dir * 14,
    y: inimigo.y + inimigo.altura - 12
  };
}

function registrarPontoArcoPulo(inimigo) {
  const cabeca = obterPosicaoCabecaRastejador(inimigo);
  inimigo.rastroPulo.unshift({
    x: cabeca.x,
    y: cabeca.y,
    vx: inimigo.vx,
    vy: inimigo.vy
  });
  if (inimigo.rastroPulo.length > 70) {
    inimigo.rastroPulo.pop();
  }
}

function inicializarRastroArcoPulo(inimigo) {
  inimigo.rastroPulo = [];
  const cabeca = obterPosicaoCabecaRastejador(inimigo);
  const dir = inimigo.direcaoOlhar || -1;
  for (let k = 0; k < 50; k++) {
    inimigo.rastroPulo.push({
      x: cabeca.x - dir * k * 1.1,
      y: CHAO_Y - 10,
      vx: inimigo.vx,
      vy: 0
    });
  }
}

function iniciarEscavacaoEntrada(inimigo) {
  const obsAFrente = inimigo.obstaculoAlvo;
  const cabeca = obterPosicaoCabecaRastejador(inimigo);
  const xEntrada = obsAFrente
    ? inimigo.direcaoOlhar === 1
      ? obsAFrente.x - 10
      : obsAFrente.x + obsAFrente.largura + 10
    : cabeca.x;
  const xSaida = obsAFrente
    ? inimigo.direcaoOlhar === 1
      ? obsAFrente.x + obsAFrente.largura + 12
      : obsAFrente.x - 12
    : xEntrada + inimigo.direcaoOlhar * 68;

  inimigo.buracoEntradaId = criarBuracoNoSolo(
    xEntrada - 14,
    28,
    true,
    140
  );
  inimigo.caminhoId = criarCaminhoSubterraneo(xEntrada, xSaida, inimigo.direcaoOlhar, 26);
}

function atualizarInimigos() {
  const centroSoldadoX = soldado.x + soldado.largura / 2;

  for (let i = estadoJogo.inimigos.length - 1; i >= 0; i--) {
    const inimigo = estadoJogo.inimigos[i];
    if (inimigo.danoFrames > 0) {
      inimigo.danoFrames--;
    }

    if (inimigo.tipo === "rastejador") {
      const centroInimigoX = inimigo.x + inimigo.largura / 2;
      const distanciaX = centroSoldadoX - centroInimigoX;
      const distanciaAbs = Math.abs(distanciaX);

      if (inimigo.estado === "esperando" && distanciaAbs <= inimigo.alcanceAtaque) {
        inimigo.estado = "atacando";
      }

      if (inimigo.estado === "atacando") {
        inimigo.ocultoNaTerra = false;
        inimigo.vy = 0;
        inimigo.direcaoOlhar = distanciaX >= 0 ? 1 : -1;
        const obsAFrente = encontrarObstaculoAFrente(inimigo, inimigo.direcaoOlhar);

        if (obsAFrente) {
          // Salta formando um "U" invertido com o corpo até mergulhar de cabeça antes do obstáculo
          inimigo.estado = "saltando_mergulho";
          inimigo.obstaculoAlvo = obsAFrente;
          inimigo.ocultoNaTerra = false;
          inimigo.vx = inimigo.direcaoOlhar * 1.35;
          inimigo.vy = -8.6;
          inicializarRastroArcoPulo(inimigo);
          inimigo.x += inimigo.vx;
          inimigo.y += inimigo.vy;
          registrarPontoArcoPulo(inimigo);
        } else {
          inimigo.vx = inimigo.direcaoOlhar * inimigo.velocidadeAtaque;
          inimigo.x += inimigo.vx;
          const onda = Math.sin(estadoJogo.frameAtual * 0.16 + inimigo.faseCobra);
          inimigo.y = CHAO_Y - inimigo.altura - Math.abs(onda) * 2.5;
        }
      } else if (inimigo.estado === "saltando_mergulho") {
        inimigo.vy += GRAVIDADE * 0.85;
        inimigo.x += inimigo.vx;
        inimigo.y += inimigo.vy;
        registrarPontoArcoPulo(inimigo);

        const cabeca = obterPosicaoCabecaRastejador(inimigo);
        if (inimigo.vy > 0 && cabeca.y >= CHAO_Y - 2) {
          inimigo.estado = "mergulhando";
          iniciarEscavacaoEntrada(inimigo);
        }
      } else if (inimigo.estado === "mergulhando") {
        inimigo.vy += GRAVIDADE * 0.85;
        inimigo.x += inimigo.vx;
        inimigo.y += inimigo.vy;
        registrarPontoArcoPulo(inimigo);

        if (estadoJogo.frameAtual % 2 === 0) {
          const buracoAtual = estadoJogo.buracosChao.find((b) => b.id === inimigo.buracoEntradaId);
          const xTerra = buracoAtual
            ? buracoAtual.x + buracoAtual.largura / 2
            : inimigo.x + inimigo.largura / 2;

          estadoJogo.particulasDano.push({
            x: xTerra,
            y: CHAO_Y - 1,
            vx: -inimigo.direcaoOlhar * (1.2 + Math.random() * 2.0),
            vy: -2.4 - Math.random() * 2.0,
            vida: 13 + Math.floor(Math.random() * 6),
            tamanho: 2.2 + Math.random() * 2.2,
            cor: Math.random() < 0.5 ? "#5c4028" : "#9c6644"
          });
        }

        // Só oculta totalmente quando a cauda (último ponto do rastro) também já entrou em CHAO_Y
        const ultimoPonto =
          inimigo.rastroPulo[Math.min(inimigo.rastroPulo.length - 1, 24)] ||
          obterPosicaoCabecaRastejador(inimigo);
        if (ultimoPonto.y >= CHAO_Y + 6) {
          inimigo.ocultoNaTerra = true;
          inimigo.rastroPulo = [];
          inimigo.estado = "subterraneo";
        }
      } else if (inimigo.estado === "subterraneo") {
        inimigo.ocultoNaTerra = true;
        const caminho = estadoJogo.caminhosSubterraneos.find((c) => c.id === inimigo.caminhoId);

        if (caminho) {
          const distanciaHoriz = Math.max(40, Math.abs(caminho.xSaida - caminho.xEntrada));
          const passoT = (inimigo.velocidadeAtaque * 1.35) / distanciaHoriz;
          caminho.progressoU = Math.min(1, caminho.progressoU + passoT);

          const pontoU = calcularPontoCurvaU(caminho, caminho.progressoU);
          caminho.xAtual = pontoU.x;
          inimigo.x = pontoU.x - inimigo.largura / 2;
          inimigo.y = pontoU.y;

          if (estadoJogo.frameAtual % 5 === 0) {
            estadoJogo.particulasDano.push({
              x: pontoU.x + (Math.random() - 0.5) * 8,
              y: CHAO_Y - 1,
              vx: (Math.random() - 0.5) * 1.6,
              vy: -1.4 - Math.random() * 1.5,
              vida: 10 + Math.floor(Math.random() * 6),
              tamanho: 1.8 + Math.random() * 1.8,
              cor: "#7f5539"
            });
          }

          if (caminho.progressoU >= 1) {
            caminho.ativo = false;
            const xSaida = caminho.xSaida;
            inimigo.x = xSaida - inimigo.largura / 2;
            criarBuracoNoSolo(
              xSaida - 14,
              28,
              true,
              140
            );

            inimigo.ocultoNaTerra = false;
            inimigo.estado = "saindo_terra";
            inimigo.y = CHAO_Y - 6;
            inimigo.vy = -8.5;
            inimigo.obstaculoAlvo = null;
            inimigo.buracoEntradaId = null;
            inimigo.caminhoId = null;

            for (let p = 0; p < 9; p++) {
              estadoJogo.particulasDano.push({
                x: xSaida,
                y: CHAO_Y - 1,
                vx: (Math.random() - 0.5) * 3.6,
                vy: -3.2 - Math.random() * 2.5,
                vida: 15 + Math.floor(Math.random() * 8),
                tamanho: 2.5 + Math.random() * 2.2,
                cor: p % 2 === 0 ? "#8c6239" : "#b08968"
              });
            }
          }
        } else {
          inimigo.ocultoNaTerra = false;
          inimigo.estado = "atacando";
        }
      } else if (inimigo.estado === "saindo_terra") {
        inimigo.ocultoNaTerra = false;
        inimigo.x += inimigo.direcaoOlhar * (inimigo.velocidadeAtaque * 0.9);
        inimigo.vy += GRAVIDADE * 0.85;
        inimigo.y += inimigo.vy;

        const chaoSuperficie = CHAO_Y - inimigo.altura;
        if (inimigo.vy >= 0 && inimigo.y >= chaoSuperficie) {
          inimigo.y = chaoSuperficie;
          inimigo.vy = 0;
          inimigo.estado = "atacando";
        }
      } else {
        inimigo.ocultoNaTerra = false;
        inimigo.vx = 0;
        inimigo.vy = 0;
        inimigo.direcaoOlhar = distanciaX >= 0 ? 1 : -1;
        const onda = Math.sin(estadoJogo.frameAtual * 0.1 + inimigo.faseCobra);
        inimigo.y = CHAO_Y - inimigo.altura - Math.abs(onda) * 1.5;
      }
    } else {
      inimigo.x += inimigo.vx;
    }

    if (inimigo.tipo === "saltador") {
      inimigo.vy += GRAVIDADE;
      inimigo.y += inimigo.vy;
      if (inimigo.y + inimigo.altura >= CHAO_Y) {
        inimigo.y = CHAO_Y - inimigo.altura;
        inimigo.vy = -10.5;
      }
    }

    if (inimigo.tipo === "drone") {
      inimigo.y += Math.sin(estadoJogo.frameAtual * 0.08 + i) * 1.3;
    }

    if (inimigo.tipo === "atirador" && estadoJogo.frameAtual - inimigo.ultimoTiro >= 110) {
      const dir = soldado.x < inimigo.x ? -1 : 1;
      estadoJogo.tirosInimigos.push({
        x: inimigo.x,
        y: inimigo.y + 16,
        largura: 12,
        altura: 6,
        vx: 5 * dir,
        vy: 0
      });
      inimigo.ultimoTiro = estadoJogo.frameAtual;
    }

    if (
      !inimigo.ocultoNaTerra &&
      inimigo.estado !== "mergulhando" &&
      colidiu(soldado, inimigo)
    ) {
      const direcaoImpacto =
        soldado.x + soldado.largura / 2 < inimigo.x + inimigo.largura / 2 ? -1 : 1;
      aplicarDanoSoldado(15, direcaoImpacto);
    }

    if (inimigo.x + inimigo.largura < estadoJogo.cameraX - 120) {
      estadoJogo.inimigos.splice(i, 1);
    }
  }
}

function atualizarBoss() {
  const boss = estadoJogo.boss;
  if (!boss) return;

  if (boss.danoFrames > 0) {
    boss.danoFrames--;
  }

  boss.x += boss.vx;
  if (boss.x <= 460 || boss.x + boss.largura >= canvas.width - 20) {
    boss.vx *= -1;
  }

  if (estadoJogo.frameAtual - boss.ultimoTiro >= boss.cadenciaTiro) {
    const alturaTiro = boss.vida % 2 === 0 ? boss.y + boss.altura - 24 : boss.y + 38;
    estadoJogo.tirosInimigos.push({
      x: boss.x - 12,
      y: alturaTiro,
      largura: 16,
      altura: 8,
      vx: -6.2,
      vy: 0
    });
    boss.ultimoTiro = estadoJogo.frameAtual;
  }

  if (colidiu(soldado, boss)) {
    const direcaoImpacto =
      soldado.x + soldado.largura / 2 < boss.x + boss.largura / 2 ? -1 : 1;
    aplicarDanoSoldado(20, direcaoImpacto);
  }
}

// =========================================================
// 8. PROJÉTEIS, PARTÍCULAS DE DANO E COLISÕES
// =========================================================
function atualizarProjeteis() {
  for (let i = estadoJogo.tirosJogador.length - 1; i >= 0; i--) {
    const tiro = estadoJogo.tirosJogador[i];
    tiro.x += tiro.vx;
    tiro.y += tiro.vy;

    let acertou = false;

    for (let j = estadoJogo.inimigos.length - 1; j >= 0; j--) {
      const inimigo = estadoJogo.inimigos[j];
      if (inimigo.ocultoNaTerra || inimigo.estado === "mergulhando") continue;

      if (colidiu(tiro, inimigo)) {
        if (inimigo.tipo === "rastejador" && tiro.nivelTiro !== "baixo") {
          continue;
        }

        inimigo.vida -= 1;
        inimigo.danoFrames = 10;
        acertou = true;
        if (inimigo.vida <= 0) {
          estadoJogo.pontuacao += inimigo.pontos;
          estadoJogo.inimigos.splice(j, 1);
        }
        break;
      }
    }

    if (!acertou && estadoJogo.boss && colidiu(tiro, estadoJogo.boss)) {
      estadoJogo.boss.vida -= 1;
      estadoJogo.boss.danoFrames = 8;
      acertou = true;
      estadoJogo.pontuacao += 25;

      if (estadoJogo.boss.vida <= 0) {
        estadoJogo.pontuacao += 1000;
        estadoJogo.boss = null;
        atualizarHUD();
        finalizarPartida(true);
        return;
      }
    }

    const foraDaTela =
      tiro.x < estadoJogo.cameraX - 40 ||
      tiro.x > estadoJogo.cameraX + canvas.width + 40 ||
      tiro.y < -40;

    if (acertou || foraDaTela) {
      estadoJogo.tirosJogador.splice(i, 1);
    }
  }

  for (let i = estadoJogo.tirosInimigos.length - 1; i >= 0; i--) {
    const tiro = estadoJogo.tirosInimigos[i];
    tiro.x += tiro.vx;
    tiro.y += tiro.vy;

    const hitboxSoldado = {
      x: soldado.x,
      y: soldado.y,
      largura: soldado.largura,
      altura: soldado.alturaAtual
    };

    if (colidiu(tiro, hitboxSoldado)) {
      const direcaoImpacto = tiro.vx < 0 ? -1 : 1;
      aplicarDanoSoldado(12, direcaoImpacto);
      estadoJogo.tirosInimigos.splice(i, 1);
      continue;
    }

    if (tiro.x < estadoJogo.cameraX - 50 || tiro.x > estadoJogo.cameraX + canvas.width + 50) {
      estadoJogo.tirosInimigos.splice(i, 1);
    }
  }
}

function atualizarParticulasDano() {
  if (estadoJogo.danoSoldadoFrames > 0) {
    estadoJogo.danoSoldadoFrames--;
  }
  if (estadoJogo.pulsoTelaDano > 0) {
    estadoJogo.pulsoTelaDano--;
  }
  estadoJogo.inclinacaoDano *= 0.82;

  for (let i = estadoJogo.particulasDano.length - 1; i >= 0; i--) {
    const p = estadoJogo.particulasDano[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.25;
    p.vida--;

    if (p.vida <= 0) {
      estadoJogo.particulasDano.splice(i, 1);
    }
  }
}

function aplicarDanoSoldado(dano, direcaoImpacto = -1) {
  if (estadoJogo.frameAtual < estadoJogo.invulneravelAte) return;

  soldado.vida = Math.max(0, soldado.vida - dano);
  estadoJogo.invulneravelAte = estadoJogo.frameAtual + 45;
  estadoJogo.danoSoldadoFrames = 16;
  estadoJogo.pulsoTelaDano = 12;

  const dir = direcaoImpacto >= 0 ? 1 : -1;
  soldado.vx = dir * 4.2;
  if (soldado.noChao) {
    soldado.vy = -4.5;
    soldado.noChao = false;
  }
  estadoJogo.inclinacaoDano = -dir * soldado.direcao * 0.28;

  const origemX = soldado.x + soldado.largura / 2;
  const origemY = soldado.y + soldado.alturaAtual * 0.45;
  for (let i = 0; i < 10; i++) {
    const angulo = (Math.random() - 0.5) * Math.PI * 1.2 + (dir < 0 ? Math.PI : 0);
    const velocidade = 1.8 + Math.random() * 3.8;
    estadoJogo.particulasDano.push({
      x: origemX,
      y: origemY,
      vx: Math.cos(angulo) * velocidade,
      vy: Math.sin(angulo) * velocidade - 1.5,
      vida: 14 + Math.floor(Math.random() * 10),
      tamanho: 2 + Math.random() * 2.5,
      cor: i % 2 === 0 ? "#ff922b" : "#ffe066"
    });
  }

  if (soldado.vida <= 0) {
    atualizarHUD();
    finalizarPartida(false);
  }
}

function colidiu(a, b) {
  const alturaA = a.altura !== undefined ? a.altura : a.alturaAtual;
  const alturaB = b.altura !== undefined ? b.altura : b.alturaAtual;

  return (
    a.x < b.x + b.largura &&
    a.x + a.largura > b.x &&
    a.y < b.y + alturaB &&
    a.y + alturaA > b.y
  );
}

// =========================================================
// 9. ATUALIZAÇÃO DO DOM (HUD) E RENDERIZAÇÃO NO CANVAS
// =========================================================
function atualizarHUD() {
  const configNivel = NIVEIS[estadoJogo.nivelIndice];
  hudNivel.textContent = `${configNivel.numero} / ${NIVEIS.length}`;
  hudVida.textContent = soldado.vida;
  hudPontos.textContent = estadoJogo.pontuacao;

  if (configNivel.numero < 5) {
    const pct = Math.min(100, Math.floor((soldado.x / (configNivel.distanciaMeta - 40)) * 100));
    hudProgresso.textContent = `${pct}%`;
  } else {
    hudProgresso.textContent = estadoJogo.boss ? "BOSS!" : "100%";
  }
}

function desenharCaminhosSubterraneos() {
  for (let i = 0; i < estadoJogo.caminhosSubterraneos.length; i++) {
    const cam = estadoJogo.caminhosSubterraneos[i];
    const alfa = cam.ativo ? 1 : Math.max(0, cam.vida / cam.vidaMax);
    const maxT = cam.ativo ? cam.progressoU : 1;
    const passos = Math.max(8, Math.floor(maxT * 28));

    ctx.save();
    ctx.globalAlpha = alfa;

    // 1. Caminho curvo em "U" dentro da terra
    ctx.strokeStyle = "#140d07";
    ctx.lineWidth = 11;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    for (let s = 0; s <= passos; s++) {
      const t = (s / passos) * maxT;
      const pt = calcularPontoCurvaU(cam, t);
      if (s === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();

    ctx.strokeStyle = "#5c4028";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let s = 0; s <= passos; s++) {
      const t = (s / passos) * maxT;
      const pt = calcularPontoCurvaU(cam, t);
      if (s === 0) ctx.moveTo(pt.x, pt.y + 4);
      else ctx.lineTo(pt.x, pt.y + 4);
    }
    ctx.stroke();

    // 2. Rastro de terra escavada tipo formigueiro na superfície do solo
    const centroFormigueiroX = (cam.xEntrada + cam.xSaida) / 2;
    const visibilidadeMonticulos = Math.min(1, maxT * 1.4);

    for (let m = 0; m < cam.monticulos.length; m++) {
      const mt = cam.monticulos[m];
      const mx = centroFormigueiroX + mt.dx * visibilidadeMonticulos;
      const my = CHAO_Y + mt.dy;

      ctx.fillStyle = mt.cor;
      ctx.beginPath();
      ctx.ellipse(mx, my, mt.rx, mt.ry, 0, Math.PI, Math.PI * 2);
      ctx.fill();
    }

    // 3. Terra revolvida avançando junto com o ponto atual do "U"
    if (cam.ativo) {
      const ponta = calcularPontoCurvaU(cam, cam.progressoU);
      const tremor = Math.sin(estadoJogo.frameAtual * 0.55) * 1.8;

      ctx.fillStyle = "#8c6239";
      ctx.beginPath();
      ctx.arc(ponta.x + tremor, ponta.y, 6.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#b08968";
      ctx.beginPath();
      ctx.arc(ponta.x - tremor * 0.6, ponta.y - 2, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

function desenharBuracosChao() {
  for (let i = 0; i < estadoJogo.buracosChao.length; i++) {
    const buraco = estadoJogo.buracosChao[i];
    const proporcao = Math.max(0, buraco.vida / buraco.vidaMax);
    const raioX = Math.max(1.5, buraco.largura / 2);
    const raioY = Math.max(1.5, 6 * proporcao);
    const centroX = buraco.x + buraco.largura / 2;

    ctx.save();
    ctx.globalAlpha = Math.min(1, proporcao * 1.2);

    ctx.fillStyle = "#5c4028";
    ctx.beginPath();
    ctx.moveTo(centroX - raioX - 10 * proporcao, CHAO_Y + 2);
    ctx.quadraticCurveTo(
      centroX - raioX * 0.6,
      CHAO_Y - 9 * proporcao,
      centroX,
      CHAO_Y - 5 * proporcao
    );
    ctx.quadraticCurveTo(
      centroX + raioX * 0.6,
      CHAO_Y - 10 * proporcao,
      centroX + raioX + 10 * proporcao,
      CHAO_Y + 2
    );
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#8c6239";
    ctx.beginPath();
    ctx.arc(centroX - raioX * 0.7, CHAO_Y - 3 * proporcao, 3.5 * proporcao, 0, Math.PI * 2);
    ctx.arc(centroX + raioX * 0.75, CHAO_Y - 3.5 * proporcao, 3 * proporcao, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#140f0a";
    ctx.beginPath();
    ctx.ellipse(centroX, CHAO_Y + 2, raioX, raioY, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

function desenharEstruturasQuebradas() {
  for (let i = 0; i < estadoJogo.estruturasQuebradas.length; i++) {
    const est = estadoJogo.estruturasQuebradas[i];
    const blocoAlto = obterBlocoPassagemBaixa(est);

    ctx.fillStyle = "#48443d";
    ctx.fillRect(est.x, est.y + 16, 14, est.alturaTotal - 16);
    ctx.fillRect(est.x + est.largura - 14, est.y + 28, 14, est.alturaTotal - 28);

    ctx.fillStyle = "#36332e";
    ctx.beginPath();
    ctx.moveTo(est.x, est.y + 16);
    ctx.lineTo(est.x + 28, est.y);
    ctx.lineTo(est.x + 56, est.y + 12);
    ctx.lineTo(est.x + 84, est.y + 4);
    ctx.lineTo(est.x + est.largura, est.y + 28);
    ctx.lineTo(est.x + est.largura, blocoAlto.y + blocoAlto.altura);
    ctx.lineTo(est.x, blocoAlto.y + blocoAlto.altura);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#5a544a";
    ctx.fillRect(blocoAlto.x, blocoAlto.y, blocoAlto.largura, blocoAlto.altura);
    ctx.fillStyle = "#787064";
    ctx.fillRect(blocoAlto.x, blocoAlto.y + blocoAlto.altura - 5, blocoAlto.largura, 5);

    ctx.strokeStyle = "#8c4a27";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(blocoAlto.x + 12, blocoAlto.y + blocoAlto.altura);
    ctx.lineTo(blocoAlto.x + 16, blocoAlto.y + blocoAlto.altura + 5);
    ctx.moveTo(blocoAlto.x + blocoAlto.largura - 18, blocoAlto.y + blocoAlto.altura);
    ctx.lineTo(blocoAlto.x + blocoAlto.largura - 14, blocoAlto.y + blocoAlto.altura + 4);
    ctx.stroke();
  }
}

function desenharCenarioPosApocaliptico(configNivel) {
  const gradienteCeu = ctx.createLinearGradient(0, 0, 0, CHAO_Y);
  gradienteCeu.addColorStop(0, "#191d1c");
  gradienteCeu.addColorStop(0.65, "#2b2a24");
  gradienteCeu.addColorStop(1, "#463c2d");
  ctx.fillStyle = gradienteCeu;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(226, 194, 134, 0.16)";
  ctx.beginPath();
  ctx.arc(690, 95, 48, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(-estadoJogo.cameraX * 0.35, 0);
  for (let bx = 60; bx < configNivel.distanciaMeta; bx += 220) {
    const alturaPredio = 110 + ((bx * 17) % 90);
    const topoPredio = CHAO_Y - alturaPredio;

    ctx.fillStyle = "#1d201f";
    ctx.fillRect(bx, topoPredio, 110, alturaPredio);

    ctx.fillStyle = configNivel.corCeu;
    ctx.beginPath();
    ctx.moveTo(bx + 25, topoPredio);
    ctx.lineTo(bx + 52, topoPredio + 26);
    ctx.lineTo(bx + 78, topoPredio + 8);
    ctx.lineTo(bx + 92, topoPredio + 22);
    ctx.lineTo(bx + 110, topoPredio);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#121413";
    for (let wy = topoPredio + 28; wy < CHAO_Y - 24; wy += 24) {
      for (let wx = bx + 14; wx < bx + 88; wx += 26) {
        if ((wx + wy) % 3 !== 0) {
          ctx.fillRect(wx, wy, 12, 12);
        }
      }
    }
  }
  ctx.restore();

  ctx.save();
  ctx.translate(-estadoJogo.cameraX, 0);

  ctx.fillStyle = configNivel.corChao;
  ctx.fillRect(0, CHAO_Y, configNivel.distanciaMeta + 200, canvas.height - CHAO_Y);

  ctx.fillStyle = "#524a3c";
  ctx.fillRect(0, CHAO_Y, configNivel.distanciaMeta + 200, 6);

  ctx.strokeStyle = "#24201a";
  ctx.lineWidth = 2;
  for (let rx = 90; rx < configNivel.distanciaMeta + 150; rx += 130) {
    ctx.beginPath();
    ctx.moveTo(rx, CHAO_Y + 6);
    ctx.lineTo(rx - 12, CHAO_Y + 22);
    ctx.lineTo(rx + 6, CHAO_Y + 38);
    ctx.stroke();
  }

  for (let i = 0; i < estadoJogo.obstaculos.length; i++) {
    const obs = estadoJogo.obstaculos[i];
    ctx.fillStyle = "#595247";
    ctx.beginPath();
    ctx.moveTo(obs.x, obs.y + obs.altura);
    ctx.lineTo(obs.x + 8, obs.y + 8);
    ctx.lineTo(obs.x + obs.largura * 0.52, obs.y);
    ctx.lineTo(obs.x + obs.largura * 0.82, obs.y + 11);
    ctx.lineTo(obs.x + obs.largura, obs.y + obs.altura);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#3d3830";
    ctx.fillRect(obs.x + 12, obs.y + 12, 14, 8);

    ctx.strokeStyle = "#8c4a27";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(obs.x + obs.largura * 0.6, obs.y + 5);
    ctx.lineTo(obs.x + obs.largura * 0.85, obs.y - 9);
    ctx.stroke();
  }

  ctx.restore();
}

function desenharPlataformas(configNivel) {
  for (let i = 0; i < estadoJogo.plataformas.length; i++) {
    const plat = estadoJogo.plataformas[i];

    if (plat.desmoronavel) {
      const tremor =
        plat.pisada && !plat.desmoronando
          ? Math.sin(estadoJogo.frameAtual * 1.6) * 2.5
          : 0;
      const px = plat.x + tremor;

      ctx.save();
      if (plat.desmoronando) {
        ctx.translate(px + plat.largura / 2, plat.y + plat.altura / 2);
        ctx.rotate(Math.min(0.25, plat.vy * 0.02));
        ctx.translate(-(px + plat.largura / 2), -(plat.y + plat.altura / 2));
      }

      ctx.fillStyle = plat.pisada && !plat.desmoronando ? "#7a6855" : "#615b52";
      ctx.beginPath();
      ctx.moveTo(px, plat.y + 3);
      ctx.lineTo(px + plat.largura * 0.28, plat.y);
      ctx.lineTo(px + plat.largura * 0.65, plat.y + 4);
      ctx.lineTo(px + plat.largura, plat.y + 1);
      ctx.lineTo(px + plat.largura - 4, plat.y + plat.altura);
      ctx.lineTo(px + 5, plat.y + plat.altura);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#423d36";
      ctx.fillRect(px + 14, plat.y + 7, 22, 6);
      ctx.fillRect(px + plat.largura - 36, plat.y + 8, 18, 5);

      ctx.restore();
    } else if (configNivel.numero === 1) {
      ctx.fillStyle = "#5c574f";
      ctx.fillRect(plat.x, plat.y, plat.largura, plat.altura);
    } else {
      ctx.fillStyle = "#6c7a89";
      ctx.fillRect(plat.x, plat.y, plat.largura, plat.altura);
    }
  }
}

function desenharRastejadorAlien(inimigo) {
  if (inimigo.ocultoNaTerra) return;

  const saltandoMergulho = inimigo.estado === "saltando_mergulho";
  const mergulhando = inimigo.estado === "mergulhando";
  const saindo = inimigo.estado === "saindo_terra";
  const dir = inimigo.direcaoOlhar || -1;
  const emDano = inimigo.danoFrames > 0;
  const tremorDano = emDano ? Math.sin(estadoJogo.frameAtual * 1.4) * 3.5 : 0;

  ctx.save();

  // Durante o salto em arco e o mergulho, cada segmento segue a parábola formando um "U" de cabeça para baixo
  if ((saltandoMergulho || mergulhando) && inimigo.rastroPulo.length > 0) {
    ctx.beginPath();
    ctx.rect(
      estadoJogo.cameraX - 80,
      -80,
      canvas.width + 160,
      CHAO_Y + 80
    );
    ctx.clip();

    const segmentos = 6;
    const espacoIndices = 4;

    for (let s = segmentos; s >= 1; s--) {
      const idx = Math.min(inimigo.rastroPulo.length - 1, s * espacoIndices);
      const pt = inimigo.rastroPulo[idx];
      const ptFrente = inimigo.rastroPulo[Math.max(0, idx - 2)];
      const tangenteAngulo = Math.atan2(ptFrente.y - pt.y, ptFrente.x - pt.x);
      const normalX = Math.sin(tangenteAngulo);
      const normalY = -Math.cos(tangenteAngulo);
      const proporcao = s / segmentos;
      const raio = Math.max(3.5, 9 * (1 - proporcao * 0.55));

      ctx.fillStyle = emDano
        ? s % 2 === 0
          ? "#ffffff"
          : "#ff6b6b"
        : s % 2 === 0
        ? "#9c6644"
        : "#7f5539";
      ctx.beginPath();
      ctx.arc(pt.x + tremorDano, pt.y, raio, 0, Math.PI * 2);
      ctx.fill();

      // Espinho dorsal acompanhando a curvatura do "U" invertido
      ctx.fillStyle = emDano ? "#ffd43b" : "#c8553d";
      ctx.beginPath();
      ctx.moveTo(
        pt.x + tremorDano + normalX * raio - Math.cos(tangenteAngulo) * 2,
        pt.y + normalY * raio - Math.sin(tangenteAngulo) * 2
      );
      ctx.lineTo(
        pt.x + tremorDano + normalX * (raio + 4.5 * (1 - proporcao * 0.4)),
        pt.y + normalY * (raio + 4.5 * (1 - proporcao * 0.4))
      );
      ctx.lineTo(
        pt.x + tremorDano + normalX * raio + Math.cos(tangenteAngulo) * 2,
        pt.y + normalY * raio + Math.sin(tangenteAngulo) * 2
      );
      ctx.closePath();
      ctx.fill();
    }

    // Cabeça na ponta frontal do arco mergulhando
    const ptCabeca = inimigo.rastroPulo[0];
    const anguloCabeca = Math.atan2(ptCabeca.vy, ptCabeca.vx);

    ctx.save();
    ctx.translate(ptCabeca.x + tremorDano, ptCabeca.y);
    ctx.rotate(anguloCabeca);
    ctx.scale(-1, dir === 1 ? 1 : -1);

    ctx.fillStyle = emDano ? "#ffffff" : "#b08968";
    ctx.beginPath();
    ctx.ellipse(0, 0, 11, 8.5, -0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ede0d4";
    ctx.beginPath();
    ctx.moveTo(-8, 3);
    ctx.lineTo(-12, 8);
    ctx.lineTo(-5, 5);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = emDano ? "#ff2a55" : "#e03131";
    ctx.beginPath();
    ctx.arc(-2, -3, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#111417";
    ctx.fillRect(-2.5, -5, 1.5, 4);

    ctx.restore();
    ctx.restore();
    return;
  }

  const baseY = inimigo.y + inimigo.altura;
  const freq = inimigo.estado === "atacando" ? 0.18 : 0.12;
  const tempo = estadoJogo.frameAtual * freq + inimigo.faseCobra;

  const centroX = inimigo.x + inimigo.largura / 2 + tremorDano;
  ctx.translate(centroX, baseY);
  ctx.scale(-dir, 1);

  if (saindo) {
    const anguloSaida = Math.max(-0.85, Math.min(0.45, inimigo.vy * 0.08));
    ctx.rotate(anguloSaida);
  }

  const cabecaX = -14;
  const cabecaY = -12 + Math.sin(tempo) * 2.2;

  const segmentos = 6;
  for (let s = segmentos; s >= 1; s--) {
    const proporcao = s / segmentos;
    const segX = cabecaX + s * 7;
    const ondaY = Math.sin(tempo - s * 0.85) * (4 * proporcao);
    const segY = -9 + ondaY;
    const raio = Math.max(3.5, 9 * (1 - proporcao * 0.55));

    if (emDano) {
      ctx.fillStyle = s % 2 === 0 ? "#ffffff" : "#ff6b6b";
    } else {
      ctx.fillStyle = s % 2 === 0 ? "#9c6644" : "#7f5539";
    }
    ctx.beginPath();
    ctx.arc(segX, segY, raio, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = emDano
      ? "#ffd43b"
      : inimigo.estado === "atacando"
      ? "#c8553d"
      : "#ddb892";
    ctx.beginPath();
    ctx.moveTo(segX - 2, segY - raio);
    ctx.lineTo(segX + 1, segY - raio - 4 * (1 - proporcao * 0.4));
    ctx.lineTo(segX + 4, segY - raio);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = emDano ? "#ffffff" : "#b08968";
  ctx.beginPath();
  ctx.ellipse(cabecaX, cabecaY, 11, 8.5, -0.15, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ede0d4";
  ctx.beginPath();
  ctx.moveTo(cabecaX - 8, cabecaY + 3);
  ctx.lineTo(cabecaX - 12, cabecaY + 8);
  ctx.lineTo(cabecaX - 5, cabecaY + 5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = emDano ? "#ff2a55" : inimigo.estado === "atacando" ? "#e03131" : "#e6a15c";
  ctx.beginPath();
  ctx.arc(cabecaX - 2, cabecaY - 3, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#111417";
  ctx.fillRect(cabecaX - 2.5, cabecaY - 5, 1.5, 4);

  ctx.restore();
}

function desenharInimigoPadrao(inimigo) {
  const emDano = inimigo.danoFrames > 0;
  const tremor = emDano ? Math.sin(estadoJogo.frameAtual * 1.4) * 3 : 0;
  ctx.fillStyle = emDano ? "#ffffff" : inimigo.cor;
  ctx.fillRect(inimigo.x + tremor, inimigo.y, inimigo.largura, inimigo.altura);
  if (emDano) {
    ctx.strokeStyle = "#ff4d4f";
    ctx.lineWidth = 2;
    ctx.strokeRect(inimigo.x + tremor, inimigo.y, inimigo.largura, inimigo.altura);
  }
}

function desenharSoldado() {
  const emDano = estadoJogo.danoSoldadoFrames > 0;
  const centroX = soldado.x + soldado.largura / 2;
  const baseY = soldado.y + soldado.alturaAtual;
  const andando = Math.abs(soldado.vx) > 0.1 && soldado.noChao;
  const paradoNoChao = !andando && soldado.noChao;
  const cicloPasso = andando ? Math.sin(estadoJogo.frameAtual * 0.35) : 0;
  const cicloRastejar = andando && soldado.deitado ? Math.sin(estadoJogo.frameAtual * 0.32) : 0;
  const cicloRespiracao = paradoNoChao ? Math.sin(estadoJogo.frameAtual * 0.08) : 0;
  const atirouAgora = estadoJogo.frameAtual - estadoJogo.ultimoTiroFrame <= 3;

  ctx.save();
  ctx.translate(centroX, baseY);
  ctx.scale(soldado.direcao, 1);

  if (emDano) {
    ctx.rotate(estadoJogo.inclinacaoDano);
  }

  if (soldado.deitado) {
    const impulsoRastejarX = cicloRastejar * 2.5;
    const elevacaoTroncoY = andando ? Math.abs(cicloRastejar) * -1.8 : cicloRespiracao * 0.5;
    const movimentoPerna = andando ? cicloRastejar * 4 : 0;
    const movimentoCotovelo = andando ? -cicloRastejar * 3 : 0;

    ctx.fillStyle = "#2b3a2e";
    ctx.fillRect(-24 + movimentoPerna * 0.6, -8 + Math.min(0, movimentoPerna * 0.4), 13, 5);
    ctx.fillStyle = "#1a1d20";
    ctx.fillRect(-26 + movimentoPerna * 0.6, -6 + Math.min(0, movimentoPerna * 0.4), 5, 6);

    ctx.fillStyle = "#3b4f3f";
    ctx.fillRect(-22 - movimentoPerna * 0.6, -6 + Math.min(0, -movimentoPerna * 0.4), 13, 5);
    ctx.fillStyle = "#1a1d20";
    ctx.fillRect(-24 - movimentoPerna * 0.6, -5 + Math.min(0, -movimentoPerna * 0.4), 5, 5);

    ctx.fillStyle = "#263329";
    ctx.fillRect(-13 + impulsoRastejarX * 0.5, -15 + elevacaoTroncoY, 7, 8);

    ctx.fillStyle = "#4a634e";
    ctx.fillRect(-12 + impulsoRastejarX * 0.5, -14 + elevacaoTroncoY, 20, 9);
    ctx.fillStyle = "#2d3b30";
    ctx.fillRect(-10 + impulsoRastejarX * 0.5, -13 + elevacaoTroncoY, 16, 6);

    ctx.fillStyle = "#d9a077";
    ctx.fillRect(8 + impulsoRastejarX * 0.4, -12 + elevacaoTroncoY * 0.8, 8, 7);
    ctx.fillStyle = "#2f4233";
    ctx.beginPath();
    ctx.arc(12 + impulsoRastejarX * 0.4, -11 + elevacaoTroncoY * 0.8, 6.5, Math.PI * 0.85, Math.PI * 1.95);
    ctx.fill();
    ctx.fillRect(6 + impulsoRastejarX * 0.4, -14 + elevacaoTroncoY * 0.8, 12, 2.5);
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(13 + impulsoRastejarX * 0.4, -10 + elevacaoTroncoY * 0.8, 4, 2.5);

    ctx.fillStyle = "#4a634e";
    ctx.fillRect(2 + movimentoCotovelo * 0.5, -6 + Math.min(0, movimentoCotovelo * 0.4), 8, 5);

    desenharFuzil(11 + impulsoRastejarX * 0.4, -9 + elevacaoTroncoY * 0.6, 0, atirouAgora);
  } else {
    const deslocamentoPerna = soldado.noChao ? cicloPasso * 7 : 5;
    const elevacaoPulo = soldado.noChao ? 0 : -4;
    const deslocamentoRespiracaoY = cicloRespiracao * 1.4;
    const expansaoPeito = Math.max(0, cicloRespiracao) * 1.2;
    const balancoTronco = andando
      ? Math.abs(cicloPasso) * 1.5
      : deslocamentoRespiracaoY;

    ctx.fillStyle = "#2b3a2e";
    ctx.fillRect(-5 - deslocamentoPerna, -22 + elevacaoPulo, 8, 16);
    ctx.fillStyle = "#1a1d20";
    ctx.fillRect(-5 - deslocamentoPerna, -7 + elevacaoPulo, 10, 7);

    ctx.fillStyle = "#3b4f3f";
    ctx.fillRect(-3 + deslocamentoPerna, -22, 8, 16);
    ctx.fillStyle = "#1a1d20";
    ctx.fillRect(-3 + deslocamentoPerna, -7, 11, 7);

    ctx.fillStyle = "#263329";
    ctx.fillRect(-13, -42 + balancoTronco, 6, 17);

    ctx.fillStyle = "#4a634e";
    ctx.fillRect(
      -8,
      -44 + balancoTronco - expansaoPeito * 0.5,
      16 + expansaoPeito,
      23 + expansaoPeito * 0.5
    );
    ctx.fillStyle = "#2d3b30";
    ctx.fillRect(
      -6,
      -42 + balancoTronco - expansaoPeito * 0.5,
      13 + expansaoPeito,
      17 + expansaoPeito * 0.5
    );
    ctx.fillStyle = "#5c7a62";
    ctx.fillRect(-4, -33 + balancoTronco, 4, 6);
    ctx.fillRect(1, -33 + balancoTronco, 4, 6);

    ctx.fillStyle = "#d9a077";
    ctx.fillRect(-3, -47 + balancoTronco, 6, 4);
    ctx.fillRect(-5, -56 + balancoTronco, 11, 10);

    ctx.fillStyle = "#2f4233";
    ctx.beginPath();
    ctx.arc(0, -54 + balancoTronco, 7.5, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(-7, -55 + balancoTronco, 15, 3);
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(1, -52 + balancoTronco, 6, 3.5);

    if (soldado.olhandoCima) {
      desenharFuzil(3, -38 + balancoTronco, -Math.PI / 2, atirouAgora);
    } else {
      desenharFuzil(2, -35 + balancoTronco, 0, atirouAgora);
    }
  }

  ctx.restore();
}

function desenharFuzil(origemX, origemY, angulo, atirouAgora) {
  ctx.save();
  ctx.translate(origemX, origemY);
  ctx.rotate(angulo);

  ctx.fillStyle = "#4a634e";
  ctx.fillRect(-4, -2, 12, 5);
  ctx.fillStyle = "#d9a077";
  ctx.fillRect(7, -2, 4, 4);

  ctx.fillStyle = "#1f2428";
  ctx.fillRect(-8, -3, 24, 5);

  ctx.fillStyle = "#111417";
  ctx.fillRect(3, 2, 4, 7);

  ctx.fillStyle = "#343a40";
  ctx.fillRect(1, -6, 7, 3);

  ctx.fillStyle = "#495057";
  ctx.fillRect(16, -2, 9, 3);

  if (atirouAgora) {
    ctx.fillStyle = "#ffd43b";
    ctx.beginPath();
    ctx.moveTo(25, -1);
    ctx.lineTo(35, -6);
    ctx.lineTo(32, -1);
    ctx.lineTo(36, 4);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

function desenharCena() {
  const configNivel = NIVEIS[estadoJogo.nivelIndice];

  if (configNivel.numero === 1) {
    desenharCenarioPosApocaliptico(configNivel);
  } else {
    ctx.fillStyle = configNivel.corCeu;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.save();
  ctx.translate(-estadoJogo.cameraX, 0);

  if (configNivel.numero !== 1) {
    ctx.fillStyle = configNivel.corChao;
    ctx.fillRect(0, CHAO_Y, configNivel.distanciaMeta + 200, canvas.height - CHAO_Y);
    ctx.fillStyle = "#5c7a62";
    ctx.fillRect(0, CHAO_Y, configNivel.distanciaMeta + 200, 5);
  }

  desenharCaminhosSubterraneos();
  desenharBuracosChao();
  desenharEstruturasQuebradas();
  desenharPlataformas(configNivel);

  if (configNivel.numero < 5) {
    ctx.fillStyle = "#f0b429";
    ctx.fillRect(configNivel.distanciaMeta - 35, CHAO_Y - 90, 12, 90);
    ctx.fillStyle = "#38b2ac";
    ctx.fillRect(configNivel.distanciaMeta - 23, CHAO_Y - 90, 34, 24);
  }

  const piscando =
    estadoJogo.frameAtual < estadoJogo.invulneravelAte &&
    Math.floor(estadoJogo.frameAtual / 4) % 2 === 0;

  if (!piscando || estadoJogo.danoSoldadoFrames > 0) {
    desenharSoldado();
  }

  for (let i = 0; i < estadoJogo.particulasDano.length; i++) {
    const p = estadoJogo.particulasDano[i];
    ctx.globalAlpha = Math.max(0, p.vida / 24);
    ctx.fillStyle = p.cor;
    ctx.fillRect(p.x, p.y, p.tamanho, p.tamanho);
  }
  ctx.globalAlpha = 1;

  for (let i = 0; i < estadoJogo.inimigos.length; i++) {
    const inimigo = estadoJogo.inimigos[i];
    if (inimigo.tipo === "rastejador") {
      desenharRastejadorAlien(inimigo);
    } else {
      desenharInimigoPadrao(inimigo);
    }
  }

  if (estadoJogo.boss) {
    const boss = estadoJogo.boss;
    const bossEmDano = boss.danoFrames > 0;
    const tremorBoss = bossEmDano ? Math.sin(estadoJogo.frameAtual * 1.4) * 3 : 0;

    ctx.fillStyle = bossEmDano ? "#ff8787" : "#e03131";
    ctx.fillRect(boss.x + tremorBoss, boss.y, boss.largura, boss.altura);

    ctx.fillStyle = "#212529";
    ctx.fillRect(boss.x + tremorBoss - 16, boss.y + 34, 20, 12);
    ctx.fillRect(boss.x + tremorBoss - 16, boss.y + boss.altura - 26, 20, 12);
  }

  ctx.fillStyle = "#ffe066";
  for (let i = 0; i < estadoJogo.tirosJogador.length; i++) {
    const t = estadoJogo.tirosJogador[i];
    ctx.fillRect(t.x, t.y, t.largura, t.altura);
  }

  ctx.fillStyle = "#ff6b6b";
  for (let i = 0; i < estadoJogo.tirosInimigos.length; i++) {
    const t = estadoJogo.tirosInimigos[i];
    ctx.fillRect(t.x, t.y, t.largura, t.altura);
  }

  ctx.restore();

  if (estadoJogo.pulsoTelaDano > 0) {
    const alfa = (estadoJogo.pulsoTelaDano / 12) * 0.28;
    ctx.strokeStyle = `rgba(224, 49, 49, ${alfa})`;
    ctx.lineWidth = 14;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }

  if (estadoJogo.boss) {
    const boss = estadoJogo.boss;
    const larguraBarra = 360;
    const xBarra = (canvas.width - larguraBarra) / 2;
    ctx.fillStyle = "#212529";
    ctx.fillRect(xBarra, 18, larguraBarra, 16);
    ctx.fillStyle = "#fa5252";
    ctx.fillRect(xBarra, 18, larguraBarra * (boss.vida / boss.vidaMaxima), 16);
    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(xBarra, 18, larguraBarra, 16);
  }

  if (estadoJogo.avisoNivelFrames > 0) {
    estadoJogo.avisoNivelFrames--;
    ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
    ctx.fillRect(canvas.width / 2 - 220, 58, 440, 44);
    ctx.fillStyle = "#f0b429";
    ctx.font = "bold 17px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(configNivel.nome, canvas.width / 2, 86);
    ctx.textAlign = "start";
  }
}

// =========================================================
// 10. LOOP PRINCIPAL
// =========================================================
function loopPrincipal() {
  if (estadoJogo.status === "jogando") {
    estadoJogo.frameAtual++;
    atualizarPlataformas();
    atualizarSoldado();
    gerarInimigos();
    atualizarInimigos();
    atualizarCaminhosSubterraneos();
    atualizarBuracosChao();
    atualizarBoss();
    atualizarProjeteis();
    atualizarParticulasDano();
    atualizarHUD();
  }

  desenharCena();
  requestAnimationFrame(loopPrincipal);
}

// Inicialização ao carregar o script
registrarEventos();
desenharCena();
loopPrincipal();