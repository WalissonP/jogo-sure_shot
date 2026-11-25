// =========================================================
// 1. SELEÇÃO DE ELEMENTOS DO DOM
// =========================================================
const canvas = document.querySelector("#tela-jogo");
const ctx = canvas.getContext("2d");

const hudNivel = document.querySelector("#hud-nivel");
const hudVida = document.querySelector("#hud-vida");
const hudPontos = document.querySelector("#hud-pontos");
const hudProgresso = document.querySelector("#hud-progresso");

const barraLobby = document.querySelector("#barra-lobby");
const statusLobbyTexto = document.querySelector("#status-lobby-texto");
const btnResetProgresso = document.querySelector("#btn-reset-progresso");

const overlayFim = document.querySelector("#overlay-fim");
const tituloFim = document.querySelector("#titulo-fim");
const mensagemFim = document.querySelector("#mensagem-fim");
const pontuacaoFinalEl = document.querySelector("#pontuacao-final");

const btnReiniciar = document.querySelector("#btn-reiniciar");
const btnVoltarLobby = document.querySelector("#btn-voltar-lobby");
const btnSom = document.querySelector("#btn-som");

// =========================================================
// 2. CONFIGURAÇÃO DOS 3 NÍVEIS E MAPA ESTILO CUPHEAD
// =========================================================
const CHAO_Y = 380;
const GRAVIDADE = 0.65;
const FPS_ESTIMADO = 60;
const CHAVE_PROGRESSO_STORAGE = "operacao_vanguarda_progresso_3fases_v1";

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
    distanciaMeta: 2800,
    intervaloSpawn: 85,
    tiposInimigos: ["rastejador", "saltador", "atirador", "drone"]
  },
  {
    numero: 3,
    nome: "Setor 3 - Núcleo do Boss",
    corCeu: "#2b1215",
    corChao: "#3b1d22",
    distanciaMeta: 900,
    intervaloSpawn: 140,
    tiposInimigos: ["drone", "atirador"]
  }
];

const NOS_LOBBY = [
  {
    indice: 0,
    rotuloCurto: "FASE 1",
    titulo: "Ruínas",
    subtitulo: "Rastejadores e escombros",
    x: 185,
    y: 265,
    raio: 28,
    corPonto: "#f0b429"
  },
  {
    indice: 1,
    rotuloCurto: "FASE 2",
    titulo: "Trincheiras",
    subtitulo: "Saltadores, atiradores e drones",
    x: 455,
    y: 195,
    raio: 28,
    corPonto: "#38bdf8"
  },
  {
    indice: 2,
    rotuloCurto: "BOSS",
    titulo: "Núcleo do Boss",
    subtitulo: "Confronto final contra o Boss",
    x: 725,
    y: 265,
    raio: 32,
    corPonto: "#fa5252"
  }
];

// =========================================================
// 2B. TRILHA SONORA PROCEDURAL, FANFARRA DE VITÓRIA E SFX
// =========================================================
const MUSICAS_POR_FASE = {
  lobby: {
    bpm: 116,
    ondaMelodia: "triangle",
    ondaBaixo: "sine",
    volume: 0.042,
    melodia: [
      392.0, 0, 440.0, 493.88, 587.33, 0, 493.88, 440.0,
      392.0, 0, 329.63, 392.0, 440.0, 392.0, 329.63, 0
    ],
    baixo: [
      98.0, 0, 98.0, 0, 146.83, 0, 146.83, 0,
      82.41, 0, 82.41, 0, 110.0, 0, 98.0, 0
    ]
  },
  1: {
    bpm: 108,
    ondaMelodia: "triangle",
    ondaBaixo: "sawtooth",
    volume: 0.055,
    melodia: [
      293.66, 0, 349.23, 329.63, 293.66, 0, 261.63, 220.0,
      293.66, 0, 392.0, 349.23, 329.63, 261.63, 220.0, 0
    ],
    baixo: [
      73.42, 73.42, 73.42, 73.42, 65.41, 65.41, 55.0, 55.0,
      73.42, 73.42, 87.31, 87.31, 65.41, 65.41, 55.0, 55.0
    ]
  },
  2: {
    bpm: 132,
    ondaMelodia: "square",
    ondaBaixo: "triangle",
    volume: 0.04,
    melodia: [
      329.63, 329.63, 392.0, 440.0, 392.0, 329.63, 293.66, 329.63,
      392.0, 493.88, 440.0, 392.0, 329.63, 0, 246.94, 293.66
    ],
    baixo: [
      82.41, 0, 82.41, 0, 98.0, 0, 110.0, 0,
      82.41, 0, 123.47, 0, 73.42, 0, 61.74, 73.42
    ]
  },
  3: {
    bpm: 152,
    ondaMelodia: "sawtooth",
    ondaBaixo: "square",
    volume: 0.048,
    melodia: [
      523.25, 523.25, 622.25, 523.25, 783.99, 739.99, 622.25, 587.33,
      523.25, 622.25, 783.99, 1046.5, 932.33, 783.99, 622.25, 587.33
    ],
    baixo: [
      65.41, 65.41, 77.78, 65.41, 98.0, 98.0, 87.31, 77.78,
      65.41, 77.78, 98.0, 130.81, 116.54, 98.0, 77.78, 73.42
    ]
  }
};

const sistemaAudio = {
  ctx: null,
  timerId: null,
  passoAtual: 0,
  faixaAtiva: null,
  ativo: true
};

const botaoSomCanvas = {
  x: canvas.width - 122,
  y: 12,
  largura: 110,
  altura: 28
};

function atualizarBotaoSomUI() {
  if (!btnSom) return;
  btnSom.textContent = sistemaAudio.ativo ? "🔊 Som: ON" : "🔇 Som: OFF";
}

function alternarSom() {
  sistemaAudio.ativo = !sistemaAudio.ativo;
  atualizarBotaoSomUI();

  if (!sistemaAudio.ativo) {
    pararMusicaFase();
  } else {
    garantirAudioContexto();
    if (estadoJogo.status === "lobby") {
      iniciarMusica("lobby");
    } else if (estadoJogo.status === "jogando") {
      const configNivel = NIVEIS[estadoJogo.nivelIndice];
      iniciarMusica(configNivel.numero);
    }
  }
}

function garantirAudioContexto() {
  if (!sistemaAudio.ativo) return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;

  if (!sistemaAudio.ctx) {
    sistemaAudio.ctx = new AudioCtx();
  }
  if (sistemaAudio.ctx.state === "suspended") {
    sistemaAudio.ctx.resume().catch(() => {});
  }
  return sistemaAudio.ctx;
}

