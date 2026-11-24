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
  if (pular && soldado.noChao) { {
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

// =========================================================
// 7. INIMIGOS E BOSS
// =========================================================
function gerarInimigos() {
  const configNivel = NIVEIS[estadoJogo.nivelIndice];
  if (estadoJogo.frameAtual % configNivel.intervaloSpawn !== 0) return;

  // No nível 5 só gera poucos drones se o boss ainda estiver vivo
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
    estadoJogo.inimigos.push({
      tipo: "rastejador",
      x: spawnX,
      y: CHAO_Y - 34,
      largura: 36,
      altura: 34,
      vx: -2.1,
      vy: 0,
      vida: 1,
      pontos: 50,
      cor: "#e06c75"
    });
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
      cor: "#e5c07b"
    });
  }
}

function atualizarInimigos() {
  for (let i = estadoJogo.inimigos.length - 1; i >= 0; i--) {
    const inimigo = estadoJogo.inimigos[i];
    inimigo.x += inimigo.vx;

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

    // Colisão inimigo x soldado
    if (colidiu(soldado, inimigo)) {
      aplicarDanoSoldado(15);
    }

    // Remove inimigos que ficaram muito para trás
    if (inimigo.x + inimigo.largura < estadoJogo.cameraX - 100) {
      estadoJogo.inimigos.splice(i, 1);
    }
  }
}

function atualizarBoss() {
  const boss = estadoJogo.boss;
  if (!boss) return;

  boss.x += boss.vx;
  if (boss.x <= 460 || boss.x + boss.largura >= canvas.width - 20) {
    boss.vx *= -1;
  }

  // Ataque do Boss: tiro baixo e tiro alto alternados
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
    aplicarDanoSoldado(20);
  }
}

// =========================================================
// 8. PROJÉTEIS E COLISÕES
// =========================================================
function atualizarProjeteis() {
  // Tiros do soldado
  for (let i = estadoJogo.tirosJogador.length - 1; i >= 0; i--) {
    const tiro = estadoJogo.tirosJogador[i];
    tiro.x += tiro.vx;
    tiro.y += tiro.vy;

    let acertou = false;

    // Verifica acerto nos inimigos comuns
    for (let j = estadoJogo.inimigos.length - 1; j >= 0; j--) {
      const inimigo = estadoJogo.inimigos[j];
      if (colidiu(tiro, inimigo)) {
        inimigo.vida -= 1;
        acertou = true;
        if (inimigo.vida <= 0) {
          estadoJogo.pontuacao += inimigo.pontos;
          estadoJogo.inimigos.splice(j, 1);
        }
        break;
      }
    }

    // Verifica acerto no Boss
    if (!acertou && estadoJogo.boss && colidiu(tiro, estadoJogo.boss)) {
      estadoJogo.boss.vida -= 1;
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

  // Tiros dos inimigos
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
      aplicarDanoSoldado(12);
      estadoJogo.tirosInimigos.splice(i, 1);
      continue;
    }

    if (tiro.x < estadoJogo.cameraX - 50 || tiro.x > estadoJogo.cameraX + canvas.width + 50) {
      estadoJogo.tirosInimigos.splice(i, 1);
    }
  }
}