function tocarNotaSintetizada(freq, duracaoSeg, tipoOnda, ganhoMax, offsetFiltro = 1400) {
  if (!freq || freq <= 0 || !sistemaAudio.ctx || !sistemaAudio.ativo) return;

  const agora = sistemaAudio.ctx.currentTime;
  const osc = sistemaAudio.ctx.createOscillator();
  const filtro = sistemaAudio.ctx.createBiquadFilter();
  const ganho = sistemaAudio.ctx.createGain();

  osc.type = tipoOnda;
  osc.frequency.setValueAtTime(freq, agora);

  filtro.type = "lowpass";
  filtro.frequency.setValueAtTime(offsetFiltro, agora);

  ganho.gain.setValueAtTime(0.0001, agora);
  ganho.gain.exponentialRampToValueAtTime(ganhoMax, agora + 0.015);
  ganho.gain.exponentialRampToValueAtTime(0.0001, agora + Math.max(0.04, duracaoSeg * 0.92));

  osc.connect(filtro);
  filtro.connect(ganho);
  ganho.connect(sistemaAudio.ctx.destination);

  osc.start(agora);
  osc.stop(agora + duracaoSeg);
}

function tocarSfxTiro() {
  const audioCtx = garantirAudioContexto();
  if (!audioCtx || !sistemaAudio.ativo) return;

  const agora = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const ganho = audioCtx.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(760, agora);
  osc.frequency.exponentialRampToValueAtTime(160, agora + 0.085);

  ganho.gain.setValueAtTime(0.055, agora);
  ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 0.09);

  osc.connect(ganho);
  ganho.connect(audioCtx.destination);

  osc.start(agora);
  osc.stop(agora + 0.095);
}

function tocarSfxPulo() {
  const audioCtx = garantirAudioContexto();
  if (!audioCtx || !sistemaAudio.ativo) return;

  const agora = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const ganho = audioCtx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(210, agora);
  osc.frequency.exponentialRampToValueAtTime(520, agora + 0.13);

  ganho.gain.setValueAtTime(0.06, agora);
  ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 0.14);

  osc.connect(ganho);
  ganho.connect(audioCtx.destination);

  osc.start(agora);
  osc.stop(agora + 0.145);
}

function tocarSfxDano() {
  const audioCtx = garantirAudioContexto();
  if (!audioCtx || !sistemaAudio.ativo) return;

  const agora = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const ganho = audioCtx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(190, agora);
  osc.frequency.exponentialRampToValueAtTime(62, agora + 0.22);

  ganho.gain.setValueAtTime(0.085, agora);
  ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 0.23);

  osc.connect(ganho);
  ganho.connect(audioCtx.destination);

  osc.start(agora);
  osc.stop(agora + 0.24);
}

function tocarSfxAcertoInimigo(eliminado = false) {
  const audioCtx = garantirAudioContexto();
  if (!audioCtx || !sistemaAudio.ativo) return;

  const agora = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const ganho = audioCtx.createGain();

  osc.type = eliminado ? "sawtooth" : "triangle";
  osc.frequency.setValueAtTime(eliminado ? 310 : 420, agora);
  osc.frequency.exponentialRampToValueAtTime(eliminado ? 75 : 190, agora + (eliminado ? 0.16 : 0.06));

  ganho.gain.setValueAtTime(eliminado ? 0.065 : 0.04, agora);
  ganho.gain.exponentialRampToValueAtTime(0.0001, agora + (eliminado ? 0.17 : 0.065));

  osc.connect(ganho);
  ganho.connect(audioCtx.destination);

  osc.start(agora);
  osc.stop(agora + (eliminado ? 0.18 : 0.07));
}

function tocarMusiquinhaVitoriaFase() {
  const audioCtx = garantirAudioContexto();
  if (!audioCtx || !sistemaAudio.ativo) return;

  // Fanfarra animada estilo arcade ao concluir uma fase e voltar ao lobby
  const sequencia = [
    { freq: 523.25, delay: 0, dur: 0.12 },     // C5
    { freq: 659.25, delay: 110, dur: 0.12 },   // E5
    { freq: 783.99, delay: 220, dur: 0.12 },   // G5
    { freq: 1046.5, delay: 340, dur: 0.22 },   // C6
    { freq: 880.0, delay: 560, dur: 0.12 },    // A5
    { freq: 1046.5, delay: 690, dur: 0.36 }    // C6 final
  ];

  sequencia.forEach((nota) => {
    setTimeout(() => {
      if (!sistemaAudio.ativo || !sistemaAudio.ctx) return;
      tocarNotaSintetizada(nota.freq, nota.dur, "triangle", 0.075, 2800);
      tocarNotaSintetizada(nota.freq * 0.5, nota.dur, "square", 0.025, 1100);
    }, nota.delay);
  });
}

function tocarSfxDerrota() {
  const audioCtx = garantirAudioContexto();
  if (!audioCtx || !sistemaAudio.ativo) return;

  const notas = [293.66, 261.63, 220.0, 164.81];
  notas.forEach((freq, idx) => {
    setTimeout(() => {
      tocarNotaSintetizada(freq, 0.22, "triangle", 0.065, 2400);
    }, idx * 130);
  });
}

function pararMusicaFase() {
  if (sistemaAudio.timerId !== null) {
    clearInterval(sistemaAudio.timerId);
    sistemaAudio.timerId = null;
  }
  sistemaAudio.faixaAtiva = null;
  sistemaAudio.passoAtual = 0;
}

function iniciarMusica(chaveFaixa) {
  const faixa = MUSICAS_POR_FASE[chaveFaixa];
  if (!faixa || !sistemaAudio.ativo) {
    pararMusicaFase();
    return;
  }

  const audioCtx = garantirAudioContexto();
  if (!audioCtx) return;

  if (sistemaAudio.faixaAtiva === chaveFaixa && sistemaAudio.timerId !== null) {
    return;
  }

  pararMusicaFase();
  sistemaAudio.faixaAtiva = chaveFaixa;
  sistemaAudio.passoAtual = 0;

  const duracaoPassoSeg = 60 / faixa.bpm / 4;
  const intervaloMs = duracaoPassoSeg * 1000;

  const executarPasso = () => {
    if (!sistemaAudio.ativo) return;
    if (estadoJogo.status !== "lobby" && estadoJogo.status !== "jogando") return;
    if (!sistemaAudio.ctx || sistemaAudio.ctx.state !== "running") return;

    const idx = sistemaAudio.passoAtual % faixa.melodia.length;
    const notaMelodia = faixa.melodia[idx];
    const notaBaixo = faixa.baixo[idx];

    tocarNotaSintetizada(
      notaMelodia,
      duracaoPassoSeg,
      faixa.ondaMelodia,
      faixa.volume,
      2200
    );
    tocarNotaSintetizada(
      notaBaixo,
      duracaoPassoSeg * 1.1,
      faixa.ondaBaixo,
      faixa.volume * 0.85,
      520
    );

    sistemaAudio.passoAtual++;
  };

  executarPasso();
  sistemaAudio.timerId = setInterval(executarPasso, intervaloMs);
}

// =========================================================
// 3. ESTADO DO JOGO (LOBBY, DESBLOQUEIO, COMBATE E VITÓRIA)
// =========================================================
const teclas = {};

function carregarProgressoSalvo() {
  try {
    const bruto = localStorage.getItem(CHAVE_PROGRESSO_STORAGE);
    if (!bruto) {
      return { maiorFaseDesbloqueada: 0, fasesConcluidas: [] };
    }
    const parsed = JSON.parse(bruto);
    const maior = Math.max(0, Math.min(NIVEIS.length - 1, Number(parsed.maiorFaseDesbloqueada) || 0));
    const concluidas = Array.isArray(parsed.fasesConcluidas)
      ? parsed.fasesConcluidas.filter((n) => Number.isInteger(n) && n >= 0 && n < NIVEIS.length)
      : [];
    return { maiorFaseDesbloqueada: maior, fasesConcluidas: concluidas };
  } catch {
    return { maiorFaseDesbloqueada: 0, fasesConcluidas: [] };
  }
}

function salvarProgresso() {
  try {
    localStorage.setItem(
      CHAVE_PROGRESSO_STORAGE,
      JSON.stringify({
        maiorFaseDesbloqueada: estadoJogo.maiorFaseDesbloqueada,
        fasesConcluidas: estadoJogo.fasesConcluidas
      })
    );
  } catch {
    // Ignora falha de armazenamento se bloqueado pelo navegador
  }
}

const progressoInicial = carregarProgressoSalvo();

const estadoJogo = {
  status: "lobby", // "lobby" | "jogando" | "vitoria_fase" | "derrota" | "campanha_concluida"
  maiorFaseDesbloqueada: progressoInicial.maiorFaseDesbloqueada,
  fasesConcluidas: progressoInicial.fasesConcluidas,
  faseNoNo: 0,
  mensagemBloqueioFrames: 0,
  vitoriaTimerFrames: 0,
  vitoriaFaseConcluidaIndice: 0,
  vitoriaCampanhaCompleta: false,
  particulasVitoria: [],

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
  efeitosImpacto: [],
  tirosJogador: [],
  tirosInimigos: [],
  boss: null
};