function aplicarDanoSoldado(dano) {
  if (estadoJogo.frameAtual < estadoJogo.invulneravelAte) return;

  soldado.vida = Math.max(0, soldado.vida - dano);
  estadoJogo.invulneravelAte = estadoJogo.frameAtual + 45;

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

function desenharCena() {
  const configNivel = NIVEIS[estadoJogo.nivelIndice];

  // Fundo do nível
  ctx.fillStyle = configNivel.corCeu;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(-estadoJogo.cameraX, 0);

  // Chão
  ctx.fillStyle = configNivel.corChao;
  ctx.fillRect(0, CHAO_Y, configNivel.distanciaMeta + 200, canvas.height - CHAO_Y);

  // Linha de superfície do chão
  ctx.fillStyle = "#5c7a62";
  ctx.fillRect(0, CHAO_Y, configNivel.distanciaMeta + 200, 5);

  // Plataformas
  ctx.fillStyle = "#6c7a89";
  for (let i = 0; i < estadoJogo.plataformas.length; i++) {
    const plat = estadoJogo.plataformas[i];
    ctx.fillRect(plat.x, plat.y, plat.largura, plat.altura);
  }

  // Bandeira/Portal de fim de setor (Níveis 1 a 4)
  if (configNivel.numero < 5) {
    ctx.fillStyle = "#f0b429";
    ctx.fillRect(configNivel.distanciaMeta - 35, CHAO_Y - 90, 12, 90);
    ctx.fillStyle = "#38b2ac";
    ctx.fillRect(configNivel.distanciaMeta - 23, CHAO_Y - 90, 34, 24);
  }

  // Soldado
  desenharSoldado()

  function desenharSoldado() {
  const centroX = soldado.x + soldado.largura / 2;
  const baseY = soldado.y + soldado.alturaAtual;
  const andando = Math.abs(soldado.vx) > 0.1 && soldado.noChao;
  const paradoNoChao = !andando && soldado.noChao;
  const cicloPasso = andando ? Math.sin(estadoJogo.frameAtual * 0.35) : 0;
  const cicloRespiracao = paradoNoChao ? Math.sin(estadoJogo.frameAtual * 0.08) : 0;
  const atirouAgora = estadoJogo.frameAtual - estadoJogo.ultimoTiroFrame <= 3;

  ctx.save();
  // Espelha horizontalmente quando o soldado vira para a esquerda
  ctx.translate(centroX, baseY);
  ctx.scale(soldado.direcao, 1);

  if (soldado.agachado) {
    // --- POSE AGACHADO (COM RESPIRAÇÃO SUTIL QUANDO PARADO) ---
    const respiracaoAgachadoY =
      paradoNoChao && soldado.noChao ? cicloRespiracao * 0.9 : 0;
    const expansaoAgachado =
      paradoNoChao && soldado.noChao ? Math.max(0, cicloRespiracao) * 0.7 : 0;

    // Perna traseira dobrada no chão
    ctx.fillStyle = "#2b3a2e";
    ctx.fillRect(-12, -10, 16, 7);
    ctx.fillStyle = "#1a1d20"; // Bota
    ctx.fillRect(-15, -7, 8, 7);

    // Perna dianteira flexionada
    ctx.fillStyle = "#3b4f3f";
    ctx.fillRect(-2, -14, 12, 9);
    ctx.fillStyle = "#1a1d20"; // Bota
    ctx.fillRect(4, -7, 10, 7);

    // Tronco e colete tático
    ctx.fillStyle = "#4a634e";
    ctx.fillRect(
      -9,
      -26 + respiracaoAgachadoY - expansaoAgachado * 0.4,
      18 + expansaoAgachado,
      15 + expansaoAgachado * 0.4
    );
    ctx.fillStyle = "#2d3b30"; // Placa do colete
    ctx.fillRect(
      -5,
      -24 + respiracaoAgachadoY - expansaoAgachado * 0.4,
      12 + expansaoAgachado,
      11 + expansaoAgachado * 0.4
    );

    // Cabeça e capacete
    ctx.fillStyle = "#d9a077"; // Rosto
    ctx.fillRect(-4, -34 + respiracaoAgachadoY, 10, 8);
    ctx.fillStyle = "#2f4233"; // Capacete
    ctx.beginPath();
    ctx.arc(1, -33 + respiracaoAgachadoY, 7, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(-6, -34 + respiracaoAgachadoY, 14, 3);
    ctx.fillStyle = "#38bdf8"; // Óculos tático
    ctx.fillRect(2, -31 + respiracaoAgachadoY, 6, 3);

    // Fuzil na posição baixa
    desenharFuzil(2, -18 + respiracaoAgachadoY, 0, atirouAgora);
  } else {
    // --- POSE EM PÉ / RESPIRANDO / CORRENDO / PULANDO ---
    const deslocamentoPerna = soldado.noChao ? cicloPasso * 7 : 5;
    const elevacaoPulo = soldado.noChao ? 0 : -4;

    // Respiração suave quando parado; balanço de passada quando andando
    const deslocamentoRespiracaoY = cicloRespiracao * 1.4;
    const expansaoPeito = Math.max(0, cicloRespiracao) * 1.2;
    const balancoTronco = andando
      ? Math.abs(cicloPasso) * 1.5
      : deslocamentoRespiracaoY;

    // Perna traseira
    ctx.fillStyle = "#2b3a2e";
    ctx.fillRect(-5 - deslocamentoPerna, -22 + elevacaoPulo, 8, 16);
    ctx.fillStyle = "#1a1d20"; // Bota traseira
    ctx.fillRect(-5 - deslocamentoPerna, -7 + elevacaoPulo, 10, 7);

    // Perna dianteira
    ctx.fillStyle = "#3b4f3f";
    ctx.fillRect(-3 + deslocamentoPerna, -22, 8, 16);
    ctx.fillStyle = "#1a1d20"; // Bota dianteira
    ctx.fillRect(-3 + deslocamentoPerna, -7, 11, 7);

    // Mochila tática nas costas
    ctx.fillStyle = "#263329";
    ctx.fillRect(-13, -42 + balancoTronco, 6, 17);

    // Tronco (uniforme + colete balístico com respiração)
    ctx.fillStyle = "#4a634e";
    ctx.fillRect(
      -8,
      -44 + balancoTronco - expansaoPeito * 0.5,
      16 + expansaoPeito,
      23 + expansaoPeito * 0.5
    );
    ctx.fillStyle = "#2d3b30"; // Colete tático
    ctx.fillRect(
      -6,
      -42 + balancoTronco - expansaoPeito * 0.5,
      13 + expansaoAgachado ?? 13 + expansaoPeito,
      17 + expansaoPeito * 0.5
    );
    ctx.fillStyle = "#5c7a62"; // Bolsos do colete
    ctx.fillRect(-4, -33 + balancoTronco, 4, 6);
    ctx.fillRect(1, -33 + balancoTronco, 4, 6);

    // Pescoço e cabeça
    ctx.fillStyle = "#d9a077";
    ctx.fillRect(-3, -47 + balancoTronco, 6, 4);
    ctx.fillRect(-5, -56 + balancoTronco, 11, 10);

    // Capacete militar e visor tático
    ctx.fillStyle = "#2f4233";
    ctx.beginPath();
    ctx.arc(0, -54 + balancoTronco, 7.5, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(-7, -55 + balancoTronco, 15, 3);
    ctx.fillStyle = "#38bdf8"; // Visor
    ctx.fillRect(1, -52 + balancoTronco, 6, 3.5);

    // Braços e fuzil (mirando para cima ou para frente)
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

  // Braço de apoio
  ctx.fillStyle = "#4a634e";
  ctx.fillRect(-4, -2, 12, 5);
  ctx.fillStyle = "#d9a077"; // Mão
  ctx.fillRect(7, -2, 4, 4);

  // Coronha e corpo do fuzil
  ctx.fillStyle = "#1f2428";
  ctx.fillRect(-8, -3, 24, 5);

  // Carregador curvado
  ctx.fillStyle = "#111417";
  ctx.fillRect(3, 2, 4, 7);

  // Mira óptica no topo
  ctx.fillStyle = "#343a40";
  ctx.fillRect(1, -6, 7, 3);

  // Cano estendido
  ctx.fillStyle = "#495057";
  ctx.fillRect(16, -2, 9, 3);

  // Clarão do disparo (muzzle flash)
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

  // Inimigos
  for (let i = 0; i < estadoJogo.inimigos.length; i++) {
    const inimigo = estadoJogo.inimigos[i];
    ctx.fillStyle = inimigo.cor;
    ctx.fillRect(inimigo.x, inimigo.y, inimigo.largura, inimigo.altura);
  }

  // Boss (Nível 5)
  if (estadoJogo.boss) {
    const boss = estadoJogo.boss;
    ctx.fillStyle = "#e03131";
    ctx.fillRect(boss.x, boss.y, boss.largura, boss.altura);

    // Canhão do Boss
    ctx.fillStyle = "#212529";
    ctx.fillRect(boss.x - 16, boss.y + 34, 20, 12);
    ctx.fillRect(boss.x - 16, boss.y + boss.altura - 26, 20, 12);
  }

  // Tiros do jogador
  ctx.fillStyle = "#ffe066";
  for (let i = 0; i < estadoJogo.tirosJogador.length; i++) {
    const t = estadoJogo.tirosJogador[i];
    ctx.fillRect(t.x, t.y, t.largura, t.altura);
  }

  // Tiros dos inimigos
  ctx.fillStyle = "#ff6b6b";
  for (let i = 0; i < estadoJogo.tirosInimigos.length; i++) {
    const t = estadoJogo.tirosInimigos[i];
    ctx.fillRect(t.x, t.y, t.largura, t.altura);
  }

  ctx.restore();

  // Barra de vida do Boss no topo do canvas
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

  // Banner rápido ao entrar em um novo nível
  if (estadoJogo.avisoNivelFrames > 0) {
    estadoJogo.avisoNivelFrames--;
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(canvas.width / 2 - 190, 60, 380, 44);
    ctx.fillStyle = "#f0b429";
    ctx.font = "bold 18px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(configNivel.nome, canvas.width / 2, 88);
    ctx.textAlign = "start";
  }
}

// =========================================================
// 10. LOOP PRINCIPAL
// =========================================================
function loopPrincipal() {
  if (estadoJogo.status === "jogando") {
    estadoJogo.frameAtual++;
    atualizarSoldado();
    gerarInimigos();
    atualizarInimigos();
    atualizarBoss();
    atualizarProjeteis();
    atualizarHUD();
  }
  
  desenharCena();
  requestAnimationFrame(loopPrincipal);
}

// Inicialização ao carregar o script
registrarEventos();
desenharCena();
loopPrincipal();