const soldado = {
  x: NOS_LOBBY[0].x,
  y: NOS_LOBBY[0].y - 18,
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
// 4. LOBBY ESTILO CUPHEAD, DESBLOQUEIO E AÇÃO DE VITÓRIA
// =========================================================
function faseEstaDesbloqueada(indice) {
  return indice <= estadoJogo.maiorFaseDesbloqueada;
}

function faseEstaConcluida(indice) {
  return estadoJogo.fasesConcluidas.includes(indice);
}

function atualizarBarraLobbyUI() {
  if (!barraLobby) return;
  if (estadoJogo.status !== "lobby") {
    barraLobby.classList.add("oculto");
    return;
  }

  barraLobby.classList.remove("oculto");
  const noAtual = NOS_LOBBY[estadoJogo.faseNoNo];
  if (noAtual) {
    if (faseEstaDesbloqueada(noAtual.indice)) {
      const statusTag = faseEstaConcluida(noAtual.indice) ? "Concluída" : "Desbloqueada";
      statusLobbyTexto.textContent = `Sobre ${noAtual.rotuloCurto} - ${noAtual.titulo} (${statusTag}) • Enter/Espaço para jogar`;
    } else {
      statusLobbyTexto.textContent = `Sobre ${noAtual.rotuloCurto} - ${noAtual.titulo} (Bloqueada: conclua a fase anterior)`;
    }
  } else {
    statusLobbyTexto.textContent = "Andando pelo mapa do lobby • Pare em cima de uma fase desbloqueada";
  }
}

function posicionarSoldadoNoNoLobby(indiceNo) {
  const no = NOS_LOBBY[indiceNo] || NOS_LOBBY[0];
  soldado.deitado = false;
  soldado.olhandoCima = false;
  soldado.largura = soldado.larguraEmPe;
  soldado.alturaAtual = soldado.alturaEmPe;
  soldado.x = no.x - soldado.largura / 2;
  soldado.y = no.y - soldado.alturaEmPe + 4;
  soldado.vx = 0;
  soldado.vy = 0;
  soldado.noChao = true;
  estadoJogo.faseNoNo = no.indice;
  atualizarBarraLobbyUI();
}

function abrirLobby(indiceInicial = estadoJogo.maiorFaseDesbloqueada) {
  const alvo = Math.max(0, Math.min(NOS_LOBBY.length - 1, indiceInicial));
  estadoJogo.status = "lobby";
  estadoJogo.cameraX = 0;
  estadoJogo.particulasDano = [];
  estadoJogo.efeitosImpacto = [];
  estadoJogo.tirosJogador = [];
  estadoJogo.tirosInimigos = [];

  overlayFim.classList.add("oculto");
  posicionarSoldadoNoNoLobby(alvo);
  atualizarHUD();

  if (sistemaAudio.ativo) {
    iniciarMusica("lobby");
  }
}

function resetarProgressoLobby() {
  estadoJogo.maiorFaseDesbloqueada = 0;
  estadoJogo.fasesConcluidas = [];
  estadoJogo.pontuacao = 0;
  salvarProgresso();
  abrirLobby(0);
}

function tentarEntrarNaFase(indice) {
  if (!faseEstaDesbloqueada(indice)) {
    estadoJogo.mensagemBloqueioFrames = 95;
    atualizarBarraLobbyUI();
    return;
  }
  iniciarFase(indice);
}

function atualizarLobbyCuphead() {
  const esquerda = teclas["KeyA"] || teclas["ArrowLeft"];
  const direita = teclas["KeyD"] || teclas["ArrowRight"];
  const cima = teclas["KeyW"] || teclas["ArrowUp"];
  const baixo = teclas["KeyS"] || teclas["ArrowDown"];

  if (estadoJogo.mensagemBloqueioFrames > 0) {
    estadoJogo.mensagemBloqueioFrames--;
  }

  let movendoX = 0;
  let movendoY = 0;

  if (esquerda && !direita) {
    movendoX = -1;
    soldado.direcao = -1;
  } else if (direita && !esquerda) {
    movendoX = 1;
    soldado.direcao = 1;
  }

  if (cima && !baixo) {
    movendoY = -1;
  } else if (baixo && !cima) {
    movendoY = 1;
  }

  const velLobby = 3.8;
  soldado.vx = movendoX * velLobby;
  soldado.vy = movendoY * velLobby;

  if (movendoX !== 0 || movendoY !== 0) {
    const centroX = soldado.x + soldado.largura / 2 + soldado.vx;
    const baseY = soldado.y + soldado.alturaAtual + soldado.vy;

    const xLimitado = Math.max(85, Math.min(canvas.width - 85, centroX));
    const yLimitado = Math.max(155, Math.min(365, baseY));

    soldado.x = xLimitado - soldado.largura / 2;
    soldado.y = yLimitado - soldado.alturaAtual;
  }

  // Verifica se o soldado está em cima de algum nó de fase no mapa
  const peX = soldado.x + soldado.largura / 2;
  const peY = soldado.y + soldado.alturaAtual;
  let noEncontrado = null;

  for (let i = 0; i < NOS_LOBBY.length; i++) {
    const no = NOS_LOBBY[i];
    const dist = Math.hypot(peX - no.x, peY - no.y);
    if (dist <= no.raio + 16) {
      noEncontrado = no;
      // Encaixe suave quando para em cima da fase
      if (movendoX === 0 && movendoY === 0 && dist > 3) {
        const alvoX = no.x - soldado.largura / 2;
        const alvoY = no.y - soldado.alturaAtual + 4;
        soldado.x += (alvoX - soldado.x) * 0.25;
        soldado.y += (alvoY - soldado.y) * 0.25;
      }
      break;
    }
  }

  const novoNoIndice = noEncontrado ? noEncontrado.indice : -1;
  if (novoNoIndice !== estadoJogo.faseNoNo) {
    estadoJogo.faseNoNo = novoNoIndice;
    atualizarBarraLobbyUI();
  }
}

function iniciarFase(indice) {
  garantirAudioContexto();

  const indiceValido = Math.max(0, Math.min(NIVEIS.length - 1, indice));
  if (!faseEstaDesbloqueada(indiceValido)) return;

  estadoJogo.status = "jogando";
  estadoJogo.nivelIndice = indiceValido;
  estadoJogo.frameAtual = 0;
  estadoJogo.ultimoTiroFrame = 0;
  estadoJogo.invulneravelAte = 0;
  estadoJogo.danoSoldadoFrames = 0;
  estadoJogo.pulsoTelaDano = 0;
  estadoJogo.inclinacaoDano = 0;
  estadoJogo.particulasDano = [];
  estadoJogo.efeitosImpacto = [];
  estadoJogo.particulasVitoria = [];
  estadoJogo.buracosChao = [];
  estadoJogo.caminhosSubterraneos = [];

  soldado.vida = soldado.vidaMaxima;
  soldado.direcao = 1;
  soldado.deitado = false;
  soldado.largura = soldado.larguraEmPe;
  soldado.alturaAtual = soldado.alturaEmPe;

  overlayFim.classList.add("oculto");
  atualizarBarraLobbyUI();
  carregarNivel(indiceValido);
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
  estadoJogo.efeitosImpacto = [];
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

  estadoJogo.plataformas = [];
  if (configNivel.numero === 1) {
    configurarMapaFase1(configNivel.distanciaMeta);
    posicionarRastejadoresMapa();
  } else if (configNivel.numero === 2) {
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

  if (estadoJogo.status === "jogando") {
    iniciarMusica(configNivel.numero);
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
    estado: "esperando",
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

function gerarParticulasVitoria(origemTelaX, origemTelaY) {
  const cores = ["#ffd43b", "#51cf66", "#339af0", "#ff922b", "#f06595"];
  estadoJogo.particulasVitoria = [];
  for (let i = 0; i < 42; i++) {
    const angulo = Math.random() * Math.PI * 2;
    const vel = 1.8 + Math.random() * 5.2;
    estadoJogo.particulasVitoria.push({
      x: origemTelaX,
      y: origemTelaY,
      vx: Math.cos(angulo) * vel,
      vy: Math.sin(angulo) * vel - 2.6,
      vida: 55 + Math.floor(Math.random() * 35),
      vidaMax: 90,
      tamanho: 4 + Math.random() * 4,
      cor: cores[i % cores.length],
      rotacao: Math.random() * Math.PI * 2,
      vRotacao: (Math.random() - 0.5) * 0.25
    });
  }
}

function concluirFaseComVitoria(indiceFase) {
  if (estadoJogo.status !== "jogando") return;

  pararMusicaFase();
  tocarMusiquinhaVitoriaFase();

  if (!estadoJogo.fasesConcluidas.includes(indiceFase)) {
    estadoJogo.fasesConcluidas.push(indiceFase);
  }

  const proximoIndice = indiceFase + 1;
  const campanhaCompleta = proximoIndice >= NIVEIS.length;
  if (!campanhaCompleta && proximoIndice > estadoJogo.maiorFaseDesbloqueada) {
    estadoJogo.maiorFaseDesbloqueada = proximoIndice;
  }

  salvarProgresso();

  estadoJogo.status = "vitoria_fase";
  estadoJogo.vitoriaFaseConcluidaIndice = indiceFase;
  estadoJogo.vitoriaCampanhaCompleta = campanhaCompleta;
  estadoJogo.vitoriaTimerFrames = 145; // ~2.4s de ação e musiquinha antes de voltar ao lobby

  soldado.vx = 0;
  soldado.vy = -5.5;
  soldado.noChao = false;

  const telaX = soldado.x - estadoJogo.cameraX + soldado.largura / 2;
  const telaY = soldado.y + soldado.alturaAtual / 2;
  gerarParticulasVitoria(telaX, telaY);
  atualizarBarraLobbyUI();
  atualizarHUD();
}

function atualizarAcaoVitoriaFase() {
  estadoJogo.vitoriaTimerFrames--;

  // Pulo comemorativo do soldado
  soldado.vy += GRAVIDADE * 0.6;
  soldado.y += soldado.vy;
  if (soldado.y + soldado.alturaAtual >= CHAO_Y) {
    soldado.y = CHAO_Y - soldado.alturaAtual;
    if (estadoJogo.vitoriaTimerFrames > 35) {
      soldado.vy = -6.2;
      soldado.noChao = false;
    } else {
      soldado.vy = 0;
      soldado.noChao = true;
    }
  }

  for (let i = estadoJogo.particulasVitoria.length - 1; i >= 0; i--) {
    const p = estadoJogo.particulasVitoria[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.12;
    p.rotacao += p.vRotacao;
    p.vida--;
    if (p.vida <= 0) {
      estadoJogo.particulasVitoria.splice(i, 1);
    }
  }

  if (estadoJogo.vitoriaTimerFrames <= 0) {
    const proximo = estadoJogo.vitoriaFaseConcluidaIndice + 1;
    const noAlvo = proximo < NIVEIS.length ? proximo : estadoJogo.vitoriaFaseConcluidaIndice;
    abrirLobby(noAlvo);
  }
}

function finalizarDerrota() {
  pararMusicaFase();
  tocarSfxDerrota();
  estadoJogo.status = "derrota";
  tituloFim.textContent = "Soldado Abatido!";
  mensagemFim.textContent = "Sua energia chegou a zero. Tente novamente ou volte ao lobby.";
  pontuacaoFinalEl.textContent = estadoJogo.pontuacao;
  atualizarBarraLobbyUI();
  overlayFim.classList.remove("oculto");
}

// =========================================================
// 5. EVENTOS (APENAS addEventListener)
// =========================================================
function registrarEventos() {
  btnReiniciar.addEventListener("click", function () {
    iniciarFase(estadoJogo.nivelIndice);
  });

  btnVoltarLobby.addEventListener("click", function () {
    abrirLobby(estadoJogo.nivelIndice);
  });

  if (btnResetProgresso) {
    btnResetProgresso.addEventListener("click", resetarProgressoLobby);
  }

  if (btnSom) {
    btnSom.addEventListener("click", alternarSom);
  }

  canvas.addEventListener("click", function (evento) {
    const rect = canvas.getBoundingClientRect();
    const escalaX = canvas.width / rect.width;
    const escalaY = canvas.height / rect.height;
    const clickX = (evento.clientX - rect.left) * escalaX;
    const clickY = (evento.clientY - rect.top) * escalaY;

    if (
      clickX >= botaoSomCanvas.x &&
      clickX <= botaoSomCanvas.x + botaoSomCanvas.largura &&
      clickY >= botaoSomCanvas.y &&
      clickY <= botaoSomCanvas.y + botaoSomCanvas.altura
    ) {
      alternarSom();
      return;
    }

    if (estadoJogo.status === "lobby") {
      garantirAudioContexto();
      for (let i = 0; i < NOS_LOBBY.length; i++) {
        const no = NOS_LOBBY[i];
        const dist = Math.hypot(clickX - no.x, clickY - no.y);
        if (dist <= no.raio + 10) {
          posicionarSoldadoNoNoLobby(no.indice);
          tentarEntrarNaFase(no.indice);
          return;
        }
      }
    }
  });

  window.addEventListener("keydown", function (evento) {
    const codigo = evento.code;
    teclas[codigo] = true;

    if (codigo === "KeyM" && !evento.repeat) {
      alternarSom();
      return;
    }

    if (estadoJogo.status === "lobby" || estadoJogo.status === "jogando") {
      garantirAudioContexto();
    }

    if (["Space", "Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(codigo)) {
      evento.preventDefault();
    }

    if (estadoJogo.status === "lobby" && !evento.repeat) {
      if (codigo === "Enter" || codigo === "Space") {
        const alvo = estadoJogo.faseNoNo >= 0 ? estadoJogo.faseNoNo : estadoJogo.maiorFaseDesbloqueada;
        tentarEntrarNaFase(alvo);
        return;
      }
    }

    if (codigo === "KeyR" && estadoJogo.status === "jogando") {
      iniciarFase(estadoJogo.nivelIndice);
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
    tocarSfxPulo();
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

  if (configNivel.numero < NIVEIS.length) {
    const limiteCamera = soldado.x - canvas.width * 0.38;
    if (limiteCamera > estadoJogo.cameraX) {
      estadoJogo.cameraX = Math.min(limiteCamera, configNivel.distanciaMeta - canvas.width);
    }
  }

  if (atirar && estadoJogo.frameAtual - estadoJogo.ultimoTiroFrame >= 14) {
    dispararTiroSoldado();
    estadoJogo.ultimoTiroFrame = estadoJogo.frameAtual;
  }

  // Ao alcançar a meta de uma fase normal, celebra vitória e retorna ao lobby com a próxima desbloqueada
  if (configNivel.numero < NIVEIS.length && soldado.x + soldado.largura >= configNivel.distanciaMeta - 20) {
    estadoJogo.pontuacao += 200;
    concluirFaseComVitoria(estadoJogo.nivelIndice);
  }
}

function dispararTiroSoldado() {
  const velocidadeTiro = 10;
  tocarSfxTiro();

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

  if (configNivel.numero === 3 && (!estadoJogo.boss || estadoJogo.inimigos.length >= 2)) {
    return;
  }

  const tipos = configNivel.tiposInimigos;
  const tipoEscolhido = tipos[Math.floor(Math.random() * tipos.length)];
  const spawnX =
    configNivel.numero === 3
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
    progressoU: 0,
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
function encontrarObstaculoBloqueadorTiro(tiro) {
  for (let i = 0; i < estadoJogo.obstaculos.length; i++) {
    if (colidiu(tiro, estadoJogo.obstaculos[i])) {
      return estadoJogo.obstaculos[i];
    }
  }

  for (let i = 0; i < estadoJogo.estruturasQuebradas.length; i++) {
    const blocoAlto = obterBlocoPassagemBaixa(estadoJogo.estruturasQuebradas[i]);
    if (colidiu(tiro, blocoAlto)) {
      return blocoAlto;
    }
  }

  for (let i = 0; i < estadoJogo.plataformas.length; i++) {
    const plat = estadoJogo.plataformas[i];
    if (plat.desmoronando) continue;
    if (colidiu(tiro, plat)) {
      return plat;
    }
  }

  return null;
}

function criarAnimacaoBalaPocando(tiro, bloco, corBase = "#ffd43b") {
  let px = tiro.x + tiro.largura / 2;
  let py = tiro.y + tiro.altura / 2;
  let normalX = 0;
  let normalY = -1;

  if (tiro.vx > 0) {
    px = bloco.x;
    normalX = -1;
    normalY = -0.35;
  } else if (tiro.vx < 0) {
    px = bloco.x + bloco.largura;
    normalX = 1;
    normalY = -0.35;
  } else if (tiro.vy < 0) {
    py = bloco.y + bloco.altura;
    normalX = 0;
    normalY = 1;
  }

  estadoJogo.efeitosImpacto.push({
    x: px,
    y: py,
    raioInicial: 3,
    raioMax: 13,
    vida: 8,
    vidaMax: 8,
    cor: corBase
  });

  const anguloBase = Math.atan2(normalY, normalX);
  for (let k = 0; k < 7; k++) {
    const dispersao = (Math.random() - 0.5) * 1.35;
    const angulo = anguloBase + dispersao;
    const velocidade = 1.6 + Math.random() * 2.8;
    estadoJogo.particulasDano.push({
      x: px,
      y: py,
      vx: Math.cos(angulo) * velocidade,
      vy: Math.sin(angulo) * velocidade - 1.2,
      vida: 9 + Math.floor(Math.random() * 6),
      tamanho: 2 + Math.random() * 2,
      cor: k % 2 === 0 ? corBase : "#fff3bf"
    });
  }
}

function atualizarProjeteis() {
  for (let i = estadoJogo.tirosJogador.length - 1; i >= 0; i--) {
    const tiro = estadoJogo.tirosJogador[i];
    tiro.x += tiro.vx;
    tiro.y += tiro.vy;

    const obstaculoBloqueador = encontrarObstaculoBloqueadorTiro(tiro);
    if (obstaculoBloqueador) {
      criarAnimacaoBalaPocando(tiro, obstaculoBloqueador, "#ffd43b");
      estadoJogo.tirosJogador.splice(i, 1);
      continue;
    }

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
        const eliminado = inimigo.vida <= 0;
        tocarSfxAcertoInimigo(eliminado);
        if (eliminado) {
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
      const bossEliminado = estadoJogo.boss.vida <= 0;
      tocarSfxAcertoInimigo(bossEliminado);

      if (bossEliminado) {
        estadoJogo.pontuacao += 1000;
        estadoJogo.boss = null;
        estadoJogo.tirosInimigos = [];
        atualizarHUD();
        concluirFaseComVitoria(estadoJogo.nivelIndice);
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

    const obstaculoBloqueador = encontrarObstaculoBloqueadorTiro(tiro);
    if (obstaculoBloqueador) {
      criarAnimacaoBalaPocando(tiro, obstaculoBloqueador, "#ff8787");
      estadoJogo.tirosInimigos.splice(i, 1);
      continue;
    }

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

  for (let i = estadoJogo.efeitosImpacto.length - 1; i >= 0; i--) {
    const fx = estadoJogo.efeitosImpacto[i];
    fx.vida--;
    if (fx.vida <= 0) {
      estadoJogo.efeitosImpacto.splice(i, 1);
    }
  }

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
  if (estadoJogo.status !== "jogando") return;
  if (estadoJogo.frameAtual < estadoJogo.invulneravelAte) return;

  tocarSfxDano();
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
    finalizarDerrota();
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
  const indiceReferencia =
    estadoJogo.status === "lobby"
      ? estadoJogo.faseNoNo >= 0
        ? estadoJogo.faseNoNo
        : estadoJogo.maiorFaseDesbloqueada
      : estadoJogo.nivelIndice;
  const configNivel = NIVEIS[indiceReferencia] || NIVEIS[0];

  hudNivel.textContent = `${configNivel.numero} / ${NIVEIS.length}`;
  hudVida.textContent = soldado.vida;
  hudPontos.textContent = estadoJogo.pontuacao;

  if (estadoJogo.status === "lobby") {
    const pctDesbloqueio = Math.round(
      (estadoJogo.fasesConcluidas.length / NIVEIS.length) * 100
    );
    hudProgresso.textContent = `${pctDesbloqueio}%`;
    return;
  }

  if (configNivel.numero < NIVEIS.length) {
    const pct = Math.min(100, Math.floor((soldado.x / (configNivel.distanciaMeta - 40)) * 100));
    hudProgresso.textContent = `${pct}%`;
  } else {
    hudProgresso.textContent = estadoJogo.boss ? "BOSS!" : "100%";
  }
}

function desenharBotaoSomCanvas() {
  const b = botaoSomCanvas;
  ctx.save();
  ctx.fillStyle = "rgba(15, 23, 42, 0.72)";
  ctx.strokeStyle = sistemaAudio.ativo ? "#f0b429" : "#64748b";
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.roundRect(b.x, b.y, b.largura, b.altura, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = sistemaAudio.ativo ? "#f8fafc" : "#94a3b8";
  ctx.font = "bold 12px Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    sistemaAudio.ativo ? "🔊 Som (M)" : "🔇 Mudo (M)",
    b.x + b.largura / 2,
    b.y + b.altura / 2
  );
  ctx.restore();
}

function desenharMapaLobbyCuphead() {
  // Fundo estilizado estilo mapa retrô de Inkwell / Vanguarda
  const gradFundo = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradFundo.addColorStop(0, "#1d2a3a");
  gradFundo.addColorStop(0.55, "#2b3b2d");
  gradFundo.addColorStop(1, "#433827");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Detalhes de relevo e vegetação do mapa
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  ctx.beginPath();
  ctx.arc(190, 265, 115, 0, Math.PI * 2);
  ctx.arc(455, 195, 110, 0, Math.PI * 2);
  ctx.arc(725, 265, 125, 0, Math.PI * 2);
  ctx.fill();

  // Trilhas conectando os nós (Fase 1 -> Fase 2 -> Fase 3 Boss)
  for (let i = 0; i < NOS_LOBBY.length - 1; i++) {
    const origem = NOS_LOBBY[i];
    const destino = NOS_LOBBY[i + 1];
    const trilhaLiberada = faseEstaDesbloqueada(destino.indice);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(origem.x, origem.y);
    ctx.quadraticCurveTo(
      (origem.x + destino.x) / 2,
      Math.min(origem.y, destino.y) - 34,
      destino.x,
      destino.y
    );
    ctx.strokeStyle = "#14181f";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.strokeStyle = trilhaLiberada ? "#f0b429" : "#64748b";
    ctx.lineWidth = 8;
    ctx.setLineDash(trilhaLiberada ? [] : [8, 8]);
    ctx.stroke();
    ctx.restore();
  }

  // Nós das fases no mapa
  const pulso = 1 + Math.sin(estadoJogo.frameAtual * 0.1) * 0.08;
  for (let i = 0; i < NOS_LOBBY.length; i++) {
    const no = NOS_LOBBY[i];
    const desbloqueada = faseEstaDesbloqueada(no.indice);
    const concluida = faseEstaConcluida(no.indice);
    const selecionado = estadoJogo.faseNoNo === no.indice;

    ctx.save();

    if (desbloqueada && selecionado) {
      ctx.strokeStyle = "#fff3bf";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(no.x, no.y, (no.raio + 8) * pulso, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = !desbloqueada
      ? "#334155"
      : concluida
      ? "#2b8a3e"
      : no.corPonto;
    ctx.strokeStyle = "#11161d";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(no.x, no.y, no.raio, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = desbloqueada ? "#11161d" : "#cbd5e1";
    ctx.font = "bold 11px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(desbloqueada ? (concluida ? "✔ OK" : no.rotuloCurto) : "🔒", no.x, no.y);

    // Placa com nome da fase
    ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
    ctx.strokeStyle = desbloqueada ? "#f0b429" : "#475569";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(no.x - 84, no.y + no.raio + 10, 168, 38, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = desbloqueada ? "#ffffff" : "#94a3b8";
    ctx.font = "bold 12px Segoe UI, sans-serif";
    ctx.fillText(no.titulo, no.x, no.y + no.raio + 23);

    ctx.fillStyle = desbloqueada ? "#cbd5e1" : "#64748b";
    ctx.font = "10px Segoe UI, sans-serif";
    ctx.fillText(
      desbloqueada ? no.subtitulo : "Passe a fase anterior",
      no.x,
      no.y + no.raio + 37
    );

    ctx.restore();
  }

  // Soldado andando pelo mapa do lobby
  desenharSoldado();

  // Banner superior do mapa
  ctx.save();
  ctx.fillStyle = "rgba(15, 23, 42, 0.82)";
  ctx.strokeStyle = "#f0b429";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(18, 12, 390, 32, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f0b429";
  ctx.font = "bold 13px Segoe UI, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("MAPA DO LOBBY • Ande até a fase e aperte Enter/Espaço", 30, 28);
  ctx.restore();

  // Prompt de entrada quando o soldado para sobre uma fase
  if (estadoJogo.faseNoNo >= 0) {
    const noAtual = NOS_LOBBY[estadoJogo.faseNoNo];
    const liberado = faseEstaDesbloqueada(noAtual.indice);
    ctx.save();
    ctx.fillStyle = liberado ? "rgba(20, 83, 45, 0.92)" : "rgba(127, 29, 29, 0.92)";
    ctx.strokeStyle = liberado ? "#69db7c" : "#ff8787";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(canvas.width / 2 - 195, 54, 390, 34, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      liberado
        ? `Pressione ENTER ou ESPAÇO para entrar em ${noAtual.titulo}`
        : `${noAtual.titulo} bloqueada — conclua a fase anterior primeiro`,
      canvas.width / 2,
      71
    );
    ctx.restore();
  } else if (estadoJogo.mensagemBloqueioFrames > 0) {
    ctx.save();
    ctx.fillStyle = "rgba(127, 29, 29, 0.92)";
    ctx.fillRect(canvas.width / 2 - 180, 54, 360, 32);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Fase bloqueada! Conclua a fase anterior para abrir.", canvas.width / 2, 74);
    ctx.restore();
  }

  desenharBotaoSomCanvas();
}

function desenharAcaoVitoriaOverlay() {
  if (estadoJogo.status !== "vitoria_fase") return;

  for (let i = 0; i < estadoJogo.particulasVitoria.length; i++) {
    const p = estadoJogo.particulasVitoria[i];
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.vida / p.vidaMax);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotacao);
    ctx.fillStyle = p.cor;
    ctx.fillRect(-p.tamanho / 2, -p.tamanho / 2, p.tamanho, p.tamanho);
    ctx.restore();
  }

  const proximo = estadoJogo.vitoriaFaseConcluidaIndice + 1;
  const subtitulo =
    proximo < NIVEIS.length
      ? `Próxima fase desbloqueada no lobby: ${NIVEIS[proximo].nome.split(" - ")[1]}`
      : "Campanha concluída! Voltando ao lobby...";

  ctx.save();
  ctx.fillStyle = "rgba(11, 15, 20, 0.72)";
  ctx.fillRect(canvas.width / 2 - 260, 125, 520, 108);
  ctx.strokeStyle = "#ffd43b";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(canvas.width / 2 - 260, 125, 520, 108);

  ctx.fillStyle = "#ffd43b";
  ctx.font = "bold 26px Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("FASE CONCLUÍDA!", canvas.width / 2, 165);

  ctx.fillStyle = "#ffffff";
  ctx.font = "14px Segoe UI, sans-serif";
  ctx.fillText(subtitulo, canvas.width / 2, 198);

  ctx.fillStyle = "#9fb3c8";
  ctx.font = "12px Segoe UI, sans-serif";
  ctx.fillText("Retornando ao mapa do lobby...", canvas.width / 2, 220);
  ctx.restore();
}

function desenharEntradaCaverna(xBase, configNivel) {
  const baseX = xBase - 38;
  const chao = CHAO_Y;
  const oscilacaoChama = Math.sin(estadoJogo.frameAtual * 0.35);
  const oscilacaoBrilho = Math.cos(estadoJogo.frameAtual * 0.22) * 2.5;

  ctx.save();

  ctx.fillStyle = "#24201c";
  ctx.beginPath();
  ctx.moveTo(baseX - 18, chao + 2);
  ctx.lineTo(baseX - 10, chao - 68);
  ctx.lineTo(baseX + 16, chao - 104);
  ctx.lineTo(baseX + 48, chao - 118);
  ctx.lineTo(baseX + 78, chao - 96);
  ctx.lineTo(baseX + 94, chao - 54);
  ctx.lineTo(baseX + 98, chao + 2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#3b352f";
  ctx.beginPath();
  ctx.moveTo(baseX - 12, chao + 2);
  ctx.lineTo(baseX - 4, chao - 56);
  ctx.lineTo(baseX + 18, chao - 92);
  ctx.lineTo(baseX + 46, chao - 106);
  ctx.lineTo(baseX + 72, chao - 84);
  ctx.lineTo(baseX + 86, chao - 42);
  ctx.lineTo(baseX + 90, chao + 2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#574f46";
  ctx.beginPath();
  ctx.moveTo(baseX + 18, chao - 92);
  ctx.lineTo(baseX + 46, chao - 106);
  ctx.lineTo(baseX + 66, chao - 88);
  ctx.lineTo(baseX + 42, chao - 94);
  ctx.lineTo(baseX + 12, chao - 74);
  ctx.closePath();
  ctx.fill();

  const blocosPedra = [
    { x: baseX - 16, y: chao - 24, w: 22, h: 24, cor: "#4a433b", sombra: "#2b2621" },
    { x: baseX - 6, y: chao - 54, w: 24, h: 20, cor: "#5c5349", sombra: "#332d27" },
    { x: baseX + 18, y: chao - 86, w: 28, h: 18, cor: "#665c51", sombra: "#3a342d" },
    { x: baseX + 48, y: chao - 78, w: 24, h: 20, cor: "#524a41", sombra: "#2e2924" },
    { x: baseX + 66, y: chao - 34, w: 22, h: 34, cor: "#463f38", sombra: "#26221d" }
  ];

  for (let i = 0; i < blocosPedra.length; i++) {
    const b = blocosPedra[i];
    ctx.fillStyle = b.cor;
    ctx.beginPath();
    ctx.moveTo(b.x, b.y + b.h);
    ctx.lineTo(b.x + 3, b.y + 3);
    ctx.lineTo(b.x + b.w * 0.65, b.y);
    ctx.lineTo(b.x + b.w, b.y + 7);
    ctx.lineTo(b.x + b.w - 2, b.y + b.h);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = b.sombra;
    ctx.fillRect(b.x + 2, b.y + b.h - 5, b.w - 4, 5);
  }

  const bocaX = baseX + 14;
  const bocaY = chao - 64;
  const bocaLargura = 46;

  const gradCaverna = ctx.createLinearGradient(bocaX, bocaY, bocaX + bocaLargura, chao);
  gradCaverna.addColorStop(0, "#050506");
  gradCaverna.addColorStop(0.65, "#0b0a0c");
  gradCaverna.addColorStop(1, "#181412");

  ctx.fillStyle = gradCaverna;
  ctx.beginPath();
  ctx.moveTo(bocaX, chao + 1);
  ctx.lineTo(bocaX + 2, bocaY + 22);
  ctx.quadraticCurveTo(
    bocaX + bocaLargura * 0.52,
    bocaY - 8,
    bocaX + bocaLargura,
    bocaY + 24
  );
  ctx.lineTo(bocaX + bocaLargura - 2, chao + 1);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#1a1614";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(bocaX + 3, chao);
  ctx.lineTo(bocaX + 4, bocaY + 22);
  ctx.quadraticCurveTo(
    bocaX + bocaLargura * 0.52,
    bocaY - 6,
    bocaX + bocaLargura - 3,
    bocaY + 24
  );
  ctx.lineTo(bocaX + bocaLargura - 3, chao);
  ctx.stroke();

  ctx.strokeStyle = "#1d1916";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(baseX + 28, chao - 96);
  ctx.lineTo(baseX + 24, chao - 78);
  ctx.lineTo(baseX + 31, chao - 66);
  ctx.moveTo(baseX + 56, chao - 88);
  ctx.lineTo(baseX + 62, chao - 68);
  ctx.stroke();

  const tochaX = baseX - 24;
  const tochaY = chao - 36;

  const raioLuz = 42 + oscilacaoBrilho;
  const gradLuz = ctx.createRadialGradient(
    tochaX,
    tochaY - 6,
    3,
    tochaX + 10,
    tochaY,
    raioLuz
  );
  gradLuz.addColorStop(0, "rgba(255, 214, 102, 0.42)");
  gradLuz.addColorStop(0.55, "rgba(255, 132, 36, 0.16)");
  gradLuz.addColorStop(1, "rgba(255, 100, 20, 0)");

  ctx.fillStyle = gradLuz;
  ctx.beginPath();
  ctx.arc(tochaX + 10, tochaY, raioLuz, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#4d453d";
  ctx.beginPath();
  ctx.moveTo(tochaX - 9, chao + 1);
  ctx.lineTo(tochaX - 5, chao - 11);
  ctx.lineTo(tochaX + 6, chao - 11);
  ctx.lineTo(tochaX + 10, chao + 1);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#2b1d12";
  ctx.lineWidth = 4.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(tochaX + 1, chao - 8);
  ctx.lineTo(tochaX - 2, tochaY + 2);
  ctx.stroke();

  ctx.fillStyle = "#5c636a";
  ctx.fillRect(tochaX - 5.5, tochaY - 1, 7, 5);

  const pontaChamaX = tochaX - 2 + oscilacaoChama * 2.2;
  const pontaChamaY = tochaY - 14 - Math.abs(oscilacaoChama) * 2.5;

  ctx.fillStyle = "#f76707";
  ctx.beginPath();
  ctx.moveTo(tochaX - 6, tochaY);
  ctx.quadraticCurveTo(tochaX - 8, tochaY - 9, pontaChamaX, pontaChamaY);
  ctx.quadraticCurveTo(tochaX + 4, tochaY - 8, tochaX + 2, tochaY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffd43b";
  ctx.beginPath();
  ctx.moveTo(tochaX - 4, tochaY);
  ctx.quadraticCurveTo(tochaX - 5, tochaY - 6, pontaChamaX, pontaChamaY);
  ctx.quadraticCurveTo(tochaX + 2, tochaY - 5, tochaX + 1, tochaY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#fff9db";
  ctx.beginPath();
  ctx.arc(tochaX - 1.5, tochaY - 3, 2.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function desenharCaminhosSubterraneos() {
  for (let i = 0; i < estadoJogo.caminhosSubterraneos.length; i++) {
    const cam = estadoJogo.caminhosSubterraneos[i];
    const alfa = cam.ativo ? 1 : Math.max(0, cam.vida / cam.vidaMax);
    const maxT = cam.ativo ? cam.progressoU : 1;
    const passos = Math.max(8, Math.floor(maxT * 28));

    ctx.save();
    ctx.globalAlpha = alfa;

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
  const andando =
    (Math.abs(soldado.vx) > 0.1 || Math.abs(soldado.vy) > 0.1) &&
    (soldado.noChao || estadoJogo.status === "lobby");
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
    const deslocamentoPerna = soldado.noChao || estadoJogo.status === "lobby" ? cicloPasso * 7 : 5;
    const elevacaoPulo = soldado.noChao || estadoJogo.status === "lobby" ? 0 : -4;
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
  if (estadoJogo.status === "lobby") {
    desenharMapaLobbyCuphead();
    return;
  }

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

  if (configNivel.numero < NIVEIS.length) {
    desenharEntradaCaverna(configNivel.distanciaMeta, configNivel);
  }

  const piscando =
    estadoJogo.frameAtual < estadoJogo.invulneravelAte &&
    Math.floor(estadoJogo.frameAtual / 4) % 2 === 0;

  if (!piscando || estadoJogo.danoSoldadoFrames > 0 || estadoJogo.status === "vitoria_fase") {
    desenharSoldado();
  }

  for (let i = 0; i < estadoJogo.efeitosImpacto.length; i++) {
    const fx = estadoJogo.efeitosImpacto[i];
    const progresso = 1 - fx.vida / fx.vidaMax;
    const raio = fx.raioInicial + (fx.raioMax - fx.raioInicial) * progresso;
    ctx.save();
    ctx.globalAlpha = Math.max(0, fx.vida / fx.vidaMax);
    ctx.strokeStyle = fx.cor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(fx.x, fx.y, raio, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#fff9db";
    ctx.beginPath();
    ctx.arc(fx.x, fx.y, Math.max(1.5, raio * 0.35), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
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

  desenharAcaoVitoriaOverlay();
  desenharBotaoSomCanvas();
}

// =========================================================
// 10. LOOP PRINCIPAL
// =========================================================
function loopPrincipal() {
  if (estadoJogo.status === "lobby") {
    estadoJogo.frameAtual++;
    atualizarLobbyCuphead();
    atualizarHUD();
  } else if (estadoJogo.status === "jogando") {
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
  } else if (estadoJogo.status === "vitoria_fase") {
    estadoJogo.frameAtual++;
    atualizarAcaoVitoriaFase();
  }

  desenharCena();
  requestAnimationFrame(loopPrincipal);
}

// Inicialização ao carregar o script
registrarEventos();
atualizarBotaoSomUI();
abrirLobby(estadoJogo.maiorFaseDesbloqueada);
loopPrincipal();