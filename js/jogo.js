// =========================================================
// 1. SELEÇÃO DE ELEMENTOS DO DOM
// =========================================================
const appTelaCheia = document.querySelector("#app-tela-cheia");
const canvas = document.querySelector("#tela-jogo");
const ctx = canvas.getContext("2d");

const btnPauseJogo = document.querySelector("#btn-pause-jogo");
const overlayPause = document.querySelector("#overlay-pause");
const pauseSetorInfo = document.querySelector("#pause-setor-info");
const painelPauseMenu = document.querySelector("#painel-pause-menu");
const painelPauseControles = document.querySelector("#painel-pause-controles");
const painelPauseConfig = document.querySelector("#painel-pause-config");

const btnPauseContinuar = document.querySelector("#btn-pause-continuar");
const btnPauseReiniciar = document.querySelector("#btn-pause-reiniciar");
const btnPauseControles = document.querySelector("#btn-pause-controles");
const btnPauseOpcoes = document.querySelector("#btn-pause-opcoes");
const btnPauseLobby = document.querySelector("#btn-pause-lobby");
const btnPauseMenuPrincipal = document.querySelector("#btn-pause-menu-principal");

const btnVoltarPauseControles = document.querySelector("#btn-voltar-pause-controles");
const btnVoltarPauseOpcoes = document.querySelector("#btn-voltar-pause-opcoes");
const btnPauseOpcaoMusica = document.querySelector("#btn-pause-opcao-musica");
const btnPauseOpcaoSfx = document.querySelector("#btn-pause-opcao-sfx");
const btnPauseOpcaoFullscreen = document.querySelector("#btn-pause-opcao-fullscreen");

const barraLobby = document.querySelector("#barra-lobby");
const statusLobbyTexto = document.querySelector("#status-lobby-texto");
const btnLobbyMusica = document.querySelector("#btn-lobby-musica");
const btnLobbyMenu = document.querySelector("#btn-lobby-menu");
const btnResetProgresso = document.querySelector("#btn-reset-progresso");

const overlayPressKey = document.querySelector("#overlay-press-key");

const overlayMenuPrincipal = document.querySelector("#overlay-menu-principal");
const menuRecordeEl = document.querySelector("#menu-recorde");
const painelMenuOpcoes = document.querySelector("#painel-menu-opcoes");
const painelControles = document.querySelector("#painel-controles");
const painelOpcoes = document.querySelector("#painel-opcoes");
const painelSair = document.querySelector("#painel-sair");
const mensagemSairEl = document.querySelector("#mensagem-sair");

const btnMenuCampanha = document.querySelector("#btn-menu-campanha");
const btnMenuControles = document.querySelector("#btn-menu-controles");
const btnMenuOpcoes = document.querySelector("#btn-menu-opcoes");
const btnMenuSair = document.querySelector("#btn-menu-sair");

const btnVoltarMenuControles = document.querySelector("#btn-voltar-menu-controles");
const btnVoltarMenuOpcoes = document.querySelector("#btn-voltar-menu-opcoes");
const btnOpcaoMusica = document.querySelector("#btn-opcao-musica");
const btnOpcaoSfx = document.querySelector("#btn-opcao-sfx");
const btnOpcaoFullscreen = document.querySelector("#btn-opcao-fullscreen");
const btnConfirmarSair = document.querySelector("#btn-confirmar-sair");
const btnCancelarSair = document.querySelector("#btn-cancelar-sair");

const overlayFim = document.querySelector("#overlay-fim");
const tituloFim = document.querySelector("#titulo-fim");
const mensagemFim = document.querySelector("#mensagem-fim");
const pontuacaoFinalEl = document.querySelector("#pontuacao-final");
const fimRecordeEl = document.querySelector("#fim-recorde");

const btnReiniciar = document.querySelector("#btn-reiniciar");
const btnVoltarLobby = document.querySelector("#btn-voltar-lobby");

const overlayZerado = document.querySelector("#overlay-zerado");
const zeradoPontuacaoEl = document.querySelector("#zerado-pontuacao");
const zeradoRecordeEl = document.querySelector("#zerado-recorde");
const zeradoPatenteEl = document.querySelector("#zerado-patente");
const btnZeradoNovoJogo = document.querySelector("#btn-zerado-novo-jogo");
const btnZeradoLobby = document.querySelector("#btn-zerado-lobby");
const btnZeradoMenu = document.querySelector("#btn-zerado-menu");

// =========================================================
// 2. CONFIGURAÇÃO DOS 3 NÍVEIS E MAPA ESTILO CUPHEAD
// =========================================================
const CHAO_Y = 380;
const GRAVIDADE = 0.65;
const FPS_ESTIMADO = 60;
const CHAVE_PROGRESSO_STORAGE = "operacao_vanguarda_progresso_3fases_v2";

const NIVEIS = [
  {
    numero: 1,
    nome: "Setor 1 - Ruínas Pós-Apocalípticas",
    corCeu: "#232726",
    corChao: "#3b362e",
    distanciaMeta: 2200
  },
  {
    numero: 2,
    nome: "Setor 2 - Caverna Profunda",
    corCeu: "#12161f",
    corChao: "#262229",
    distanciaMeta: 3100
  },
  {
    numero: 3,
    nome: "Setor 3 - Núcleo do Boss",
    corCeu: "#2b1215",
    corChao: "#3b1d22",
    distanciaMeta: 900
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
    titulo: "Caverna Profunda",
    subtitulo: "Abismos, rastejadores e voadores",
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
// 2B. TRILHAS SONORAS PROCEDURAIS PARA CADA PARTE DO JOGO
// =========================================================
const MUSICAS_POR_PARTE = {
  menu: {
    bpm: 96,
    ondaMelodia: "triangle",
    ondaBaixo: "sine",
    volume: 0.038,
    melodia: [
      220.0, 0, 261.63, 329.63, 392.0, 0, 329.63, 293.66,
      261.63, 0, 246.94, 220.0, 196.0, 0, 220.0, 0
    ],
    baixo: [
      55.0, 0, 55.0, 0, 65.41, 0, 65.41, 0,
      49.0, 0, 49.0, 0, 55.0, 0, 55.0, 0
    ]
  },
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
    volume: 0.052,
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
    bpm: 124,
    ondaMelodia: "sawtooth",
    ondaBaixo: "triangle",
    volume: 0.04,
    melodia: [
      246.94, 0, 293.66, 311.13, 293.66, 0, 220.0, 246.94,
      293.66, 0, 369.99, 349.23, 293.66, 246.94, 220.0, 0
    ],
    baixo: [
      61.74, 0, 61.74, 0, 73.42, 0, 55.0, 0,
      61.74, 0, 82.41, 0, 73.42, 0, 55.0, 55.0
    ]
  },
  3: {
    bpm: 152,
    ondaMelodia: "sawtooth",
    ondaBaixo: "square",
    volume: 0.046,
    melodia: [
      523.25, 523.25, 622.25, 523.25, 783.99, 739.99, 622.25, 587.33,
      523.25, 622.25, 783.99, 1046.5, 932.33, 783.99, 622.25, 587.33
    ],
    baixo: [
      65.41, 65.41, 77.78, 65.41, 98.0, 98.0, 87.31, 77.78,
      65.41, 77.78, 98.0, 130.81, 116.54, 98.0, 77.78, 73.42
    ]
  },
  zerado: {
    bpm: 120,
    ondaMelodia: "triangle",
    ondaBaixo: "sine",
    volume: 0.045,
    melodia: [
      523.25, 0, 659.25, 783.99, 1046.5, 0, 783.99, 880.0,
      987.77, 0, 1046.5, 0, 783.99, 659.25, 523.25, 0
    ],
    baixo: [
      130.81, 0, 130.81, 0, 174.61, 0, 174.61, 0,
      196.0, 0, 196.0, 0, 130.81, 0, 130.81, 0
    ]
  },
  derrota: {
    bpm: 82,
    ondaMelodia: "triangle",
    ondaBaixo: "sine",
    volume: 0.036,
    melodia: [
      293.66, 0, 261.63, 0, 246.94, 0, 220.0, 0,
      196.0, 0, 174.61, 0, 164.81, 0, 0, 0
    ],
    baixo: [
      73.42, 0, 0, 0, 65.41, 0, 0, 0,
      55.0, 0, 0, 0, 41.2, 0, 0, 0
    ]
  }
};

const sistemaAudio = {
  ctx: null,
  timerId: null,
  passoAtual: 0,
  faixaAtiva: null,
  musicaAtiva: true,
  sfxAtivo: true
};

function atualizarBotoesAudioUI() {
  const rotuloMusica = sistemaAudio.musicaAtiva ? "🎵 Música: ON" : "🔇 Música: OFF";
  const rotuloSfx = sistemaAudio.sfxAtivo ? "🔊 Efeitos: ON" : "🔈 Efeitos: OFF";

  [btnLobbyMusica, btnOpcaoMusica, btnPauseOpcaoMusica].forEach((btn) => {
    if (btn) btn.textContent = rotuloMusica;
  });

  [btnOpcaoSfx, btnPauseOpcaoSfx].forEach((btn) => {
    if (btn) btn.textContent = rotuloSfx;
  });
}

function alternarMusicaApenas() {
  sistemaAudio.musicaAtiva = !sistemaAudio.musicaAtiva;
  atualizarBotoesAudioUI();

  if (!sistemaAudio.musicaAtiva) {
    pararMusica();
  } else {
    garantirAudioContexto();
    tocarMusicaDaTelaAtual();
  }
}

function alternarSfxApenas() {
  sistemaAudio.sfxAtivo = !sistemaAudio.sfxAtivo;
  atualizarBotoesAudioUI();
  if (sistemaAudio.sfxAtivo) {
    tocarSfxPulo();
  }
}

function garantirAudioContexto() {
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

function tocarNotaSintetizada(freq, duracaoSeg, tipoOnda, ganhoMax, offsetFiltro = 1400, tempoInicio = null) {
  if (!freq || freq <= 0 || !sistemaAudio.ctx || !sistemaAudio.musicaAtiva) return;

  const agora = tempoInicio !== null ? tempoInicio : sistemaAudio.ctx.currentTime;
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
  if (!sistemaAudio.sfxAtivo) return;
  const audioCtx = garantirAudioContexto();
  if (!audioCtx) return;

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
  if (!sistemaAudio.sfxAtivo) return;
  const audioCtx = garantirAudioContexto();
  if (!audioCtx) return;

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
  if (!sistemaAudio.sfxAtivo) return;
  const audioCtx = garantirAudioContexto();
  if (!audioCtx) return;

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

function tocarSfxItemColetado() {
  if (!sistemaAudio.sfxAtivo) return;
  const audioCtx = garantirAudioContexto();
  if (!audioCtx) return;

  const agora = audioCtx.currentTime;
  const notas = [587.33, 880.0];
  notas.forEach((freq, i) => {
    const t = agora + i * 0.07;
    const osc = audioCtx.createOscillator();
    const ganho = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, t);
    ganho.gain.setValueAtTime(0.07, t);
    ganho.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    osc.connect(ganho);
    ganho.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  });
}

function tocarSfxAcertoInimigo(eliminado = false) {
  if (!sistemaAudio.sfxAtivo) return;
  const audioCtx = garantirAudioContexto();
  if (!audioCtx) return;

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
  if (!sistemaAudio.sfxAtivo && !sistemaAudio.musicaAtiva) return;
  const audioCtx = garantirAudioContexto();
  if (!audioCtx) return;

  const agora = audioCtx.currentTime;
  const sequencia = [
    { freq: 523.25, offset: 0, dur: 0.12 },
    { freq: 659.25, offset: 0.11, dur: 0.12 },
    { freq: 783.99, offset: 0.22, dur: 0.12 },
    { freq: 1046.5, offset: 0.34, dur: 0.22 },
    { freq: 880.0, offset: 0.56, dur: 0.12 },
    { freq: 1046.5, offset: 0.69, dur: 0.36 }
  ];

  sequencia.forEach((nota) => {
    const t = agora + nota.offset;
    const osc = audioCtx.createOscillator();
    const ganho = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(nota.freq, t);
    ganho.gain.setValueAtTime(0.075, t);
    ganho.gain.exponentialRampToValueAtTime(0.0001, t + nota.dur);
    osc.connect(ganho);
    ganho.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + nota.dur + 0.02);
  });
}

function tocarSfxDerrota() {
  if (!sistemaAudio.sfxAtivo) return;
  const audioCtx = garantirAudioContexto();
  if (!audioCtx) return;

  const agora = audioCtx.currentTime;
  const notas = [293.66, 261.63, 220.0, 164.81];
  notas.forEach((freq, idx) => {
    const t = agora + idx * 0.13;
    const osc = audioCtx.createOscillator();
    const ganho = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, t);
    ganho.gain.setValueAtTime(0.065, t);
    ganho.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    osc.connect(ganho);
    ganho.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.24);
  });
}

function tocarSfxRisadaBoss() {
  if (!sistemaAudio.sfxAtivo) return;
  const audioCtx = garantirAudioContexto();
  if (!audioCtx) return;

  const pulsos = [0, 0.16, 0.32, 0.48];
  pulsos.forEach((atraso, idx) => {
    const agora = audioCtx.currentTime + atraso;
    const osc = audioCtx.createOscillator();
    const ganho = audioCtx.createGain();

    osc.type = "sawtooth";
    const freqBase = 155 - idx * 12;
    osc.frequency.setValueAtTime(freqBase, agora);
    osc.frequency.exponentialRampToValueAtTime(freqBase * 0.65, agora + 0.12);

    ganho.gain.setValueAtTime(0.06, agora);
    ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 0.13);

    osc.connect(ganho);
    ganho.connect(audioCtx.destination);

    osc.start(agora);
    osc.stop(agora + 0.14);
  });
}

function tocarSfxSocoChaoBoss() {
  if (!sistemaAudio.sfxAtivo) return;
  const audioCtx = garantirAudioContexto();
  if (!audioCtx) return;

  const agora = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const ganho = audioCtx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(135, agora);
  osc.frequency.exponentialRampToValueAtTime(34, agora + 0.32);

  ganho.gain.setValueAtTime(0.14, agora);
  ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 0.34);

  osc.connect(ganho);
  ganho.connect(audioCtx.destination);

  osc.start(agora);
  osc.stop(agora + 0.35);
}

function pararMusica() {
  if (sistemaAudio.timerId !== null) {
    clearInterval(sistemaAudio.timerId);
    sistemaAudio.timerId = null;
  }
  sistemaAudio.faixaAtiva = null;
  sistemaAudio.passoAtual = 0;
}

function iniciarMusica(chaveFaixa) {
  const faixa = MUSICAS_POR_PARTE[chaveFaixa];
  if (!faixa || !sistemaAudio.musicaAtiva) {
    pararMusica();
    return;
  }

  const audioCtx = garantirAudioContexto();
  if (!audioCtx) return;

  if (sistemaAudio.faixaAtiva === chaveFaixa && sistemaAudio.timerId !== null) {
    return;
  }

  pararMusica();
  sistemaAudio.faixaAtiva = chaveFaixa;
  sistemaAudio.passoAtual = 0;

  const duracaoPassoSeg = 60 / faixa.bpm / 4;
  const intervaloMs = duracaoPassoSeg * 1000;

  const executarPasso = () => {
    if (!sistemaAudio.musicaAtiva) return;
    if (estadoJogo.status === "pausado" || estadoJogo.status === "press_key") return;
    if (!sistemaAudio.ctx || sistemaAudio.ctx.state !== "running") return;

    const idx = sistemaAudio.passoAtual % faixa.melodia.length;
    const notaMelodia = faixa.melodia[idx];
    const notaBaixo = faixa.baixo[idx];

    tocarNotaSintetizada(notaMelodia, duracaoPassoSeg, faixa.ondaMelodia, faixa.volume, 2200);
    tocarNotaSintetizada(notaBaixo, duracaoPassoSeg * 1.1, faixa.ondaBaixo, faixa.volume * 0.85, 520);

    sistemaAudio.passoAtual++;
  };

  executarPasso();
  sistemaAudio.timerId = setInterval(executarPasso, intervaloMs);
}

function tocarMusicaDaTelaAtual() {
  if (!sistemaAudio.musicaAtiva) return;

  if (estadoJogo.status === "menu") {
    iniciarMusica("menu");
  } else if (estadoJogo.status === "lobby") {
    iniciarMusica("lobby");
  } else if (estadoJogo.status === "jogando" || estadoJogo.status === "derrotando_boss") {
    iniciarMusica(NIVEIS[estadoJogo.nivelIndice].numero);
  } else if (estadoJogo.status === "zerado") {
    iniciarMusica("zerado");
  } else if (estadoJogo.status === "derrota") {
    iniciarMusica("derrota");
  }
}

// =========================================================
// 3. ESTADO DO JOGO E PERSISTÊNCIA (SAVE + RECORDE)
// =========================================================
const teclas = {};

function carregarProgressoSalvo() {
  try {
    const bruto = localStorage.getItem(CHAVE_PROGRESSO_STORAGE);
    if (!bruto) {
      return { maiorFaseDesbloqueada: 0, fasesConcluidas: [], maiorPontuacao: 0 };
    }
    const parsed = JSON.parse(bruto);
    const maior = Math.max(0, Math.min(NIVEIS.length - 1, Number(parsed.maiorFaseDesbloqueada) || 0));
    const concluidas = Array.isArray(parsed.fasesConcluidas)
      ? parsed.fasesConcluidas.filter((n) => Number.isInteger(n) && n >= 0 && n < NIVEIS.length)
      : [];
    const recorde = Math.max(0, Number(parsed.maiorPontuacao) || 0);
    return { maiorFaseDesbloqueada: maior, fasesConcluidas: concluidas, maiorPontuacao: recorde };
  } catch {
    return { maiorFaseDesbloqueada: 0, fasesConcluidas: [], maiorPontuacao: 0 };
  }
}

function adicionarPontos(quantidade) {
  const delta = Math.max(0, Math.round(Number(quantidade) || 0));
  if (delta <= 0) return;
  estadoJogo.pontuacao += delta;
  if (estadoJogo.pontuacao > estadoJogo.maiorPontuacao) {
    estadoJogo.maiorPontuacao = estadoJogo.pontuacao;
    atualizarRecordesUI();
  }
}

function salvarProgresso() {
  try {
    estadoJogo.pontuacao = Math.max(0, Math.round(Number(estadoJogo.pontuacao) || 0));
    if (estadoJogo.pontuacao > estadoJogo.maiorPontuacao) {
      estadoJogo.maiorPontuacao = estadoJogo.pontuacao;
    }
    localStorage.setItem(
      CHAVE_PROGRESSO_STORAGE,
      JSON.stringify({
        maiorFaseDesbloqueada: estadoJogo.maiorFaseDesbloqueada,
        fasesConcluidas: estadoJogo.fasesConcluidas,
        maiorPontuacao: estadoJogo.maiorPontuacao
      })
    );
    atualizarRecordesUI();
  } catch {
    // Ignora falha de armazenamento se bloqueado
  }
}

function atualizarRecordesUI() {
  if (menuRecordeEl) menuRecordeEl.textContent = estadoJogo.maiorPontuacao;
  if (fimRecordeEl) fimRecordeEl.textContent = estadoJogo.maiorPontuacao;
  if (zeradoRecordeEl) zeradoRecordeEl.textContent = estadoJogo.maiorPontuacao;
}

const progressoInicial = carregarProgressoSalvo();

const estadoJogo = {
  // "press_key" | "menu" | "lobby" | "jogando" | "pausado" | "derrotando_boss" | "vitoria_fase" | "derrota" | "zerado"
  status: "press_key",
  maiorFaseDesbloqueada: progressoInicial.maiorFaseDesbloqueada,
  fasesConcluidas: progressoInicial.fasesConcluidas,
  maiorPontuacao: progressoInicial.maiorPontuacao,
  faseNoNo: 0,
  mensagemBloqueioFrames: 0,
  vitoriaTimerFrames: 0,
  vitoriaFaseConcluidaIndice: 0,
  vitoriaCampanhaCompleta: false,
  particulasVitoria: [],
  derrotandoBossFrames: 0,
  bossUltimaPos: { x: 715, y: CHAO_Y - 156, largura: 140, altura: 156 },

  nivelIndice: 0,
  pontuacao: 0,
  pontuacaoInicioFase: 0,
  cameraX: 0,
  frameAtual: 0,
  ultimoTiroFrame: 0,
  invulneravelAte: 0,
  tiroTriploAteFrame: 0,
  danoSoldadoFrames: 0,
  pulsoTelaDano: 0,
  inclinacaoDano: 0,
  avisoNivelFrames: 0,
  plataformas: [],
  estruturasQuebradas: [],
  obstaculos: [],
  abismosSemFundo: [],
  buracosChao: [],
  caminhosSubterraneos: [],
  itensChao: [],
  inimigos: [],
  particulasDano: [],
  efeitosImpacto: [],
  textosFlutuantes: [],
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
  coyoteFrames: 0,
  jumpBufferFrames: 0,
  plataformaAtual: null,
  plataformaIgnorada: null,
  ignorarPlataformaAteFrame: 0,
  caindoNoAbismo: false,
  deitado: false,
  olhandoCima: false,
  olhandoBaixo: false,
  mirandoParado: false,
  miraDx: 1,
  miraDy: 0,
  direcao: 1,
  vida: 3,
  vidaMaxima: 3
};

// =========================================================
// 3B. TELA CHEIA, TELA INICIAL, PAUSE E MENU CENTRAL
// =========================================================
function solicitarTelaCheiaSePossivel() {
  const alvo = appTelaCheia || document.documentElement;
  if (!document.fullscreenElement && alvo && alvo.requestFullscreen) {
    alvo.requestFullscreen().catch(() => {});
  }
}

function alternarTelaCheia() {
  if (!document.fullscreenElement) {
    const alvo = appTelaCheia || document.documentElement;
    if (alvo && alvo.requestFullscreen) {
      alvo.requestFullscreen().catch(() => {});
    }
  } else if (document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
}

function atualizarBotaoPauseUI() {
  if (!btnPauseJogo) return;
  if (estadoJogo.status === "jogando") {
    btnPauseJogo.classList.remove("oculto");
  } else {
    btnPauseJogo.classList.add("oculto");
  }
}

function esconderTodosOverlays() {
  overlayPressKey.classList.add("oculto");
  overlayMenuPrincipal.classList.add("oculto");
  overlayPause.classList.add("oculto");
  overlayFim.classList.add("oculto");
  overlayZerado.classList.add("oculto");
  atualizarBotaoPauseUI();
}

function pausarJogo(subtela = "principal") {
  if (estadoJogo.status !== "jogando" && estadoJogo.status !== "pausado") return;

  pararMusica();
  estadoJogo.status = "pausado";

  Object.keys(teclas).forEach((codigoTecla) => {
    teclas[codigoTecla] = false;
  });

  if (pauseSetorInfo) {
    pauseSetorInfo.textContent = `PAUSADO • ${NIVEIS[estadoJogo.nivelIndice].nome.toUpperCase()}`;
  }

  esconderTodosOverlays();
  overlayPause.classList.remove("oculto");

  painelPauseMenu.classList.add("oculto");
  painelPauseControles.classList.add("oculto");
  painelPauseConfig.classList.add("oculto");

  if (subtela === "controles") {
    painelPauseControles.classList.remove("oculto");
  } else if (subtela === "opcoes") {
    painelPauseConfig.classList.remove("oculto");
  } else {
    painelPauseMenu.classList.remove("oculto");
  }

  atualizarBarraLobbyUI();
  atualizarBotoesAudioUI();
}

function continuarJogo() {
  if (estadoJogo.status !== "pausado") return;

  estadoJogo.status = "jogando";
  esconderTodosOverlays();
  atualizarBarraLobbyUI();
  atualizarBotoesAudioUI();
  tocarMusicaDaTelaAtual();
}

function irParaTelaPressKey() {
  pararMusica();
  estadoJogo.status = "press_key";
  esconderTodosOverlays();
  overlayPressKey.classList.remove("oculto");
  atualizarBarraLobbyUI();
  atualizarBotoesAudioUI();
}

function irDiretoParaMenuAposTecla(evitarFullscreen = false) {
  if (estadoJogo.status !== "press_key") return;
  if (!evitarFullscreen) {
    solicitarTelaCheiaSePossivel();
  }
  garantirAudioContexto();
  abrirMenuPrincipal("principal");
}

function abrirMenuPrincipal(subtela = "principal") {
  estadoJogo.status = "menu";
  esconderTodosOverlays();
  atualizarRecordesUI();
  overlayMenuPrincipal.classList.remove("oculto");

  painelMenuOpcoes.classList.add("oculto");
  painelControles.classList.add("oculto");
  painelOpcoes.classList.add("oculto");
  painelSair.classList.add("oculto");

  if (subtela === "controles") {
    painelControles.classList.remove("oculto");
  } else if (subtela === "opcoes") {
    painelOpcoes.classList.remove("oculto");
  } else if (subtela === "sair") {
    mensagemSairEl.textContent =
      "Sessão pausada. Feche esta aba/janela para sair ou volte à tela inicial.";
    painelSair.classList.remove("oculto");
  } else {
    painelMenuOpcoes.classList.remove("oculto");
  }

  atualizarBarraLobbyUI();
  atualizarBotoesAudioUI();
  tocarMusicaDaTelaAtual();
}

function sairDoJogo() {
  pararMusica();
  try {
    window.close();
  } catch {
    // Ignora se bloqueado pelo navegador
  }
}

// =========================================================
// 4. LOBBY ESTILO CUPHEAD, DESBLOQUEIO E FINAL DA CAMPANHA
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
  soldado.olhandoBaixo = false;
  soldado.mirandoParado = false;
  soldado.miraDx = 1;
  soldado.miraDy = 0;
  soldado.caindoNoAbismo = false;
  soldado.plataformaAtual = null;
  soldado.plataformaIgnorada = null;
  soldado.ignorarPlataformaAteFrame = 0;
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
  estadoJogo.textosFlutuantes = [];
  estadoJogo.tirosJogador = [];
  estadoJogo.tirosInimigos = [];

  esconderTodosOverlays();
  posicionarSoldadoNoNoLobby(alvo);
  atualizarBotoesAudioUI();
  tocarMusicaDaTelaAtual();
}

function resetarProgressoLobby() {
  estadoJogo.maiorFaseDesbloqueada = 0;
  estadoJogo.fasesConcluidas = [];
  estadoJogo.maiorPontuacao = 0;
  estadoJogo.pontuacao = 0;
  estadoJogo.pontuacaoInicioFase = 0;
  salvarProgresso();
  if (estadoJogo.status === "lobby") {
    posicionarSoldadoNoNoLobby(0);
  }
}

function tentarEntrarNaFase(indice) {
  if (!faseEstaDesbloqueada(indice)) {
    estadoJogo.mensagemBloqueioFrames = 95;
    atualizarBarraLobbyUI();
    return;
  }
  iniciarFase(indice);
}

function atualizarLobbyCuphead(dt) {
  const esquerda = teclas["KeyA"] || teclas["ArrowLeft"];
  const direita = teclas["KeyD"] || teclas["ArrowRight"];
  const cima = teclas["KeyW"] || teclas["ArrowUp"];
  const baixo = teclas["KeyS"] || teclas["ArrowDown"];

  if (estadoJogo.mensagemBloqueioFrames > 0) {
    estadoJogo.mensagemBloqueioFrames = Math.max(0, estadoJogo.mensagemBloqueioFrames - dt);
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
    const centroX = soldado.x + soldado.largura / 2 + soldado.vx * dt;
    const baseY = soldado.y + soldado.alturaAtual + soldado.vy * dt;

    const xLimitado = Math.max(85, Math.min(canvas.width - 85, centroX));
    const yLimitado = Math.max(155, Math.min(365, baseY));

    soldado.x = xLimitado - soldado.largura / 2;
    soldado.y = yLimitado - soldado.alturaAtual;
  }

  const peX = soldado.x + soldado.largura / 2;
  const peY = soldado.y + soldado.alturaAtual;
  let noEncontrado = null;

  for (let i = 0; i < NOS_LOBBY.length; i++) {
    const no = NOS_LOBBY[i];
    const dist = Math.hypot(peX - no.x, peY - no.y);
    if (dist <= no.raio + 16) {
      noEncontrado = no;
      if (movendoX === 0 && movendoY === 0 && dist > 3) {
        const alvoX = no.x - soldado.largura / 2;
        const alvoY = no.y - soldado.alturaEmPe + 4;
        soldado.x += (alvoX - soldado.x) * 0.25 * dt;
        soldado.y += (alvoY - soldado.y) * 0.25 * dt;
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

  if (estadoJogo.status === "lobby" || estadoJogo.status === "menu") {
    estadoJogo.pontuacaoInicioFase = estadoJogo.pontuacao;
  } else {
    estadoJogo.pontuacao = estadoJogo.pontuacaoInicioFase;
  }

  estadoJogo.status = "jogando";
  estadoJogo.nivelIndice = indiceValido;
  estadoJogo.frameAtual = 0;
  estadoJogo.ultimoTiroFrame = 0;
  estadoJogo.invulneravelAte = 0;
  estadoJogo.tiroTriploAteFrame = 0;
  estadoJogo.danoSoldadoFrames = 0;
  estadoJogo.pulsoTelaDano = 0;
  estadoJogo.inclinacaoDano = 0;
  estadoJogo.particulasDano = [];
  estadoJogo.efeitosImpacto = [];
  estadoJogo.textosFlutuantes = [];
  estadoJogo.particulasVitoria = [];
  estadoJogo.abismosSemFundo = [];
  estadoJogo.buracosChao = [];
  estadoJogo.caminhosSubterraneos = [];
  estadoJogo.itensChao = [];

  soldado.vida = soldado.vidaMaxima;
  soldado.direcao = 1;
  soldado.deitado = false;
  soldado.olhandoCima = false;
  soldado.olhandoBaixo = false;
  soldado.mirandoParado = false;
  soldado.miraDx = 1;
  soldado.miraDy = 0;
  soldado.caindoNoAbismo = false;
  soldado.coyoteFrames = 0;
  soldado.jumpBufferFrames = 0;
  soldado.plataformaAtual = null;
  soldado.plataformaIgnorada = null;
  soldado.ignorarPlataformaAteFrame = 0;
  soldado.largura = soldado.larguraEmPe;
  soldado.alturaAtual = soldado.alturaEmPe;

  esconderTodosOverlays();
  atualizarBarraLobbyUI();
  atualizarBotoesAudioUI();
  carregarNivel(indiceValido);
}

function carregarNivel(indice) {
  const configNivel = NIVEIS[indice];
  estadoJogo.nivelIndice = indice;
  estadoJogo.cameraX = 0;
  estadoJogo.inimigos = [];
  estadoJogo.obstaculos = [];
  estadoJogo.estruturasQuebradas = [];
  estadoJogo.abismosSemFundo = [];
  estadoJogo.buracosChao = [];
  estadoJogo.caminhosSubterraneos = [];
  estadoJogo.itensChao = [];
  estadoJogo.particulasDano = [];
  estadoJogo.efeitosImpacto = [];
  estadoJogo.textosFlutuantes = [];
  estadoJogo.tirosJogador = [];
  estadoJogo.tirosInimigos = [];
  estadoJogo.boss = null;
  estadoJogo.danoSoldadoFrames = 0;
  estadoJogo.pulsoTelaDano = 0;
  estadoJogo.inclinacaoDano = 0;
  estadoJogo.avisoNivelFrames = 140;

  soldado.deitado = false;
  soldado.olhandoCima = false;
  soldado.olhandoBaixo = false;
  soldado.mirandoParado = false;
  soldado.miraDx = 1;
  soldado.miraDy = 0;
  soldado.caindoNoAbismo = false;
  soldado.plataformaAtual = null;
  soldado.plataformaIgnorada = null;
  soldado.ignorarPlataformaAteFrame = 0;
  soldado.largura = soldado.larguraEmPe;
  soldado.alturaAtual = soldado.alturaEmPe;
  soldado.x = 100;
  soldado.y = CHAO_Y - soldado.alturaEmPe;
  soldado.vx = 0;
  soldado.vy = 0;
  soldado.noChao = true;

  estadoJogo.plataformas = [];
  if (configNivel.numero === 1) {
    configurarMapaFase1();
    posicionarRastejadoresMapa();
  } else if (configNivel.numero === 2) {
    configurarMapaFase2Caverna();
    posicionarRastejadoresFase2();
    posicionarVoadoresFase2();
  } else {
    estadoJogo.plataformas.push(
      { x: 140, y: CHAO_Y - 105, largura: 160, altura: 16, tipo: "padrao", desmoronavel: false },
      { x: 600, y: CHAO_Y - 105, largura: 160, altura: 16, tipo: "padrao", desmoronavel: false }
    );
    criarBoss();
  }

  tocarMusicaDaTelaAtual();
}

function configurarMapaFase1() {
  const posicoesPlataformas = [470, 1180, 1760];
  for (let i = 0; i < posicoesPlataformas.length; i++) {
    const px = posicoesPlataformas[i];
    const tempoBase = FPS_ESTIMADO * 2.2;
    estadoJogo.plataformas.push({
      x: px,
      y: CHAO_Y - 105,
      yOriginal: CHAO_Y - 105,
      largura: 135,
      altura: 20,
      tipo: "predio",
      desmoronavel: true,
      pisada: false,
      tempoInicialFrames: tempoBase,
      tempoRestanteFrames: tempoBase,
      desmoronando: false,
      respawnFrames: 0,
      vy: 0
    });
  }

  const posicoesEscombros = [390, 840, 1460, 1920];
  for (let i = 0; i < posicoesEscombros.length; i++) {
    estadoJogo.obstaculos.push({
      x: posicoesEscombros[i],
      y: CHAO_Y - 26,
      largura: 54,
      altura: 26,
      tipo: "escombros"
    });
  }

  const posicoesPredios = [660, 1580];
  for (let i = 0; i < posicoesPredios.length; i++) {
    estadoJogo.estruturasQuebradas.push({
      x: posicoesPredios[i],
      y: CHAO_Y - 135,
      largura: 110,
      alturaTotal: 135,
      alturaPassagem: 34
    });
  }

  spawnItemChao(1240, CHAO_Y - 135, "tiro_triplo");
}

function configurarMapaFase2Caverna() {
  const abismos = [
    { x: 520, largura: 84 },
    { x: 1060, largura: 90 },
    { x: 1360, largura: 250 },
    { x: 1840, largura: 88 },
    { x: 2340, largura: 92 },
    { x: 2800, largura: 88 }
  ];

  for (let i = 0; i < abismos.length; i++) {
    estadoJogo.abismosSemFundo.push({
      x: abismos[i].x,
      largura: abismos[i].largura
    });
  }

  const formacoesChao = [
    { x: 350, largura: 84, altura: 46, tipo: "rocha_elevada" },
    { x: 820, largura: 110, altura: 66, tipo: "rocha_elevada" },
    { x: 1690, largura: 82, altura: 46, tipo: "rocha_elevada" },
    { x: 2050, largura: 114, altura: 70, tipo: "rocha_elevada" },
    { x: 2540, largura: 92, altura: 54, tipo: "rocha_elevada" },
    { x: 2940, largura: 96, altura: 58, tipo: "rocha_elevada" }
  ];

  for (let i = 0; i < formacoesChao.length; i++) {
    const f = formacoesChao[i];
    estadoJogo.obstaculos.push({
      x: f.x,
      y: CHAO_Y - f.altura,
      largura: f.largura,
      altura: f.altura,
      tipo: f.tipo
    });
  }

  const abismosComPlataforma = [1360, 1840];
  for (let i = 0; i < abismos.length; i++) {
    const ab = abismos[i];
    if (!abismosComPlataforma.includes(ab.x)) continue;

    if (ab.largura >= 160) {
      const larguraPlat = 120;
      const xPlat = ab.x + (ab.largura - larguraPlat) / 2;
      const tempoBase = Math.round(FPS_ESTIMADO * 1.6);
      estadoJogo.plataformas.push({
        x: xPlat,
        y: CHAO_Y - 38,
        yOriginal: CHAO_Y - 38,
        largura: larguraPlat,
        altura: 18,
        tipo: "caverna",
        desmoronavel: true,
        pisada: false,
        tempoInicialFrames: tempoBase,
        tempoRestanteFrames: tempoBase,
        desmoronando: false,
        respawnFrames: 0,
        vy: 0
      });
    } else {
      const centroAbismo = ab.x + ab.largura / 2;
      estadoJogo.plataformas.push({
        x: centroAbismo - 62,
        y: CHAO_Y - 108,
        largura: 124,
        altura: 18,
        tipo: "caverna",
        desmoronavel: false
      });
    }
  }

  spawnItemChao(1720, CHAO_Y - 76, "vida");
  spawnItemChao(2575, CHAO_Y - 84, "tiro_triplo");
}

function spawnItemChao(x, y, tipo) {
  estadoJogo.itensChao.push({
    x,
    y,
    yBase: y,
    largura: 22,
    altura: 22,
    tipo,
    fase: Math.random() * Math.PI * 2
  });
}

function posicionarRastejadoresMapa() {
  const pontosMapa = [
    { x: 540, alcance: 230, velocidadeAtaque: 1.35, variante: "normal" },
    { x: 860, alcance: 235, velocidadeAtaque: 1.4, variante: "azul" },
    { x: 1220, alcance: 240, velocidadeAtaque: 1.5, variante: "normal" },
    { x: 1730, alcance: 240, velocidadeAtaque: 1.55, variante: "azul" },
    { x: 1960, alcance: 245, velocidadeAtaque: 1.65, variante: "normal" }
  ];

  for (let i = 0; i < pontosMapa.length; i++) {
    const ponto = pontosMapa[i];
    estadoJogo.inimigos.push(
      criarRastejador(ponto.x, ponto.alcance, ponto.velocidadeAtaque, i, ponto.variante)
    );
  }
}

function posicionarRastejadoresFase2() {
  const pontosFase2 = [
    { x: 730, alcance: 240, velocidadeAtaque: 1.55, variante: "normal", yBase: CHAO_Y },
    { x: 850, alcance: 250, velocidadeAtaque: 1.6, variante: "azul", yBase: CHAO_Y - 66 },
    { x: 1865, alcance: 255, velocidadeAtaque: 1.7, variante: "azul", yBase: CHAO_Y - 108 },
    { x: 1995, alcance: 250, velocidadeAtaque: 1.75, variante: "normal", yBase: CHAO_Y },
    { x: 2565, alcance: 260, velocidadeAtaque: 1.8, variante: "azul", yBase: CHAO_Y - 54 },
    { x: 3042, alcance: 265, velocidadeAtaque: 1.85, variante: "normal", yBase: CHAO_Y }
  ];

  for (let i = 0; i < pontosFase2.length; i++) {
    const p = pontosFase2[i];
    estadoJogo.inimigos.push(
      criarRastejador(p.x, p.alcance, p.velocidadeAtaque, i + 10, p.variante, p.yBase)
    );
  }
}

function posicionarVoadoresFase2() {
  const locaisVoadores = [
    { x: 1105, y: 145, raioDeteccao: 280, amplitudePatrulha: 95, offsetTiro: 40 },
    { x: 2100, y: 138, raioDeteccao: 290, amplitudePatrulha: 100, offsetTiro: 120 },
    { x: 2840, y: 140, raioDeteccao: 295, amplitudePatrulha: 95, offsetTiro: 190 }
  ];

  for (let i = 0; i < locaisVoadores.length; i++) {
    const lv = locaisVoadores[i];
    const voador = criarVoadorAcido(lv.x, lv.y, lv.raioDeteccao, lv.amplitudePatrulha, i * 1.35);
    voador.ultimoAcidoFrame = -voador.cadenciaAcido + lv.offsetTiro;
    estadoJogo.inimigos.push(voador);
  }
}

function criarRastejador(
  x,
  alcance = 240,
  velocidadeAtaque = 1.5,
  indice = 0,
  variante = "normal",
  yBase = CHAO_Y
) {
  const ehAzul = variante === "azul";
  return {
    tipo: "rastejador",
    variante: ehAzul ? "azul" : "normal",
    x: x,
    y: yBase - 26,
    largura: 52,
    altura: 26,
    vx: 0,
    vy: 0,
    vida: 2,
    vidaMaxima: 2,
    mostrarBarraVida: false,
    pontos: 75,
    estado: "esperando",
    obstaculoAlvo: null,
    buracoEntradaId: null,
    caminhoId: null,
    rastroPulo: [],
    ocultoNaTerra: false,
    alcanceAtaque: alcance,
    velocidadeAtaque: velocidadeAtaque,
    cooldownPuloAzul: 0,
    direcaoOlhar: -1,
    faseCobra: indice * 1.1,
    danoFrames: 0,
    cor: ehAzul ? "#339af0" : "#9c6644"
  };
}

function criarVoadorAcido(x, yBase, raioDeteccao = 280, amplitudePatrulha = 125, faseSeed = 0) {
  return {
    tipo: "voador_acido",
    x: x,
    y: yBase,
    yBase: yBase,
    xAncora: x,
    raioDeteccao: raioDeteccao,
    amplitudePatrulha: amplitudePatrulha,
    ativoPatrulha: false,
    largura: 48,
    altura: 28,
    vx: 0,
    vy: 0,
    direcaoVoo: -1,
    faseAsa: faseSeed,
    vida: 1,
    vidaMaxima: 1,
    mostrarBarraVida: false,
    pontos: 100,
    danoFrames: 0,
    cor: "#6d4c7d",
    ultimoAcidoFrame: -300,
    cadenciaAcido: FPS_ESTIMADO * 5
  };
}

function criarBoss() {
  for (let i = 0; i < estadoJogo.plataformas.length; i++) {
    if (estadoJogo.plataformas[i].x === 140) {
      estadoJogo.plataformas[i].x = 250;
    } else if (estadoJogo.plataformas[i].x === 600) {
      estadoJogo.plataformas[i].x = 490;
    }
  }

  estadoJogo.boss = {
    x: 715,
    y: CHAO_Y - 156,
    largura: 140,
    altura: 156,
    vx: 0,
    vy: 0,
    vida: 60,
    vidaMaxima: 60,
    danoFrames: 0,
    lado: "direita",
    direcaoOlhar: -1,
    estado: "parado",
    timerEstado: 80,
    frameAcao: 0,
    indiceCicloAtaque: 0,
    acoesDesdeUltimoPulo: 0,
    xOrigemPulo: 715,
    xDestinoPulo: 715,
    escalaX: 1,
    escalaY: 1,
    invocouNaAcao: false,
    tremorChaoFrames: 0,
    risadasFlutuantes: []
  };
}

function gerarParticulasVitoria(origemTelaX, origemTelaY) {
  const cores = ["#ffd43b", "#51cf66", "#339af0", "#ff922b", "#f06595"];
  estadoJogo.particulasVitoria = [];
  for (let i = 0; i < 48; i++) {
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

function iniciarSequenciaDerrotaBoss(boss) {
  estadoJogo.bossUltimaPos = {
    x: boss.x,
    y: boss.y,
    largura: boss.largura,
    altura: boss.altura,
    lado: boss.lado,
    direcaoOlhar: boss.direcaoOlhar,
    escalaX: boss.escalaX,
    escalaY: boss.escalaY,
    vida: 0,
    vidaMaxima: boss.vidaMaxima,
    estado: "rindo",
    frameAcao: 0,
    danoFrames: 10,
    risadasFlutuantes: []
  };
  estadoJogo.boss = null;
  estadoJogo.inimigos = [];
  estadoJogo.tirosInimigos = [];
  estadoJogo.status = "derrotando_boss";
  estadoJogo.derrotandoBossFrames = 135;
  tocarSfxSocoChaoBoss();
}

function atualizarSequenciaDerrotaBoss(dt) {
  const frameAntes = estadoJogo.derrotandoBossFrames;
  estadoJogo.derrotandoBossFrames -= dt;

  if (Math.floor(frameAntes / 8) !== Math.floor(estadoJogo.derrotandoBossFrames / 8)) {
    const b = estadoJogo.bossUltimaPos;
    const ex = b.x + Math.random() * b.largura;
    const ey = b.y + Math.random() * b.altura;
    gerarFaiscasAcertoAlvo(ex, ey, Math.random() < 0.5 ? "#ffd43b" : "#ff6b6b", 26);
    tocarSfxAcertoInimigo(true);
  }

  atualizarParticulasDano(dt);

  if (estadoJogo.derrotandoBossFrames <= 0) {
    estadoJogo.status = "jogando";
    concluirFaseComVitoria(estadoJogo.nivelIndice);
  }
}

function concluirFaseComVitoria(indiceFase) {
  if (estadoJogo.status !== "jogando") return;

  pararMusica();
  tocarMusiquinhaVitoriaFase();

  if (!estadoJogo.fasesConcluidas.includes(indiceFase)) {
    estadoJogo.fasesConcluidas.push(indiceFase);
  }

  const proximoIndice = indiceFase + 1;
  const campanhaCompleta = proximoIndice >= NIVEIS.length;
  if (!campanhaCompleta && proximoIndice > estadoJogo.maiorFaseDesbloqueada) {
    estadoJogo.maiorFaseDesbloqueada = proximoIndice;
  }

  adicionarPontos(soldado.vida * 150);
  salvarProgresso();

  estadoJogo.status = "vitoria_fase";
  estadoJogo.vitoriaFaseConcluidaIndice = indiceFase;
  estadoJogo.vitoriaCampanhaCompleta = campanhaCompleta;
  estadoJogo.vitoriaTimerFrames = 145;

  soldado.vx = 0;
  soldado.vy = -5.5;
  soldado.noChao = false;

  const telaX = soldado.x - estadoJogo.cameraX + soldado.largura / 2;
  const telaY = soldado.y + soldado.alturaAtual / 2;
  gerarParticulasVitoria(telaX, telaY);
  atualizarBarraLobbyUI();
  atualizarBotoesAudioUI();
}

function calcularPatenteFinal(pontos) {
  if (pontos >= 3200) return "LENDA DA VANGUARDA (RANK S)";
  if (pontos >= 2400) return "COMANDANTE SUPREMO (RANK A)";
  if (pontos >= 1700) return "CAPITÃO DE ELITE (RANK B)";
  return "SOLDADO VETERANO (RANK C)";
}

function abrirTelaCampanhaZerada() {
  estadoJogo.status = "zerado";
  salvarProgresso();

  if (zeradoPontuacaoEl) zeradoPontuacaoEl.textContent = `${estadoJogo.pontuacao} pts`;
  if (zeradoRecordeEl) zeradoRecordeEl.textContent = `${estadoJogo.maiorPontuacao} pts`;
  if (zeradoPatenteEl) zeradoPatenteEl.textContent = calcularPatenteFinal(estadoJogo.pontuacao);

  esconderTodosOverlays();
  overlayZerado.classList.remove("oculto");
  atualizarBarraLobbyUI();
  atualizarBotoesAudioUI();
  tocarMusicaDaTelaAtual();
}

function atualizarAcaoVitoriaFase(dt) {
  estadoJogo.vitoriaTimerFrames -= dt;

  soldado.vy += GRAVIDADE * 0.6 * dt;
  soldado.y += soldado.vy * dt;
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
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 0.12 * dt;
    p.rotacao += p.vRotacao * dt;
    p.vida -= dt;
    if (p.vida <= 0) {
      estadoJogo.particulasVitoria.splice(i, 1);
    }
  }

  if (estadoJogo.vitoriaTimerFrames <= 0) {
    if (estadoJogo.vitoriaCampanhaCompleta) {
      abrirTelaCampanhaZerada();
    } else {
      const proximo = estadoJogo.vitoriaFaseConcluidaIndice + 1;
      abrirLobby(proximo);
    }
  }
}

function finalizarDerrota(motivoQueda = false) {
  pararMusica();
  tocarSfxDerrota();
  salvarProgresso();

  estadoJogo.status = "derrota";
  tituloFim.textContent = motivoQueda ? "Você Caiu no Abismo!" : "Soldado Abatido!";
  mensagemFim.textContent = motivoQueda
    ? "Você caiu em um buraco sem fundo. Tente novamente ou volte ao lobby."
    : "Você perdeu todos os seus corações. Tente novamente ou volte ao lobby.";
  pontuacaoFinalEl.textContent = estadoJogo.pontuacao;
  atualizarRecordesUI();

  estadoJogo.pontuacao = estadoJogo.pontuacaoInicioFase;
  atualizarBarraLobbyUI();
  atualizarBotoesAudioUI();
  esconderTodosOverlays();
  overlayFim.classList.remove("oculto");

  setTimeout(() => {
    if (estadoJogo.status === "derrota") {
      tocarMusicaDaTelaAtual();
    }
  }, 600);
}

// =========================================================
// 5. EVENTOS (APENAS addEventListener)
// =========================================================
function registrarEventos() {
  if (btnPauseJogo) {
    btnPauseJogo.addEventListener("click", function () {
      pausarJogo("principal");
    });
  }

  btnPauseContinuar.addEventListener("click", continuarJogo);

  btnPauseReiniciar.addEventListener("click", function () {
    iniciarFase(estadoJogo.nivelIndice);
  });

  btnPauseControles.addEventListener("click", function () {
    pausarJogo("controles");
  });

  btnPauseOpcoes.addEventListener("click", function () {
    pausarJogo("opcoes");
  });

  btnPauseLobby.addEventListener("click", function () {
    estadoJogo.pontuacao = estadoJogo.pontuacaoInicioFase;
    abrirLobby(estadoJogo.nivelIndice);
  });

  btnPauseMenuPrincipal.addEventListener("click", function () {
    estadoJogo.pontuacao = estadoJogo.pontuacaoInicioFase;
    abrirMenuPrincipal("principal");
  });

  btnVoltarPauseControles.addEventListener("click", function () {
    pausarJogo("principal");
  });

  btnVoltarPauseOpcoes.addEventListener("click", function () {
    pausarJogo("principal");
  });

  btnPauseOpcaoMusica.addEventListener("click", alternarMusicaApenas);
  btnPauseOpcaoSfx.addEventListener("click", alternarSfxApenas);
  btnPauseOpcaoFullscreen.addEventListener("click", alternarTelaCheia);

  overlayPressKey.addEventListener("click", function () {
    irDiretoParaMenuAposTecla();
  });

  btnLobbyMusica.addEventListener("click", function () {
    alternarMusicaApenas();
    btnLobbyMusica.blur();
  });

  btnLobbyMenu.addEventListener("click", function () {
    btnLobbyMenu.blur();
    abrirMenuPrincipal("principal");
  });

  btnMenuCampanha.addEventListener("click", function () {
    abrirLobby(estadoJogo.maiorFaseDesbloqueada);
  });

  btnMenuControles.addEventListener("click", function () {
    abrirMenuPrincipal("controles");
  });

  btnMenuOpcoes.addEventListener("click", function () {
    abrirMenuPrincipal("opcoes");
  });

  btnMenuSair.addEventListener("click", function () {
    abrirMenuPrincipal("sair");
  });

  btnVoltarMenuControles.addEventListener("click", function () {
    abrirMenuPrincipal("principal");
  });

  btnVoltarMenuOpcoes.addEventListener("click", function () {
    abrirMenuPrincipal("principal");
  });

  btnOpcaoMusica.addEventListener("click", alternarMusicaApenas);
  btnOpcaoSfx.addEventListener("click", alternarSfxApenas);
  btnOpcaoFullscreen.addEventListener("click", alternarTelaCheia);

  btnConfirmarSair.addEventListener("click", function () {
    sairDoJogo();
    irParaTelaPressKey();
  });

  btnCancelarSair.addEventListener("click", function () {
    abrirMenuPrincipal("principal");
  });

  btnReiniciar.addEventListener("click", function () {
    iniciarFase(estadoJogo.nivelIndice);
  });

  btnVoltarLobby.addEventListener("click", function () {
    abrirLobby(estadoJogo.nivelIndice);
  });

  if (btnZeradoNovoJogo) {
    btnZeradoNovoJogo.addEventListener("click", function () {
      estadoJogo.pontuacao = 0;
      estadoJogo.pontuacaoInicioFase = 0;
      abrirLobby(0);
    });
  }

  if (btnZeradoLobby) {
    btnZeradoLobby.addEventListener("click", function () {
      abrirLobby(estadoJogo.maiorFaseDesbloqueada);
    });
  }

  if (btnZeradoMenu) {
    btnZeradoMenu.addEventListener("click", function () {
      abrirMenuPrincipal("principal");
    });
  }

  if (btnResetProgresso) {
    btnResetProgresso.addEventListener("click", function () {
      resetarProgressoLobby();
      btnResetProgresso.textContent = "✓ Save Resetado!";
      btnResetProgresso.disabled = true;
      setTimeout(function () {
        btnResetProgresso.textContent = "Resetar Save";
        btnResetProgresso.disabled = false;
      }, 1500);
    });
  }

  function obterNoLobbyPorPosicao(clickX, clickY) {
    for (let i = 0; i < NOS_LOBBY.length; i++) {
      const no = NOS_LOBBY[i];
      const distCirculo = Math.hypot(clickX - no.x, clickY - no.y);
      const dentroCartao =
        clickX >= no.x - 98 &&
        clickX <= no.x + 98 &&
        clickY >= no.y + no.raio + 8 &&
        clickY <= no.y + no.raio + 50;
      if (distCirculo <= no.raio + 14 || dentroCartao) {
        return no;
      }
    }
    return null;
  }

  canvas.addEventListener("mousemove", function (evento) {
    if (estadoJogo.status !== "lobby") {
      canvas.style.cursor = "default";
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const clickX = ((evento.clientX - rect.left) * canvas.width) / rect.width;
    const clickY = ((evento.clientY - rect.top) * canvas.height) / rect.height;
    const no = obterNoLobbyPorPosicao(clickX, clickY);
    canvas.style.cursor = no && faseEstaDesbloqueada(no.indice) ? "pointer" : "default";
  });

  canvas.addEventListener("click", function (evento) {
    if (estadoJogo.status !== "lobby") return;

    const rect = canvas.getBoundingClientRect();
    const clickX = ((evento.clientX - rect.left) * canvas.width) / rect.width;
    const clickY = ((evento.clientY - rect.top) * canvas.height) / rect.height;

    garantirAudioContexto();
    const no = obterNoLobbyPorPosicao(clickX, clickY);
    if (no) {
      posicionarSoldadoNoNoLobby(no.indice);
      tentarEntrarNaFase(no.indice);
    }
  });

  function limparTeclasAtivas() {
    Object.keys(teclas).forEach((codigoTecla) => {
      teclas[codigoTecla] = false;
    });
  }

  window.addEventListener("blur", limparTeclasAtivas);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) limparTeclasAtivas();
  });

  window.addEventListener("keydown", function (evento) {
    const codigo = evento.code;

    if (estadoJogo.status === "press_key") {
      if (["Space", "Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(codigo)) {
        evento.preventDefault();
      }
      if (!evento.repeat) {
        irDiretoParaMenuAposTecla(codigo === "Escape");
      }
      return;
    }

    if ((codigo === "Escape" || codigo === "KeyP") && !evento.repeat) {
      evento.preventDefault();
      if (estadoJogo.status === "jogando") {
        pausarJogo("principal");
      } else if (estadoJogo.status === "pausado") {
        continuarJogo();
      } else if (codigo === "Escape") {
        if (estadoJogo.status === "menu") {
          if (painelMenuOpcoes.classList.contains("oculto")) {
            abrirMenuPrincipal("principal");
          }
        } else if (estadoJogo.status === "lobby") {
          abrirMenuPrincipal("principal");
        } else if (estadoJogo.status === "derrota") {
          abrirLobby(estadoJogo.nivelIndice);
        } else if (estadoJogo.status === "zerado") {
          abrirMenuPrincipal("principal");
        }
      }
      return;
    }

    if (estadoJogo.status === "pausado") {
      evento.preventDefault();
      return;
    }

    if (estadoJogo.status === "derrota") {
      if (!evento.repeat && (codigo === "Enter" || codigo === "Space" || codigo === "KeyR")) {
        evento.preventDefault();
        iniciarFase(estadoJogo.nivelIndice);
      }
      return;
    }

    if (estadoJogo.status === "vitoria_fase") {
      if (
        !evento.repeat &&
        (codigo === "Enter" || codigo === "Space") &&
        estadoJogo.vitoriaTimerFrames <= 95
      ) {
        evento.preventDefault();
        estadoJogo.vitoriaTimerFrames = 0;
      }
      return;
    }

    if (estadoJogo.status === "menu" || estadoJogo.status === "zerado") {
      if (["Space", "Enter", "ArrowUp", "ArrowDown"].includes(codigo)) {
        evento.preventDefault();
      }
      return;
    }

    teclas[codigo] = true;

    if (codigo === "Space" && !evento.repeat && estadoJogo.status === "jogando") {
      soldado.jumpBufferFrames = 7;
    }

    if (codigo === "KeyM" && !evento.repeat) {
      alternarMusicaApenas();
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

    if (codigo === "KeyR" && !evento.repeat && estadoJogo.status === "jogando") {
      iniciarFase(estadoJogo.nivelIndice);
    }
  });

  window.addEventListener("keyup", function (evento) {
    teclas[evento.code] = false;
  });
}

// =========================================================
// 6. LÓGICA DO SOLDADO, PLATAFORMAS, ABISMOS, ITENS E DISPAROS
// =========================================================
function encontrarAbismoSobrePe(peX) {
  for (let i = 0; i < estadoJogo.abismosSemFundo.length; i++) {
    const ab = estadoJogo.abismosSemFundo[i];
    if (peX > ab.x + 8 && peX < ab.x + ab.largura - 8) {
      return ab;
    }
  }
  return null;
}

function atualizarPlataformas(dt) {
  for (let i = estadoJogo.plataformas.length - 1; i >= 0; i--) {
    const plat = estadoJogo.plataformas[i];
    if (!plat.desmoronavel) continue;

    if (plat.respawnFrames > 0) {
      plat.respawnFrames -= dt;
      if (plat.respawnFrames <= 0) {
        plat.respawnFrames = 0;
        plat.y = plat.yOriginal;
        plat.pisada = false;
        plat.desmoronando = false;
        plat.vy = 0;
        plat.tempoRestanteFrames = plat.tempoInicialFrames || FPS_ESTIMADO * 2;
      }
      continue;
    }

    if (plat.pisada && !plat.desmoronando) {
      plat.tempoRestanteFrames -= dt;
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
      plat.vy += GRAVIDADE * 0.7 * dt;
      plat.y += plat.vy * dt;
      if (plat.y > canvas.height + 60) {
        plat.respawnFrames = FPS_ESTIMADO * 2.5;
      }
    }
  }
}

function criarTextoFlutuante(x, y, texto, cor = "#ffd43b") {
  estadoJogo.textosFlutuantes.push({
    x,
    y,
    texto,
    cor,
    vy: -0.9,
    vida: 48,
    vidaMax: 48
  });
}

function atualizarItensChao(dt) {
  for (let i = estadoJogo.itensChao.length - 1; i >= 0; i--) {
    const item = estadoJogo.itensChao[i];
    item.y = item.yBase + Math.sin(estadoJogo.frameAtual * 0.09 + item.fase) * 4;

    if (colidiu(soldado, item)) {
      tocarSfxItemColetado();
      if (item.tipo === "vida") {
        if (soldado.vida < soldado.vidaMaxima) {
          soldado.vida++;
          criarTextoFlutuante(item.x + 11, item.y - 6, "+1 VIDA", "#ff6b6b");
        } else {
          adicionarPontos(150);
          criarTextoFlutuante(item.x + 11, item.y - 6, "+150 PTS", "#ffd43b");
        }
        gerarFaiscasAcertoAlvo(item.x + 11, item.y + 11, "#ff6b6b", 16);
      } else if (item.tipo === "tiro_triplo") {
        estadoJogo.tiroTriploAteFrame = estadoJogo.frameAtual + FPS_ESTIMADO * 10;
        adicionarPontos(100);
        criarTextoFlutuante(item.x + 11, item.y - 6, "TIRO 3X!", "#38bdf8");
        gerarFaiscasAcertoAlvo(item.x + 11, item.y + 11, "#38bdf8", 16);
      }
      estadoJogo.itensChao.splice(i, 1);
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

function atualizarMiraESoldado(dt) {
  if (soldado.caindoNoAbismo) {
    soldado.vy += GRAVIDADE * 1.1 * dt;
    soldado.y += soldado.vy * dt;
    soldado.x += soldado.vx * 0.4 * dt;
    if (soldado.y > canvas.height + 24) {
      soldado.vida = 0;
      finalizarDerrota(true);
    }
    return;
  }

  if (soldado.coyoteFrames > 0) soldado.coyoteFrames = Math.max(0, soldado.coyoteFrames - dt);
  if (soldado.jumpBufferFrames > 0) soldado.jumpBufferFrames = Math.max(0, soldado.jumpBufferFrames - dt);

  const esquerda = teclas["KeyA"] || teclas["ArrowLeft"];
  const direita = teclas["KeyD"] || teclas["ArrowRight"];
  const cima = teclas["KeyW"] || teclas["ArrowUp"];
  const baixo = teclas["KeyS"] || teclas["ArrowDown"];
  const segurandoTravaMira = Boolean(teclas["KeyK"] || teclas["KeyX"]);
  const pular = teclas["Space"];
  const atirar = teclas["KeyJ"] || teclas["KeyZ"];

  soldado.mirandoParado = segurandoTravaMira;

  let dirX = 0;
  let dirY = 0;
  if (esquerda && !direita) dirX = -1;
  else if (direita && !esquerda) dirX = 1;
  if (cima && !baixo) dirY = -1;
  else if (baixo && !cima) dirY = 1;

  if (segurandoTravaMira) {
    if (dirX !== 0 || dirY !== 0) {
      soldado.miraDx = dirX;
      soldado.miraDy = dirY;
      if (dirX !== 0) {
        soldado.direcao = dirX;
      }
    } else {
      soldado.miraDx = soldado.direcao;
      soldado.miraDy = 0;
    }
    soldado.olhandoCima = soldado.miraDy < 0 && soldado.miraDx === 0;
    soldado.olhandoBaixo = soldado.miraDy > 0 && soldado.miraDx === 0;
  } else {
    soldado.miraDx = soldado.direcao;
    soldado.miraDy = 0;
    soldado.olhandoCima = Boolean(cima && !soldado.deitado);
    soldado.olhandoBaixo = Boolean(!soldado.noChao && !soldado.deitado && baixo && !cima);
  }

  let desceuDaPlataforma = false;
  if (
    (pular || soldado.jumpBufferFrames > 0) &&
    baixo &&
    !segurandoTravaMira &&
    soldado.noChao &&
    soldado.plataformaAtual
  ) {
    soldado.plataformaIgnorada = soldado.plataformaAtual;
    soldado.ignorarPlataformaAteFrame = estadoJogo.frameAtual + 20;
    soldado.noChao = false;
    soldado.coyoteFrames = 0;
    soldado.jumpBufferFrames = 0;
    soldado.plataformaAtual = null;
    soldado.vy = 2.5;
    soldado.y += 4;
    desceuDaPlataforma = true;
  }

  const querDeitar = Boolean(!segurandoTravaMira && baixo && soldado.noChao && !desceuDaPlataforma);

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

  const emRecuoDano = estadoJogo.danoSoldadoFrames > 8;
  const fatorVelocidade = soldado.deitado ? 0.55 : 1;

  if (!emRecuoDano) {
    if (segurandoTravaMira) {
      soldado.vx = 0;
    } else if (esquerda && !direita) {
      soldado.vx = -soldado.velocidade * fatorVelocidade;
      soldado.direcao = -1;
    } else if (direita && !esquerda) {
      soldado.vx = soldado.velocidade * fatorVelocidade;
      soldado.direcao = 1;
    } else {
      soldado.vx *= Math.pow(0.6, dt);
      if (Math.abs(soldado.vx) < 0.15) {
        soldado.vx = 0;
      }
    }
  }

  if (
    !desceuDaPlataforma &&
    (pular || soldado.jumpBufferFrames > 0) &&
    (soldado.noChao || soldado.coyoteFrames > 0) &&
    !soldado.deitado &&
    !(baixo && soldado.plataformaAtual && !segurandoTravaMira)
  ) {
    soldado.vy = soldado.forcaPulo;
    soldado.noChao = false;
    soldado.coyoteFrames = 0;
    soldado.jumpBufferFrames = 0;
    soldado.plataformaAtual = null;
    tocarSfxPulo();
  }

  const xAnterior = soldado.x;
  const yAnterior = soldado.y;
  soldado.x += soldado.vx * dt;

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

  soldado.vy += GRAVIDADE * dt;
  soldado.y += soldado.vy * dt;

  const configNivel = NIVEIS[estadoJogo.nivelIndice];
  if (soldado.x < estadoJogo.cameraX) {
    soldado.x = estadoJogo.cameraX;
  }
  if (soldado.x + soldado.largura > configNivel.distanciaMeta) {
    soldado.x = configNivel.distanciaMeta - soldado.largura;
  }

  if (
    soldado.plataformaIgnorada &&
    (estadoJogo.frameAtual >= soldado.ignorarPlataformaAteFrame ||
      soldado.y > soldado.plataformaIgnorada.y + soldado.plataformaIgnorada.altura)
  ) {
    soldado.plataformaIgnorada = null;
  }

  const estavaNoChao = soldado.noChao;
  soldado.noChao = false;
  soldado.plataformaAtual = null;

  for (let i = 0; i < estadoJogo.plataformas.length; i++) {
    const plat = estadoJogo.plataformas[i];
    if (plat.desmoronando || plat.respawnFrames > 0 || plat === soldado.plataformaIgnorada) continue;

    const dentroX = soldado.x + soldado.largura > plat.x && soldado.x < plat.x + plat.largura;
    const cruzouTopo =
      yAnterior + soldado.alturaAtual <= plat.y + 6 &&
      soldado.y + soldado.alturaAtual >= plat.y;

    if (soldado.vy >= 0 && dentroX && cruzouTopo) {
      soldado.y = plat.y - soldado.alturaAtual;
      soldado.vy = 0;
      soldado.noChao = true;
      soldado.plataformaAtual = plat;

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
      soldado.plataformaAtual = null;
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
      soldado.plataformaAtual = null;
    } else if (
      soldado.vy < 0 &&
      dentroX &&
      yAnterior >= blocoAlto.y + blocoAlto.altura - 6 &&
      soldado.y < blocoAlto.y + blocoAlto.altura
    ) {
      soldado.y = blocoAlto.y + blocoAlto.altura;
      soldado.vy = 0;
    }
  }

  const peX = soldado.x + soldado.largura / 2;
  const abismoSobrePe = encontrarAbismoSobrePe(peX);

  if (!abismoSobrePe && soldado.y + soldado.alturaAtual >= CHAO_Y) {
    soldado.y = CHAO_Y - soldado.alturaAtual;
    soldado.vy = 0;
    soldado.noChao = true;
    soldado.plataformaAtual = null;
  } else if (abismoSobrePe && soldado.y + soldado.alturaAtual >= CHAO_Y + 6) {
    soldado.caindoNoAbismo = true;
    soldado.plataformaAtual = null;
    tocarSfxDano();
    return;
  }

  if (soldado.noChao) {
    soldado.olhandoBaixo = false;
    soldado.coyoteFrames = 6;
  } else if (estavaNoChao && soldado.vy >= 0) {
    soldado.coyoteFrames = 6;
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

  if (configNivel.numero < NIVEIS.length && soldado.x + soldado.largura >= configNivel.distanciaMeta - 20) {
    adicionarPontos(200);
    concluirFaseComVitoria(estadoJogo.nivelIndice);
  }
}

function emitirProjetil(origemX, origemY, anguloBase, velocidadeTiro, tiroEspecial = false) {
  const offsets = tiroEspecial ? [-0.14, 0, 0.14] : [0];
  for (let i = 0; i < offsets.length; i++) {
    const angulo = anguloBase + offsets[i];
    estadoJogo.tirosJogador.push({
      x: origemX - 7,
      y: origemY - 3,
      largura: 14,
      altura: 6,
      vx: Math.cos(angulo) * velocidadeTiro,
      vy: Math.sin(angulo) * velocidadeTiro,
      angulo: angulo,
      dano: 1,
      especial: tiroEspecial
    });
  }
}

function dispararTiroSoldado() {
  const velocidadeTiro = 10;
  const tiroEspecial = estadoJogo.frameAtual < estadoJogo.tiroTriploAteFrame;
  tocarSfxTiro();

  if (soldado.mirandoParado) {
    const dx = soldado.miraDx;
    const dy = soldado.deitado && soldado.miraDy > 0 ? 0 : soldado.miraDy;
    const angulo = Math.atan2(dy, dx === 0 && dy === 0 ? soldado.direcao : dx);
    const origemX = soldado.x + soldado.largura / 2 + Math.cos(angulo) * 16;
    const origemY = soldado.y + soldado.alturaAtual * 0.45 + Math.sin(angulo) * 16;
    emitirProjetil(origemX, origemY, angulo, velocidadeTiro, tiroEspecial);
    return;
  }

  if (soldado.olhandoCima) {
    emitirProjetil(soldado.x + soldado.largura / 2, soldado.y - 6, -Math.PI / 2, velocidadeTiro, tiroEspecial);
  } else if (soldado.olhandoBaixo) {
    emitirProjetil(soldado.x + soldado.largura / 2, soldado.y + soldado.alturaAtual + 4, Math.PI / 2, velocidadeTiro, tiroEspecial);
  } else if (soldado.deitado) {
    const saidaX = soldado.direcao === 1 ? soldado.x + soldado.largura : soldado.x - 6;
    const saidaY = soldado.y + 12;
    const angulo = soldado.direcao === 1 ? 0 : Math.PI;
    emitirProjetil(saidaX, saidaY, angulo, velocidadeTiro, tiroEspecial);
  } else {
    const saidaX = soldado.direcao === 1 ? soldado.x + soldado.largura : soldado.x - 6;
    const saidaY = soldado.y + 23;
    const angulo = soldado.direcao === 1 ? 0 : Math.PI;
    emitirProjetil(saidaX, saidaY, angulo, velocidadeTiro, tiroEspecial);
  }
}

// =========================================================
// 7. INIMIGOS, BURACOS, CAMINHO SUBTERRÂNEO EM "U" E BOSS
// =========================================================
function encontrarObstaculoAFrente(inimigo, dir) {
  const proximoX = dir === 1 ? inimigo.x + inimigo.largura + 14 : inimigo.x - 28;
  const caixaFrente = {
    x: proximoX,
    y: inimigo.y + inimigo.altura - 26,
    largura: 28,
    altura: 26
  };

  for (let i = 0; i < estadoJogo.obstaculos.length; i++) {
    if (colidiu(caixaFrente, estadoJogo.obstaculos[i])) {
      return estadoJogo.obstaculos[i];
    }
  }
  return null;
}

function obterSuperficieApoioRastejador(inimigo, yAnterior, apenasApoioAtual = false) {
  const baseAtual = inimigo.y + inimigo.altura;
  const baseAnterior = yAnterior + inimigo.altura;
  const margemX = 6;

  for (let i = 0; i < estadoJogo.plataformas.length; i++) {
    const plat = estadoJogo.plataformas[i];
    if (plat.desmoronando || plat.respawnFrames > 0) continue;

    const sobreX =
      inimigo.x + inimigo.largura - margemX > plat.x &&
      inimigo.x + margemX < plat.x + plat.largura;

    if (!sobreX) continue;

    if (apenasApoioAtual) {
      if (Math.abs(baseAtual - plat.y) <= 4) {
        return { y: plat.y, tipo: "plataforma", alvo: plat };
      }
    } else if (inimigo.vy >= 0 && baseAnterior <= plat.y + 8 && baseAtual >= plat.y) {
      return { y: plat.y, tipo: "plataforma", alvo: plat };
    }
  }

  for (let i = 0; i < estadoJogo.obstaculos.length; i++) {
    const obs = estadoJogo.obstaculos[i];
    const sobreX =
      inimigo.x + inimigo.largura - margemX > obs.x &&
      inimigo.x + margemX < obs.x + obs.largura;

    if (!sobreX) continue;

    if (apenasApoioAtual) {
      if (Math.abs(baseAtual - obs.y) <= 4) {
        return { y: obs.y, tipo: "obstaculo", alvo: obs };
      }
    } else if (inimigo.vy >= 0 && baseAnterior <= obs.y + 10 && baseAtual >= obs.y) {
      return { y: obs.y, tipo: "obstaculo", alvo: obs };
    }
  }

  const peX = inimigo.x + inimigo.largura / 2;
  const sobreAbismo = encontrarAbismoSobrePe(peX);
  if (!sobreAbismo) {
    if (apenasApoioAtual) {
      if (Math.abs(baseAtual - CHAO_Y) <= 4) {
        return { y: CHAO_Y, tipo: "chao", alvo: null };
      }
    } else if (inimigo.vy >= 0 && baseAtual >= CHAO_Y) {
      return { y: CHAO_Y, tipo: "chao", alvo: null };
    }
  }

  return null;
}

function rastejadorAtingiriaAbismo(proximoX, largura, dir, larguraMaximaPulavel = 0) {
  const bordaFrente = dir === 1 ? proximoX + largura + 4 : proximoX - 4;
  for (let i = 0; i < estadoJogo.abismosSemFundo.length; i++) {
    const ab = estadoJogo.abismosSemFundo[i];
    if (bordaFrente > ab.x && bordaFrente < ab.x + ab.largura) {
      if (larguraMaximaPulavel > 0 && ab.largura <= larguraMaximaPulavel) {
        return { atingiria: true, pulavel: true, abismo: ab };
      }
      return { atingiria: true, pulavel: false, abismo: ab };
    }
  }
  return { atingiria: false, pulavel: false, abismo: null };
}

function criarBuracoNoSolo(xPos, larguraCorpo, fechandoDesdeInicio = false, duracaoFrames = 140) {
  const id = Math.floor(estadoJogo.frameAtual * 1000 + Math.random() * 999);
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
  const id = Math.floor(estadoJogo.frameAtual * 1000 + Math.random() * 999);
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

function atualizarCaminhosSubterraneos(dt) {
  for (let i = estadoJogo.caminhosSubterraneos.length - 1; i >= 0; i--) {
    const cam = estadoJogo.caminhosSubterraneos[i];
    if (!cam.ativo) {
      cam.vida -= dt;
      if (cam.vida <= 0) {
        estadoJogo.caminhosSubterraneos.splice(i, 1);
      }
    }
  }
}

function atualizarBuracosChao(dt) {
  for (let i = estadoJogo.buracosChao.length - 1; i >= 0; i--) {
    const buraco = estadoJogo.buracosChao[i];
    if (!buraco.fechando) continue;

    buraco.vida -= dt;
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
  const dir = inimigo.direcaoOlhar || -1;
  const xEntrada = obsAFrente
    ? dir === 1
      ? obsAFrente.x - 14
      : obsAFrente.x + obsAFrente.largura + 14
    : inimigo.x + inimigo.largura / 2 + dir * 24;
  const xSaida = obsAFrente
    ? dir === 1
      ? obsAFrente.x + obsAFrente.largura + 18
      : obsAFrente.x - 18
    : xEntrada + dir * 72;

  inimigo.xEntradaSub = xEntrada;
  inimigo.xSaidaSub = xSaida;
  inimigo.buracoEntradaId = criarBuracoNoSolo(xEntrada - 14, 28, true, 140);
  inimigo.caminhoId = criarCaminhoSubterraneo(xEntrada, xSaida, dir, 28);
}

function cuspirAcidoEmDirecaoAoSoldado(voador) {
  const origemX = voador.x + voador.largura / 2;
  const origemY = voador.y + voador.altura - 2;
  const alvoX = soldado.x + soldado.largura / 2;
  const alvoY = soldado.y + soldado.alturaAtual * 0.45;

  const dx = alvoX - origemX;
  const dy = alvoY - origemY;
  const dist = Math.max(1, Math.hypot(dx, dy));
  const velocidadeAcido = 5.4;

  estadoJogo.tirosInimigos.push({
    tipo: "acido",
    x: origemX - 6,
    y: origemY - 6,
    largura: 12,
    altura: 12,
    vx: (dx / dist) * velocidadeAcido,
    vy: (dy / dist) * velocidadeAcido
  });
}

function atualizarInimigos(dt) {
  const configNivel = NIVEIS[estadoJogo.nivelIndice];
  const centroSoldadoX = soldado.x + soldado.largura / 2;
  const centroSoldadoY = soldado.y + soldado.alturaAtual / 2;

  for (let i = estadoJogo.inimigos.length - 1; i >= 0; i--) {
    const inimigo = estadoJogo.inimigos[i];
    if (inimigo.danoFrames > 0) {
      inimigo.danoFrames = Math.max(0, inimigo.danoFrames - dt);
    }

    if (inimigo.tipo === "rastejador") {
      const centroInimigoX = inimigo.x + inimigo.largura / 2;
      const distanciaX = centroSoldadoX - centroInimigoX;
      const distanciaAbs = Math.abs(distanciaX);
      const ehAzul = inimigo.variante === "azul";
      const yAnteriorInimigo = inimigo.y;

      if (inimigo.cooldownPuloAzul > 0) {
        inimigo.cooldownPuloAzul = Math.max(0, inimigo.cooldownPuloAzul - dt);
      }

      if (inimigo.estado === "esperando" && distanciaAbs <= inimigo.alcanceAtaque) {
        inimigo.estado = "atacando";
      }

      if (inimigo.estado === "atacando") {
        inimigo.ocultoNaTerra = false;
        inimigo.direcaoOlhar = distanciaX >= 0 ? 1 : -1;

        const apoioAtual = obterSuperficieApoioRastejador(inimigo, yAnteriorInimigo, true);
        const noChaoPrincipal = apoioAtual && apoioAtual.tipo === "chao";

        if (apoioAtual) {
          inimigo.y = apoioAtual.y - inimigo.altura;
          inimigo.vy = 0;
        } else {
          inimigo.vy += GRAVIDADE * 0.85 * dt;
          inimigo.y += inimigo.vy * dt;
          const pouso = obterSuperficieApoioRastejador(inimigo, yAnteriorInimigo, false);
          if (pouso) {
            inimigo.y = pouso.y - inimigo.altura;
            inimigo.vy = 0;
          } else if (inimigo.y > canvas.height + 30) {
            estadoJogo.inimigos.splice(i, 1);
            continue;
          }
        }

        const estaLogoAbaixoDoSoldado =
          distanciaAbs <= 18 && soldado.y + soldado.alturaAtual <= inimigo.y + 8;
        const obsAFrente = encontrarObstaculoAFrente(inimigo, inimigo.direcaoOlhar);
        const passoX = inimigo.direcaoOlhar * inimigo.velocidadeAtaque * dt;
        const proximoX = inimigo.x + passoX;

        if (ehAzul) {
          let bloqueadoPorBordaPlataforma = false;
          if (apoioAtual && apoioAtual.tipo === "plataforma") {
            const plat = apoioAtual.alvo;
            const proximoCentroX = proximoX + inimigo.largura / 2;
            const saiuDaPlataforma =
              proximoCentroX <= plat.x + 8 || proximoCentroX >= plat.x + plat.largura - 8;
            if (saiuDaPlataforma && encontrarAbismoSobrePe(proximoCentroX)) {
              bloqueadoPorBordaPlataforma = true;
            }
          }

          const infoAbismo = noChaoPrincipal
            ? rastejadorAtingiriaAbismo(proximoX, inimigo.largura, inimigo.direcaoOlhar, 115)
            : { atingiria: false, pulavel: false, abismo: null };

          const devePularObstaculo = Boolean(apoioAtual && obsAFrente && !estaLogoAbaixoDoSoldado);
          const devePularBuracoPequeno = Boolean(
            apoioAtual && infoAbismo.atingiria && infoAbismo.pulavel
          );

          if (
            inimigo.cooldownPuloAzul <= 0 &&
            (devePularObstaculo || devePularBuracoPequeno)
          ) {
            inimigo.estado = "saltando_azul";
            inimigo.vx = inimigo.direcaoOlhar * Math.max(3.8, inimigo.velocidadeAtaque * 2.15);

            if (devePularObstaculo && obsAFrente) {
              const gRastejador = GRAVIDADE * 0.85;
              const impulsoCalculado = Math.sqrt(2 * gRastejador * (obsAFrente.altura + 8));
              inimigo.vy = -Math.min(9.1, Math.max(7.4, impulsoCalculado));
            } else {
              inimigo.vy = -7.5;
            }

            inimigo.cooldownPuloAzul = 38;
            inicializarRastroArcoPulo(inimigo);
            inimigo.x += inimigo.vx * dt;
            inimigo.y += inimigo.vy * dt;
            registrarPontoArcoPulo(inimigo);
          } else if (
            estaLogoAbaixoDoSoldado ||
            infoAbismo.atingiria ||
            bloqueadoPorBordaPlataforma
          ) {
            inimigo.vx = 0;
          } else {
            inimigo.vx = inimigo.direcaoOlhar * inimigo.velocidadeAtaque;
            inimigo.x = proximoX;
          }
        } else {
          const infoAbismo = noChaoPrincipal
            ? rastejadorAtingiriaAbismo(proximoX, inimigo.largura, inimigo.direcaoOlhar, 0)
            : { atingiria: false, pulavel: false, abismo: null };

          if (noChaoPrincipal && obsAFrente && !estaLogoAbaixoDoSoldado) {
            const dirObs = inimigo.direcaoOlhar || -1;
            const xEntradaAlvo = dirObs === 1 ? obsAFrente.x - 14 : obsAFrente.x + obsAFrente.largura + 14;
            const cabecaAtual = obterPosicaoCabecaRastejador(inimigo);
            const tempoArco = (2 * 8.6) / (GRAVIDADE * 0.85);
            const vxCalculado = Math.max(-2.2, Math.min(2.2, (xEntradaAlvo - cabecaAtual.x) / tempoArco));

            inimigo.estado = "saltando_mergulho";
            inimigo.obstaculoAlvo = obsAFrente;
            inimigo.xEntradaSub = xEntradaAlvo;
            inimigo.ocultoNaTerra = false;
            inimigo.vx = vxCalculado;
            inimigo.vy = -8.6;
            inicializarRastroArcoPulo(inimigo);
            inimigo.x += inimigo.vx * dt;
            inimigo.y += inimigo.vy * dt;
            registrarPontoArcoPulo(inimigo);
          } else if (estaLogoAbaixoDoSoldado || infoAbismo.atingiria) {
            inimigo.vx = 0;
          } else {
            inimigo.vx = inimigo.direcaoOlhar * inimigo.velocidadeAtaque;
            inimigo.x = proximoX;
          }
        }
      } else if (inimigo.estado === "saltando_azul") {
        inimigo.ocultoNaTerra = false;
        inimigo.vy += GRAVIDADE * 0.85 * dt;
        inimigo.x += inimigo.vx * dt;
        inimigo.y += inimigo.vy * dt;
        registrarPontoArcoPulo(inimigo);

        const pouso = obterSuperficieApoioRastejador(inimigo, yAnteriorInimigo, false);
        if (pouso) {
          inimigo.y = pouso.y - inimigo.altura;
          inimigo.vy = 0;
          inimigo.vx = 0;
          inimigo.rastroPulo = [];
          inimigo.estado = "atacando";
        } else if (inimigo.y > canvas.height + 30) {
          estadoJogo.inimigos.splice(i, 1);
          continue;
        }
      } else if (inimigo.estado === "saltando_mergulho") {
        inimigo.vy += GRAVIDADE * 0.85 * dt;
        inimigo.x += inimigo.vx * dt;
        inimigo.y += inimigo.vy * dt;
        registrarPontoArcoPulo(inimigo);

        const cabeca = obterPosicaoCabecaRastejador(inimigo);
        const dir = inimigo.direcaoOlhar || -1;
        const chegouNaEntrada =
          inimigo.xEntradaSub === undefined ||
          Math.abs(cabeca.x - inimigo.xEntradaSub) <= 18 ||
          (inimigo.vx >= 0 ? cabeca.x >= inimigo.xEntradaSub : cabeca.x <= inimigo.xEntradaSub);

        if (inimigo.vy > 0 && cabeca.y >= CHAO_Y - 2 && chegouNaEntrada) {
          if (inimigo.xEntradaSub !== undefined) {
            inimigo.x =
              inimigo.xEntradaSub - inimigo.largura / 2 - dir * 14;
          }
          inimigo.estado = "mergulhando";
          iniciarEscavacaoEntrada(inimigo);
        }
      } else if (inimigo.estado === "mergulhando") {
        const frameAntes = estadoJogo.frameAtual - dt;
        inimigo.vy += GRAVIDADE * 0.85 * dt;
        inimigo.x += inimigo.vx * dt;
        inimigo.y += inimigo.vy * dt;
        registrarPontoArcoPulo(inimigo);

        if (inimigo.y >= CHAO_Y + 6) {
          inimigo.estado = "subterraneo";
        }

        if (Math.floor(frameAntes / 2) !== Math.floor(estadoJogo.frameAtual / 2)) {
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
        const frameAntes = estadoJogo.frameAtual - dt;
        inimigo.ocultoNaTerra = true;
        const caminho = estadoJogo.caminhosSubterraneos.find((c) => c.id === inimigo.caminhoId);

        if (caminho) {
          const distanciaHoriz = Math.max(40, Math.abs(caminho.xSaida - caminho.xEntrada));
          const passoT = ((inimigo.velocidadeAtaque * 1.35) / distanciaHoriz) * dt;
          caminho.progressoU = Math.min(1, caminho.progressoU + passoT);

          const pontoU = calcularPontoCurvaU(caminho, caminho.progressoU);
          caminho.xAtual = pontoU.x;
          inimigo.x = pontoU.x - inimigo.largura / 2;
          inimigo.y = pontoU.y;

          if (Math.floor(frameAntes / 5) !== Math.floor(estadoJogo.frameAtual / 5)) {
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
            criarBuracoNoSolo(xSaida - 14, 28, true, 140);

            inimigo.ocultoNaTerra = false;
            inimigo.estado = "saindo_terra";
            inimigo.y = CHAO_Y - 6;
            inimigo.vy = -8.5;
            inimigo.obstaculoAlvo = null;
            inimigo.buracoEntradaId = null;
            inimigo.caminhoId = null;
            inimigo.xEntradaSub = undefined;
            inimigo.xSaidaSub = undefined;
            inicializarRastroArcoPulo(inimigo);

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
          inimigo.xEntradaSub = undefined;
          inimigo.xSaidaSub = undefined;
          inimigo.estado = "atacando";
        }
      } else if (inimigo.estado === "saindo_terra") {
        inimigo.ocultoNaTerra = false;
        inimigo.x += inimigo.direcaoOlhar * (inimigo.velocidadeAtaque * 0.9) * dt;
        inimigo.vy += GRAVIDADE * 0.85 * dt;
        inimigo.y += inimigo.vy * dt;
        registrarPontoArcoPulo(inimigo);

        const pouso = obterSuperficieApoioRastejador(inimigo, yAnteriorInimigo, false);
        if (pouso) {
          inimigo.y = pouso.y - inimigo.altura;
          inimigo.vy = 0;
          inimigo.rastroPulo = [];
          inimigo.estado = "atacando";
        } else if (inimigo.y > canvas.height + 30) {
          estadoJogo.inimigos.splice(i, 1);
          continue;
        }
      } else {
        inimigo.ocultoNaTerra = false;
        inimigo.vx = 0;
        inimigo.vy = 0;
        inimigo.rastroPulo = [];
        inimigo.direcaoOlhar = distanciaX >= 0 ? 1 : -1;
        const apoioEspera = obterSuperficieApoioRastejador(inimigo, yAnteriorInimigo, true);
        if (apoioEspera) {
          inimigo.y = apoioEspera.y - inimigo.altura;
        }
      }
    } else if (inimigo.tipo === "voador_acido") {
      if (inimigo.indoParaPosicaoBoss) {
        const dx = inimigo.destinoX - inimigo.x;
        const dy = inimigo.destinoY - inimigo.y;
        const dist = Math.hypot(dx, dy);

        if (dist <= 6) {
          inimigo.x = inimigo.destinoX;
          inimigo.y = inimigo.destinoY;
          inimigo.xAncora = inimigo.destinoX;
          inimigo.yBase = inimigo.destinoY;
          inimigo.indoParaPosicaoBoss = false;
          inimigo.ativoPatrulha = true;
          inimigo.direcaoVoo = 1;
          inimigo.ultimoAcidoFrame = estadoJogo.frameAtual - inimigo.cadenciaAcido + 45;
        } else {
          const velDeslocamento = 4.6 * dt;
          inimigo.x += (dx / dist) * velDeslocamento;
          inimigo.y += (dy / dist) * velDeslocamento;
          inimigo.direcaoVoo = dx < 0 ? -1 : 1;
        }
      } else {
        const distSoldado = Math.hypot(
          centroSoldadoX - (inimigo.x + inimigo.largura / 2),
          centroSoldadoY - (inimigo.y + inimigo.altura / 2)
        );

        if (!inimigo.ativoPatrulha && distSoldado <= inimigo.raioDeteccao) {
          inimigo.ativoPatrulha = true;
          inimigo.direcaoVoo = centroSoldadoX < inimigo.x + inimigo.largura / 2 ? -1 : 1;
          inimigo.ultimoAcidoFrame = estadoJogo.frameAtual - inimigo.cadenciaAcido + 35;
        }

        if (inimigo.ativoPatrulha) {
          const velPatrulha = 1.9 * dt;
          inimigo.x += inimigo.direcaoVoo * velPatrulha;

          if (inimigo.x <= inimigo.xAncora - inimigo.amplitudePatrulha) {
            inimigo.x = inimigo.xAncora - inimigo.amplitudePatrulha;
            inimigo.direcaoVoo = 1;
          } else if (inimigo.x >= inimigo.xAncora + inimigo.amplitudePatrulha) {
            inimigo.x = inimigo.xAncora + inimigo.amplitudePatrulha;
            inimigo.direcaoVoo = -1;
          }

          inimigo.y = inimigo.yBase + Math.sin(estadoJogo.frameAtual * 0.07 + inimigo.faseAsa) * 14;

          if (estadoJogo.frameAtual - inimigo.ultimoAcidoFrame >= inimigo.cadenciaAcido) {
            cuspirAcidoEmDirecaoAoSoldado(inimigo);
            inimigo.ultimoAcidoFrame = estadoJogo.frameAtual;
          }
        } else {
          inimigo.y = inimigo.yBase + Math.sin(estadoJogo.frameAtual * 0.04 + inimigo.faseAsa) * 4;
          inimigo.direcaoVoo = centroSoldadoX < inimigo.x + inimigo.largura / 2 ? -1 : 1;
        }
      }
    }

    if (
      !inimigo.ocultoNaTerra &&
      inimigo.estado !== "mergulhando" &&
      colidiu(soldado, inimigo)
    ) {
      const direcaoImpacto =
        soldado.x + soldado.largura / 2 < inimigo.x + inimigo.largura / 2 ? -1 : 1;
      aplicarDanoSoldado(1, direcaoImpacto);
    }

    const foraEsquerda = inimigo.x + inimigo.largura < estadoJogo.cameraX - 180;
    const foraLimiteMapa = inimigo.x > configNivel.distanciaMeta + 240;
    if (foraEsquerda || foraLimiteMapa) {
      if (inimigo.caminhoId) {
        const cam = estadoJogo.caminhosSubterraneos.find((c) => c.id === inimigo.caminhoId);
        if (cam) cam.ativo = false;
      }
      estadoJogo.inimigos.splice(i, 1);
    }
  }
}

function invocarVoadoresDoBoss(boss) {
  const voadoresAtivos = estadoJogo.inimigos.filter((e) => e.tipo === "voador_acido");
  const temEsquerda = voadoresAtivos.some((v) => v.slotBoss === "esquerda");
  const temDireita = voadoresAtivos.some((v) => v.slotBoss === "direita");

  const destinos = [];
  if (!temEsquerda) {
    destinos.push({ slot: "esquerda", destinoX: 165, destinoY: 108, amplitude: 95 });
  }
  if (!temDireita) {
    destinos.push({ slot: "direita", destinoX: 565, destinoY: 102, amplitude: 115 });
  }

  for (let i = 0; i < destinos.length; i++) {
    const cfg = destinos[i];
    const origemX = boss.x + boss.largura / 2 + boss.direcaoOlhar * 18;
    const origemY = boss.y + 16;

    const voador = criarVoadorAcido(
      cfg.destinoX,
      cfg.destinoY,
      9999,
      cfg.amplitude,
      estadoJogo.frameAtual * 0.1 + i * 1.7
    );

    voador.x = origemX;
    voador.y = origemY;
    voador.slotBoss = cfg.slot;
    voador.indoParaPosicaoBoss = true;
    voador.destinoX = cfg.destinoX;
    voador.destinoY = cfg.destinoY;
    voador.ativoPatrulha = false;
    voador.direcaoVoo = boss.direcaoOlhar;

    estadoJogo.inimigos.push(voador);

    for (let p = 0; p < 10; p++) {
      estadoJogo.particulasDano.push({
        x: origemX,
        y: origemY,
        vx: (Math.random() - 0.5) * 4.5,
        vy: -2 - Math.random() * 3.5,
        vida: 18 + Math.floor(Math.random() * 10),
        tamanho: 3 + Math.random() * 3,
        cor: p % 2 === 0 ? "#94d82d" : "#ff6b6b"
      });
    }
  }
}

function invocarRastejadoresDoBoss(boss) {
  const dir = boss.direcaoOlhar;
  const pontoImpactoX = dir === -1 ? boss.x - 18 : boss.x + boss.largura + 18;

  estadoJogo.efeitosImpacto.push({
    x: pontoImpactoX,
    y: CHAO_Y - 4,
    raioInicial: 8,
    raioMax: 48,
    vida: 16,
    vidaMax: 16,
    cor: "#ff922b"
  });

  for (let p = 0; p < 18; p++) {
    estadoJogo.particulasDano.push({
      x: pontoImpactoX + (Math.random() - 0.5) * 30,
      y: CHAO_Y - 2,
      vx: dir * (1.5 + Math.random() * 4.5),
      vy: -2.2 - Math.random() * 3.8,
      vida: 18 + Math.floor(Math.random() * 12),
      tamanho: 3 + Math.random() * 3.5,
      cor: p % 2 === 0 ? "#8c6239" : "#d9480f"
    });
  }

  for (let k = 0; k < 3; k++) {
    const spawnX = Math.max(40, Math.min(820, pontoImpactoX + dir * (k * 44)));
    const variante = k === 1 ? "azul" : "normal";
    const rastejador = criarRastejador(
      spawnX,
      9999,
      1.75 + k * 0.12,
      estadoJogo.frameAtual + k,
      variante,
      CHAO_Y
    );

    rastejador.estado = "atacando";
    rastejador.direcaoOlhar = dir;
    rastejador.vy = -3.8 - k * 0.7;
    rastejador.y = CHAO_Y - rastejador.altura - 6;

    estadoJogo.inimigos.push(rastejador);
  }
}

function atualizarBoss(dt) {
  const boss = estadoJogo.boss;
  if (!boss) return;

  const modoFuria = boss.vida <= boss.vidaMaxima * 0.5;

  if (boss.danoFrames > 0) boss.danoFrames = Math.max(0, boss.danoFrames - dt);
  if (boss.tremorChaoFrames > 0) boss.tremorChaoFrames = Math.max(0, boss.tremorChaoFrames - dt);

  for (let i = boss.risadasFlutuantes.length - 1; i >= 0; i--) {
    const r = boss.risadasFlutuantes[i];
    r.x += r.vx * dt;
    r.y += r.vy * dt;
    r.vida -= dt;
    if (r.vida <= 0) {
      boss.risadasFlutuantes.splice(i, 1);
    }
  }

  if (boss.estado === "parado") {
    boss.escalaX += (1 - boss.escalaX) * 0.25 * dt;
    boss.escalaY += (1 - boss.escalaY) * 0.25 * dt;
    boss.timerEstado -= dt * (modoFuria ? 1.35 : 1);

    if (boss.timerEstado <= 0) {
      const voadoresVivos = estadoJogo.inimigos.filter((e) => e.tipo === "voador_acido").length;
      const rastejadoresVivos = estadoJogo.inimigos.filter((e) => e.tipo === "rastejador").length;

      const devePularDeLado =
        boss.acoesDesdeUltimoPulo >= 3 ||
        (boss.acoesDesdeUltimoPulo >= 2 && Math.random() < 0.45);

      if (devePularDeLado) {
        boss.estado = "agachando";
        boss.frameAcao = 0;
        boss.invocouNaAcao = false;
        boss.acoesDesdeUltimoPulo = 0;
        boss.xDestinoPulo = boss.lado === "direita" ? 45 : 715;
      } else {
        const sequencia = ["rindo", "olhando_cima", "socando_chao"];
        let proximaAcao = sequencia[boss.indiceCicloAtaque % sequencia.length];
        boss.indiceCicloAtaque++;
        boss.acoesDesdeUltimoPulo++;

        if (proximaAcao === "olhando_cima" && voadoresVivos >= 2) {
          proximaAcao = rastejadoresVivos < 4 ? "socando_chao" : "rindo";
        } else if (proximaAcao === "socando_chao" && rastejadoresVivos >= 4) {
          proximaAcao = voadoresVivos < 2 ? "olhando_cima" : "rindo";
        }

        boss.estado = proximaAcao;
        boss.frameAcao = 0;
        boss.invocouNaAcao = false;

        if (proximaAcao === "rindo") {
          tocarSfxRisadaBoss();
        }
      }
    }
  } else if (boss.estado === "agachando") {
    const frameAcaoAntes = boss.frameAcao;
    boss.frameAcao += dt;
    const progressoAgacho = Math.min(1, boss.frameAcao / 38);
    boss.escalaX = 1 + Math.sin(progressoAgacho * (Math.PI / 2)) * 0.18;
    boss.escalaY = 1 - Math.sin(progressoAgacho * (Math.PI / 2)) * 0.32;

    if (Math.floor(frameAcaoAntes / 6) !== Math.floor(boss.frameAcao / 6)) {
      estadoJogo.particulasDano.push({
        x: boss.x + boss.largura / 2 + (Math.random() - 0.5) * 90,
        y: CHAO_Y - 2,
        vx: (Math.random() - 0.5) * 2.5,
        vy: -1.2 - Math.random() * 1.6,
        vida: 14,
        tamanho: 3,
        cor: "#adb5bd"
      });
    }

    if (boss.frameAcao >= 38) {
      boss.estado = "pulando_lado";
      boss.frameAcao = 0;
      boss.xOrigemPulo = boss.x;
      boss.xDestinoPulo = boss.lado === "direita" ? 45 : 715;
      boss.escalaX = 0.88;
      boss.escalaY = 1.15;
      tocarSfxPulo();
    }
  } else if (boss.estado === "pulando_lado") {
    boss.frameAcao += dt;
    const duracaoPulo = 48;
    const t = Math.min(1, boss.frameAcao / duracaoPulo);
    const arcoVertical = Math.sin(Math.PI * t);

    boss.x = boss.xOrigemPulo + (boss.xDestinoPulo - boss.xOrigemPulo) * t;
    boss.y = CHAO_Y - boss.altura - arcoVertical * 195;

    boss.escalaX = 1 - arcoVertical * 0.12;
    boss.escalaY = 1 + arcoVertical * 0.14;

    if (boss.frameAcao >= duracaoPulo / 2) {
      boss.direcaoOlhar = boss.xDestinoPulo < 400 ? 1 : -1;
    }

    if (boss.frameAcao >= duracaoPulo) {
      boss.x = boss.xDestinoPulo;
      boss.y = CHAO_Y - boss.altura;
      boss.lado = boss.xDestinoPulo < 400 ? "esquerda" : "direita";
      boss.direcaoOlhar = boss.lado === "esquerda" ? 1 : -1;
      boss.escalaX = 1.16;
      boss.escalaY = 0.82;
      boss.tremorChaoFrames = 14;
      tocarSfxSocoChaoBoss();

      const centroPousoX = boss.x + boss.largura / 2;
      estadoJogo.efeitosImpacto.push({
        x: centroPousoX,
        y: CHAO_Y - 4,
        raioInicial: 14,
        raioMax: 78,
        vida: 18,
        vidaMax: 18,
        cor: "#ffd43b"
      });

      boss.estado = "parado";
      boss.timerEstado = 55;
    }
  } else if (boss.estado === "rindo") {
    const frameAcaoAntes = boss.frameAcao;
    boss.frameAcao += dt;

    if (
      Math.floor(frameAcaoAntes / 18) !== Math.floor(boss.frameAcao / 18) &&
      boss.risadasFlutuantes.length < 6
    ) {
      boss.risadasFlutuantes.push({
        texto: modoFuria ? "GRRR!" : "HA!",
        x: boss.x + boss.largura / 2 + boss.direcaoOlhar * 45 + (Math.random() - 0.5) * 32,
        y: boss.y + 10,
        vx: boss.direcaoOlhar * (0.7 + Math.random() * 0.6),
        vy: -1.3,
        vida: 36,
        vidaMax: 36
      });
    }

    if (boss.frameAcao >= 96) {
      boss.estado = "parado";
      boss.timerEstado = 75;
    }
  } else if (boss.estado === "olhando_cima") {
    boss.frameAcao += dt;

    if (boss.frameAcao >= 42 && !boss.invocouNaAcao) {
      invocarVoadoresDoBoss(boss);
      boss.invocouNaAcao = true;
    }

    if (boss.frameAcao >= 90) {
      boss.estado = "parado";
      boss.timerEstado = 85;
    }
  } else if (boss.estado === "socando_chao") {
    boss.frameAcao += dt;

    if (boss.frameAcao >= 33 && !boss.invocouNaAcao) {
      boss.tremorChaoFrames = 16;
      tocarSfxSocoChaoBoss();
      invocarRastejadoresDoBoss(boss);
      boss.invocouNaAcao = true;
    }

    if (boss.frameAcao >= 88) {
      boss.estado = "parado";
      boss.timerEstado = 90;
    }
  }

  const alturaEfetivaBoss = boss.altura * (boss.escalaY || 1);
  const hitboxBoss = {
    x: boss.x,
    y: boss.y + (boss.altura - alturaEfetivaBoss),
    largura: boss.largura,
    altura: alturaEfetivaBoss
  };

  if (colidiu(soldado, hitboxBoss)) {
    const direcaoImpacto =
      soldado.x + soldado.largura / 2 < boss.x + boss.largura / 2 ? -1 : 1;
    aplicarDanoSoldado(1, direcaoImpacto);
  }
}

// =========================================================
// 8. PROJÉTEIS, PARTÍCULAS DE DANO E COLISÕES
// =========================================================
function gerarFaiscasAcertoAlvo(x, y, cor = "#ffe066", raioMax = 12) {
  estadoJogo.efeitosImpacto.push({
    x,
    y,
    raioInicial: 2,
    raioMax,
    vida: 7,
    vidaMax: 7,
    cor
  });

  for (let i = 0; i < 6; i++) {
    const ang = Math.random() * Math.PI * 2;
    const vel = 1.5 + Math.random() * 2.5;
    estadoJogo.particulasDano.push({
      x,
      y,
      vx: Math.cos(ang) * vel,
      vy: Math.sin(ang) * vel - 1,
      vida: 10 + Math.floor(Math.random() * 6),
      tamanho: 2.4,
      cor
    });
  }
}

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
  } else if (tiro.vy > 0) {
    py = bloco.y;
    normalX = 0;
    normalY = -1;
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

function atualizarProjeteis(dt) {
  for (let i = estadoJogo.tirosJogador.length - 1; i >= 0; i--) {
    const tiro = estadoJogo.tirosJogador[i];
    tiro.x += tiro.vx * dt;
    tiro.y += tiro.vy * dt;

    const obstaculoBloqueador = encontrarObstaculoBloqueadorTiro(tiro);
    if (obstaculoBloqueador) {
      criarAnimacaoBalaPocando(tiro, obstaculoBloqueador, tiro.especial ? "#38bdf8" : "#ffd43b");
      estadoJogo.tirosJogador.splice(i, 1);
      continue;
    }

    if (
      tiro.vy > 0 &&
      tiro.y + tiro.altura >= CHAO_Y &&
      !encontrarAbismoSobrePe(tiro.x + tiro.largura / 2)
    ) {
      criarAnimacaoBalaPocando(tiro, { x: tiro.x, y: CHAO_Y, largura: 14, altura: 10 }, "#ffd43b");
      estadoJogo.tirosJogador.splice(i, 1);
      continue;
    }

    let acertou = false;

    for (let j = estadoJogo.inimigos.length - 1; j >= 0; j--) {
      const inimigo = estadoJogo.inimigos[j];
      if (inimigo.ocultoNaTerra || inimigo.estado === "mergulhando") continue;

      if (colidiu(tiro, inimigo)) {
        const danoBala = tiro.dano !== undefined ? tiro.dano : 1;
        inimigo.vida = Math.max(0, inimigo.vida - danoBala);
        inimigo.mostrarBarraVida = true;
        inimigo.danoFrames = 10;
        acertou = true;

        const eliminado = inimigo.vida <= 0;
        tocarSfxAcertoInimigo(eliminado);
        gerarFaiscasAcertoAlvo(
          tiro.x + tiro.largura / 2,
          tiro.y + tiro.altura / 2,
          eliminado ? "#ff6b6b" : "#ffe066",
          eliminado ? 20 : 11
        );

        if (eliminado) {
          adicionarPontos(inimigo.pontos);
          if (Math.random() < 0.22 && estadoJogo.itensChao.length < 3) {
            spawnItemChao(
              inimigo.x + inimigo.largura / 2 - 11,
              inimigo.y + inimigo.altura - 24,
              soldado.vida < soldado.vidaMaxima ? "vida" : "tiro_triplo"
            );
          }
          estadoJogo.inimigos.splice(j, 1);
        }
        break;
      }
    }

    if (!acertou && estadoJogo.boss) {
      const alturaEfetivaBoss = estadoJogo.boss.altura * (estadoJogo.boss.escalaY || 1);
      const hitboxBoss = {
        x: estadoJogo.boss.x,
        y: estadoJogo.boss.y + (estadoJogo.boss.altura - alturaEfetivaBoss),
        largura: estadoJogo.boss.largura,
        altura: alturaEfetivaBoss
      };

      if (colidiu(tiro, hitboxBoss)) {
        estadoJogo.boss.vida -= 1;
        estadoJogo.boss.danoFrames = 8;
        acertou = true;
        adicionarPontos(25);

        const bossEliminado = estadoJogo.boss.vida <= 0;
        tocarSfxAcertoInimigo(bossEliminado);
        gerarFaiscasAcertoAlvo(
          tiro.x + tiro.largura / 2,
          tiro.y + tiro.altura / 2,
          "#ff922b",
          13
        );

        if (bossEliminado) {
          adicionarPontos(1000);
          estadoJogo.tirosJogador.splice(i, 1);
          iniciarSequenciaDerrotaBoss(estadoJogo.boss);
          return;
        }
      }
    }

    const foraDaTela =
      tiro.x < estadoJogo.cameraX - 40 ||
      tiro.x > estadoJogo.cameraX + canvas.width + 40 ||
      tiro.y < -40 ||
      tiro.y > CHAO_Y + 20;

    if (acertou || foraDaTela) {
      estadoJogo.tirosJogador.splice(i, 1);
    }
  }

  for (let i = estadoJogo.tirosInimigos.length - 1; i >= 0; i--) {
    const tiro = estadoJogo.tirosInimigos[i];
    const frameAntes = estadoJogo.frameAtual - dt;
    tiro.x += tiro.vx * dt;
    tiro.y += tiro.vy * dt;

    if (
      tiro.tipo === "acido" &&
      Math.floor(frameAntes / 3) !== Math.floor(estadoJogo.frameAtual / 3)
    ) {
      estadoJogo.particulasDano.push({
        x: tiro.x + tiro.largura / 2,
        y: tiro.y + tiro.altura / 2,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -0.8 - Math.random() * 1.1,
        vida: 10,
        tamanho: 2.2,
        cor: Math.random() < 0.5 ? "#82c91e" : "#d8f5a2"
      });
    }

    const obstaculoBloqueador = encontrarObstaculoBloqueadorTiro(tiro);
    if (obstaculoBloqueador) {
      const corPoc = tiro.tipo === "acido" ? "#82c91e" : "#ff8787";
      criarAnimacaoBalaPocando(tiro, obstaculoBloqueador, corPoc);
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
      aplicarDanoSoldado(1, direcaoImpacto);
      estadoJogo.tirosInimigos.splice(i, 1);
      continue;
    }

    if (
      tiro.x < estadoJogo.cameraX - 50 ||
      tiro.x > estadoJogo.cameraX + canvas.width + 50 ||
      tiro.y > canvas.height + 10
    ) {
      estadoJogo.tirosInimigos.splice(i, 1);
    }
  }
}

function atualizarParticulasDano(dt) {
  if (estadoJogo.avisoNivelFrames > 0) {
    estadoJogo.avisoNivelFrames = Math.max(0, estadoJogo.avisoNivelFrames - dt);
  }
  if (estadoJogo.danoSoldadoFrames > 0) {
    estadoJogo.danoSoldadoFrames = Math.max(0, estadoJogo.danoSoldadoFrames - dt);
  }
  if (estadoJogo.pulsoTelaDano > 0) {
    estadoJogo.pulsoTelaDano = Math.max(0, estadoJogo.pulsoTelaDano - dt);
  }
  estadoJogo.inclinacaoDano *= Math.pow(0.82, dt);

  for (let i = estadoJogo.textosFlutuantes.length - 1; i >= 0; i--) {
    const txt = estadoJogo.textosFlutuantes[i];
    txt.y += txt.vy * dt;
    txt.vida -= dt;
    if (txt.vida <= 0) {
      estadoJogo.textosFlutuantes.splice(i, 1);
    }
  }

  for (let i = estadoJogo.efeitosImpacto.length - 1; i >= 0; i--) {
    const fx = estadoJogo.efeitosImpacto[i];
    fx.vida -= dt;
    if (fx.vida <= 0) {
      estadoJogo.efeitosImpacto.splice(i, 1);
    }
  }

  for (let i = estadoJogo.particulasDano.length - 1; i >= 0; i--) {
    const p = estadoJogo.particulasDano[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 0.25 * dt;
    p.vida -= dt;

    if (p.vida <= 0) {
      estadoJogo.particulasDano.splice(i, 1);
    }
  }
}

function aplicarDanoSoldado(dano = 1, direcaoImpacto = -1) {
  if (estadoJogo.status !== "jogando") return;
  if (estadoJogo.frameAtual < estadoJogo.invulneravelAte) return;

  tocarSfxDano();
  const coracoesPerdidos = Math.max(1, Math.min(soldado.vidaMaxima, Math.round(dano) || 1));
  soldado.vida = Math.max(0, soldado.vida - coracoesPerdidos);
  estadoJogo.invulneravelAte = estadoJogo.frameAtual + 45;
  estadoJogo.danoSoldadoFrames = 16;
  estadoJogo.pulsoTelaDano = 12;

  const dir = direcaoImpacto >= 0 ? 1 : -1;
  soldado.vx = dir * 4.2;
  if (soldado.noChao) {
    soldado.vy = -4.5;
    soldado.noChao = false;
    soldado.plataformaAtual = null;
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
    finalizarDerrota(false);
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
// 9. RENDERIZAÇÃO NO CANVAS (INCLUINDO HUD DENTRO DO CANVAS)
// =========================================================
function desenharItensChao() {
  for (let i = 0; i < estadoJogo.itensChao.length; i++) {
    const item = estadoJogo.itensChao[i];
    const cx = item.x + item.largura / 2;
    const cy = item.y + item.altura / 2;

    ctx.save();
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.strokeStyle = item.tipo === "vida" ? "#ff6b6b" : "#38bdf8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(item.x, item.y, item.largura, item.altura, 6);
    ctx.fill();
    ctx.stroke();

    if (item.tipo === "vida") {
      desenharCoracaoHud(cx, cy + 1, 13, true, 1);
    } else {
      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 11px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("3X", cx, cy);
    }
    ctx.restore();
  }
}

function desenharBarraVidaInimigo(inimigo) {
  if (!inimigo.mostrarBarraVida) return;
  const vidaMax = inimigo.vidaMaxima || 1;
  const pct = Math.max(0, Math.min(1, inimigo.vida / vidaMax));

  const larguraBarra = Math.max(32, Math.min(54, inimigo.largura));
  const alturaBarra = 5;
  const xBarra = inimigo.x + inimigo.largura / 2 - larguraBarra / 2;
  const yBarra = inimigo.y - 12;

  ctx.save();
  ctx.fillStyle = "rgba(10, 14, 20, 0.88)";
  ctx.fillRect(xBarra - 1, yBarra - 1, larguraBarra + 2, alturaBarra + 2);

  ctx.fillStyle = pct > 0.5 ? "#51cf66" : "#fa5252";
  ctx.fillRect(xBarra, yBarra, larguraBarra * pct, alturaBarra);

  ctx.strokeStyle = "#e6edf3";
  ctx.lineWidth = 1;
  ctx.strokeRect(xBarra - 1, yBarra - 1, larguraBarra + 2, alturaBarra + 2);
  ctx.restore();
}

function desenharCoracaoHud(cx, cy, tamanho, cheio, escala = 1) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(escala, escala);

  const s = tamanho / 2;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.88);
  ctx.bezierCurveTo(-s * 1.15, s * 0.12, -s * 1.15, -s * 0.78, -s * 0.48, -s * 0.78);
  ctx.bezierCurveTo(-s * 0.15, -s * 0.78, 0, -s * 0.45, 0, -s * 0.25);
  ctx.bezierCurveTo(0, -s * 0.45, s * 0.15, -s * 0.78, s * 0.48, -s * 0.78);
  ctx.bezierCurveTo(s * 1.15, -s * 0.78, s * 1.15, s * 0.12, 0, s * 0.88);
  ctx.closePath();

  if (cheio) {
    const grad = ctx.createLinearGradient(0, -s * 0.8, 0, s * 0.9);
    grad.addColorStop(0, "#ff6b6b");
    grad.addColorStop(0.55, "#f03e3e");
    grad.addColorStop(1, "#a61e1e");
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.lineWidth = 1.6;
    ctx.strokeStyle = "#2b090d";
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.beginPath();
    ctx.ellipse(-s * 0.42, -s * 0.36, s * 0.22, s * 0.13, -0.5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
    ctx.fill();
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = "rgba(148, 163, 184, 0.42)";
    ctx.stroke();
  }

  ctx.restore();
}

function desenharEstrelaPontosHud(cx, cy, raioExterno) {
  const raioInterno = raioExterno * 0.48;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const angulo = -Math.PI / 2 + (i * Math.PI) / 5;
    const r = i % 2 === 0 ? raioExterno : raioInterno;
    const px = Math.cos(angulo) * r;
    const py = Math.sin(angulo) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();

  const gradEstrela = ctx.createLinearGradient(0, -raioExterno, 0, raioExterno);
  gradEstrela.addColorStop(0, "#ffe066");
  gradEstrela.addColorStop(1, "#f08c00");
  ctx.fillStyle = gradEstrela;
  ctx.fill();

  ctx.lineWidth = 1.2;
  ctx.strokeStyle = "#3b2304";
  ctx.stroke();
  ctx.restore();
}

function desenharHudNoCanvas() {
  const pontosTexto = String(estadoJogo.pontuacao);
  const temTiroTriplo = estadoJogo.frameAtual < estadoJogo.tiroTriploAteFrame;

  ctx.save();
  ctx.font = "bold 15px Segoe UI, sans-serif";
  const larguraValorPontos = ctx.measureText(pontosTexto).width;
  ctx.font = "600 10px Segoe UI, sans-serif";
  const larguraRotuloPontos = ctx.measureText("PONTOS").width;
  const larguraBlocoPontos = Math.max(larguraValorPontos, larguraRotuloPontos);

  const xCard = 16;
  const yCard = 14;
  const alturaCard = 38;
  const larguraCoracoes = soldado.vidaMaxima * 24;
  const extraTiroTriplo = temTiroTriplo ? 56 : 0;
  const larguraCard = 16 + larguraCoracoes + 18 + 20 + larguraBlocoPontos + 18 + extraTiroTriplo;

  ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 3;

  const gradCard = ctx.createLinearGradient(xCard, yCard, xCard, yCard + alturaCard);
  gradCard.addColorStop(0, "rgba(22, 31, 45, 0.86)");
  gradCard.addColorStop(1, "rgba(12, 17, 26, 0.86)");
  ctx.fillStyle = gradCard;
  ctx.beginPath();
  ctx.roundRect(xCard, yCard, larguraCard, alturaCard, 12);
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  ctx.strokeStyle = "rgba(240, 180, 41, 0.38)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const pulsoDano =
    estadoJogo.danoSoldadoFrames > 0
      ? 1 + Math.sin(estadoJogo.danoSoldadoFrames * 0.8) * 0.14
      : 1;

  const centroY = yCard + alturaCard / 2;
  for (let i = 0; i < soldado.vidaMaxima; i++) {
    const cheio = i < soldado.vida;
    const cx = xCard + 24 + i * 24;
    desenharCoracaoHud(cx, centroY + 1, 18, cheio, cheio ? pulsoDano : 1);
  }

  const estrelaX = xCard + 16 + larguraCoracoes + 20;
  desenharEstrelaPontosHud(estrelaX, centroY, 7.5);

  const textoX = estrelaX + 14;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 9px Segoe UI, sans-serif";
  ctx.fillText("PONTOS", textoX, yCard + 14);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 15px Segoe UI, sans-serif";
  ctx.fillText(pontosTexto, textoX, yCard + 30);

  if (temTiroTriplo) {
    const segs = Math.ceil((estadoJogo.tiroTriploAteFrame - estadoJogo.frameAtual) / FPS_ESTIMADO);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 11px Segoe UI, sans-serif";
    ctx.fillText(`3X ${segs}s`, textoX + larguraBlocoPontos + 14, yCard + 23);
  }

  const configNivel = NIVEIS[estadoJogo.nivelIndice];
  if (configNivel && configNivel.numero < NIVEIS.length) {
    const progresso = Math.max(0, Math.min(1, soldado.x / Math.max(1, configNivel.distanciaMeta - 40)));
    const pct = Math.round(progresso * 100);
    const barraW = 210;
    const barraH = 26;
    const barraX = (canvas.width - barraW) / 2;
    const barraY = 16;

    ctx.fillStyle = "rgba(15, 23, 42, 0.84)";
    ctx.strokeStyle = "rgba(240, 180, 41, 0.38)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.roundRect(barraX, barraY, barraW, barraH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "bold 10px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`SETOR ${configNivel.numero} • META ${pct}%`, canvas.width / 2, barraY + 11);

    const trilhoX = barraX + 12;
    const trilhoY = barraY + 16;
    const trilhoW = barraW - 24;
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(trilhoX, trilhoY, trilhoW, 5, 3);
    ctx.fill();

    ctx.fillStyle = "#f0b429";
    ctx.beginPath();
    ctx.roundRect(trilhoX, trilhoY, Math.max(6, trilhoW * progresso), 5, 3);
    ctx.fill();
  }

  ctx.restore();
}

function desenharMapaLobbyCuphead() {
  const gradFundo = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradFundo.addColorStop(0, "#1d2a3a");
  gradFundo.addColorStop(0.55, "#2b3b2d");
  gradFundo.addColorStop(1, "#433827");
  ctx.fillStyle = gradFundo;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  ctx.beginPath();
  ctx.arc(190, 265, 115, 0, Math.PI * 2);
  ctx.arc(455, 195, 110, 0, Math.PI * 2);
  ctx.arc(725, 265, 125, 0, Math.PI * 2);
  ctx.fill();

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

    ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
    ctx.strokeStyle = desbloqueada ? "#f0b429" : "#475569";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(no.x - 98, no.y + no.raio + 10, 196, 38, 6);
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

  desenharSoldado();

  ctx.save();
  ctx.fillStyle = "rgba(15, 23, 42, 0.82)";
  ctx.strokeStyle = "#f0b429";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(18, 12, 390, 32, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f0b429";
  ctx.font = "bold 12px Segoe UI, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("LOBBY • Clique na fase ou ande (WASD/Setas) + Enter", 30, 28);

  ctx.fillStyle = "rgba(15, 23, 42, 0.82)";
  ctx.beginPath();
  ctx.roundRect(canvas.width - 255, 12, 237, 32, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 12px Segoe UI, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(
    `Pts: ${estadoJogo.pontuacao}  •  Recorde: ${estadoJogo.maiorPontuacao}`,
    canvas.width - 28,
    28
  );
  ctx.restore();

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
  const titulo = estadoJogo.vitoriaCampanhaCompleta ? "BOSS DERROTADO!" : "FASE CONCLUÍDA!";
  const subtitulo =
    proximo < NIVEIS.length
      ? `Próxima fase desbloqueada: ${NIVEIS[proximo].nome.split(" - ")[1]}`
      : "Todos os setores foram libertados! Preparando relatório final...";

  ctx.save();
  ctx.fillStyle = "rgba(11, 15, 20, 0.78)";
  ctx.fillRect(canvas.width / 2 - 260, 125, 520, 108);
  ctx.strokeStyle = "#ffd43b";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(canvas.width / 2 - 260, 125, 520, 108);

  ctx.fillStyle = "#ffd43b";
  ctx.font = "bold 26px Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(titulo, canvas.width / 2, 165);

  ctx.fillStyle = "#ffffff";
  ctx.font = "14px Segoe UI, sans-serif";
  ctx.fillText(subtitulo, canvas.width / 2, 198);

  ctx.fillStyle = "#9fb3c8";
  ctx.font = "12px Segoe UI, sans-serif";
  ctx.fillText(
    estadoJogo.vitoriaCampanhaCompleta ? "Aguarde..." : "Retornando ao mapa do lobby...",
    canvas.width / 2,
    220
  );
  ctx.restore();
}

function desenharEntradaCaverna(xBase) {
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
  ctx.quadraticCurveTo(bocaX + bocaLargura * 0.52, bocaY - 8, bocaX + bocaLargura, bocaY + 24);
  ctx.lineTo(bocaX + bocaLargura - 2, chao + 1);
  ctx.closePath();
  ctx.fill();

  const tochaX = baseX - 24;
  const tochaY = chao - 36;
  const raioLuz = 42 + oscilacaoBrilho;
  const gradLuz = ctx.createRadialGradient(tochaX, tochaY - 6, 3, tochaX + 10, tochaY, raioLuz);
  gradLuz.addColorStop(0, "rgba(255, 214, 102, 0.42)");
  gradLuz.addColorStop(0.55, "rgba(255, 132, 36, 0.16)");
  gradLuz.addColorStop(1, "rgba(255, 100, 20, 0)");

  ctx.fillStyle = gradLuz;
  ctx.beginPath();
  ctx.arc(tochaX + 10, tochaY, raioLuz, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#2b1d12";
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.moveTo(tochaX + 1, chao - 8);
  ctx.lineTo(tochaX - 2, tochaY + 2);
  ctx.stroke();

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

  const flutuaPlaca = Math.sin(estadoJogo.frameAtual * 0.1) * 3;
  const placaX = bocaX + bocaLargura / 2;
  const placaY = chao - 134 + flutuaPlaca;
  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.strokeStyle = "#51cf66";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.roundRect(placaX - 38, placaY - 11, 76, 22, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#69db7c";
  ctx.font = "bold 11px Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SAÍDA ➔", placaX, placaY);

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
    ctx.fillStyle = "#140f0a";
    ctx.beginPath();
    ctx.ellipse(centroX, CHAO_Y + 2, raioX, raioY, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function desenharChaoComAbismosSemFundo(configNivel) {
  const alturaChao = canvas.height - CHAO_Y;
  const abismosOrdenados = [...estadoJogo.abismosSemFundo].sort((a, b) => a.x - b.x);
  let cursorX = 0;

  for (let i = 0; i < abismosOrdenados.length; i++) {
    const ab = abismosOrdenados[i];
    const larguraSegmento = Math.max(0, ab.x - cursorX);
    if (larguraSegmento > 0) {
      ctx.fillStyle = configNivel.corChao;
      ctx.fillRect(cursorX, CHAO_Y, larguraSegmento, alturaChao);
      ctx.fillStyle = "#433b4a";
      ctx.fillRect(cursorX, CHAO_Y, larguraSegmento, 6);
    }

    ctx.fillStyle = "#3a3242";
    ctx.fillRect(ab.x - 4, CHAO_Y, 4, alturaChao);
    ctx.fillRect(ab.x + ab.largura, CHAO_Y, 4, alturaChao);

    cursorX = ab.x + ab.largura;
  }

  const larguraFinal = configNivel.distanciaMeta + 200 - cursorX;
  if (larguraFinal > 0) {
    ctx.fillStyle = configNivel.corChao;
    ctx.fillRect(cursorX, CHAO_Y, larguraFinal, alturaChao);
    ctx.fillStyle = "#433b4a";
    ctx.fillRect(cursorX, CHAO_Y, larguraFinal, 6);
  }
}

function desenharEstruturasQuebradas() {
  for (let i = 0; i < estadoJogo.estruturasQuebradas.length; i++) {
    const est = estadoJogo.estruturasQuebradas[i];
    const blocoAlto = obterBlocoPassagemBaixa(est);

    ctx.fillStyle = "#48443d";
    ctx.fillRect(est.x, est.y + 16, 14, est.alturaTotal - 16);
    ctx.fillRect(est.x + est.largura - 14, est.y + 28, 14, est.alturaTotal - 28);

    ctx.fillStyle = "#5a544a";
    ctx.fillRect(blocoAlto.x, blocoAlto.y, blocoAlto.largura, blocoAlto.altura);
    ctx.fillStyle = "#787064";
    ctx.fillRect(blocoAlto.x, blocoAlto.y + blocoAlto.altura - 5, blocoAlto.largura, 5);
  }
}

function desenharCenarioCaverna(configNivel) {
  const gradCeu = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradCeu.addColorStop(0, "#090c12");
  gradCeu.addColorStop(0.45, "#151b27");
  gradCeu.addColorStop(0.86, "#26212d");
  gradCeu.addColorStop(1, "#1e1a24");
  ctx.fillStyle = gradCeu;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(-estadoJogo.cameraX * 0.25, 0);
  for (let px = 190; px < configNivel.distanciaMeta; px += 460) {
    ctx.fillStyle = "rgba(15, 19, 29, 0.65)";
    ctx.beginPath();
    ctx.moveTo(px - 28, 25);
    ctx.lineTo(px + 28, 25);
    ctx.lineTo(px + 18, CHAO_Y * 0.52);
    ctx.lineTo(px + 38, canvas.height);
    ctx.lineTo(px - 38, canvas.height);
    ctx.lineTo(px - 18, CHAO_Y * 0.52);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  ctx.translate(-estadoJogo.cameraX, 0);

  desenharChaoComAbismosSemFundo(configNivel);

  for (let i = 0; i < estadoJogo.obstaculos.length; i++) {
    const obs = estadoJogo.obstaculos[i];
    ctx.fillStyle = "#2d2834";
    ctx.fillRect(obs.x, obs.y, obs.largura, obs.altura);
    ctx.fillStyle = "#4b4356";
    ctx.fillRect(obs.x + 4, obs.y, obs.largura - 8, 8);
  }

  ctx.restore();
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
  }
  ctx.restore();

  ctx.save();
  ctx.translate(-estadoJogo.cameraX, 0);

  ctx.fillStyle = configNivel.corChao;
  ctx.fillRect(0, CHAO_Y, configNivel.distanciaMeta + 200, canvas.height - CHAO_Y);
  ctx.fillStyle = "#524a3c";
  ctx.fillRect(0, CHAO_Y, configNivel.distanciaMeta + 200, 6);

  for (let i = 0; i < estadoJogo.obstaculos.length; i++) {
    const obs = estadoJogo.obstaculos[i];
    ctx.fillStyle = "#595247";
    ctx.fillRect(obs.x, obs.y, obs.largura, obs.altura);
  }

  ctx.restore();
}

function desenharPlataformas(configNivel) {
  for (let i = 0; i < estadoJogo.plataformas.length; i++) {
    const plat = estadoJogo.plataformas[i];

    if (plat.desmoronavel) {
      if (plat.respawnFrames > 0) {
        ctx.save();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = "rgba(240, 180, 41, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(plat.x, plat.yOriginal, plat.largura, plat.altura);
        ctx.restore();
        continue;
      }

      const tremor =
        plat.pisada && !plat.desmoronando
          ? Math.sin(estadoJogo.frameAtual * 1.8) * 2.8
          : 0;
      const px = plat.x + tremor;
      const tempoMax = plat.tempoInicialFrames || FPS_ESTIMADO * 2;
      const prestesACair =
        plat.pisada &&
        !plat.desmoronando &&
        plat.tempoRestanteFrames < tempoMax * 0.4 &&
        Math.floor(estadoJogo.frameAtual / 4) % 2 === 0;

      ctx.save();
      ctx.fillStyle = prestesACair
        ? "#c95d3e"
        : plat.pisada && !plat.desmoronando
        ? "#8f7153"
        : "#615b52";
      ctx.fillRect(px, plat.y, plat.largura, plat.altura);

      // Rachaduras visuais indicando plataforma instável
      ctx.strokeStyle = plat.pisada ? "#2b1d12" : "#3a352f";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(px + plat.largura * 0.28, plat.y);
      ctx.lineTo(px + plat.largura * 0.34, plat.y + plat.altura * 0.55);
      ctx.lineTo(px + plat.largura * 0.29, plat.y + plat.altura);
      ctx.moveTo(px + plat.largura * 0.68, plat.y);
      ctx.lineTo(px + plat.largura * 0.62, plat.y + plat.altura * 0.6);
      ctx.lineTo(px + plat.largura * 0.71, plat.y + plat.altura);
      ctx.stroke();

      ctx.restore();
    } else if (configNivel.numero === 1) {
      ctx.fillStyle = "#5c574f";
      ctx.fillRect(plat.x, plat.y, plat.largura, plat.altura);
    } else if (configNivel.numero === 2) {
      ctx.fillStyle = "#3b3446";
      ctx.fillRect(plat.x, plat.y, plat.largura, plat.altura);
      ctx.fillStyle = "#6c5e7c";
      ctx.fillRect(plat.x, plat.y, plat.largura, 4);
    } else {
      ctx.fillStyle = "#6c7a89";
      ctx.fillRect(plat.x, plat.y, plat.largura, plat.altura);
    }
  }
}

function desenharVoadorAcidoRealista(inimigo) {
  const emDano = inimigo.danoFrames > 0;
  const dir = inimigo.direcaoVoo || -1;
  const centroX = inimigo.x + inimigo.largura / 2;
  const centroY = inimigo.y + inimigo.altura / 2;
  const frequenciaAsa = inimigo.ativoPatrulha ? 0.28 : 0.11;
  const amplitudeAsa = inimigo.ativoPatrulha ? 15 : 6;
  const fase = estadoJogo.frameAtual * frequenciaAsa + inimigo.faseAsa;
  const batidaAsa = Math.sin(fase);
  const batidaAsaTras = Math.sin(fase - 0.65);

  ctx.save();
  ctx.translate(centroX, centroY);
  ctx.scale(dir, 1);

  // Asa traseira (segunda asa)
  const asaTrasY = batidaAsaTras * (amplitudeAsa + 1) - 6;
  ctx.fillStyle = emDano ? "#ffc9c9" : "#4e395c";
  ctx.strokeStyle = "#1b1221";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(2, -4);
  ctx.quadraticCurveTo(-8, asaTrasY - 12, -23, asaTrasY - 1);
  ctx.quadraticCurveTo(-17, asaTrasY + 8, -7, asaTrasY + 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Corpo
  ctx.fillStyle = emDano ? "#ff8787" : "#4a3354";
  ctx.strokeStyle = "#1b1221";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.ellipse(0, 1, 14, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Asa frontal
  const asaFrenteY = batidaAsa * (amplitudeAsa + 2) - 4;
  ctx.fillStyle = emDano ? "#ffffff" : "#6c537a";
  ctx.beginPath();
  ctx.moveTo(-2, -3);
  ctx.quadraticCurveTo(-13, asaFrenteY - 13, -27, asaFrenteY + 1);
  ctx.quadraticCurveTo(-21, asaFrenteY + 11, -11, asaFrenteY + 6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Olho
  ctx.fillStyle = "#d8f5a2";
  ctx.beginPath();
  ctx.arc(-10, -1, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Sinalização visual antes de cuspir ácido
  if (inimigo.ativoPatrulha) {
    const tempoDesdeUltimoTiro = estadoJogo.frameAtual - inimigo.ultimoAcidoFrame;
    const tempoRestante = inimigo.cadenciaAcido - tempoDesdeUltimoTiro;
    if (tempoRestante <= 38 && tempoRestante >= 0) {
      const carga = 1 - tempoRestante / 38;
      ctx.fillStyle = `rgba(169, 227, 75, ${0.45 + carga * 0.5})`;
      ctx.beginPath();
      ctx.arc(-15, 4, 2.5 + carga * 4.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
  desenharBarraVidaInimigo(inimigo);
}

function desenharRastejadorAlien(inimigo) {
  if (inimigo.ocultoNaTerra) return;

  const ehAzul = inimigo.variante === "azul";
  const dir = inimigo.direcaoOlhar || -1;
  const emDano = inimigo.danoFrames > 0;
  const baseY = inimigo.y + inimigo.altura;
  const centroX = inimigo.x + inimigo.largura / 2;
  const tempo = estadoJogo.frameAtual * 0.16 + inimigo.faseCobra;

  const alertaAtivo =
    inimigo.estado === "atacando" ||
    inimigo.estado === "mergulhando" ||
    inimigo.estado === "saltando_mergulho" ||
    inimigo.estado === "saindo_terra";
  const corOlho = emDano
    ? "#ffffff"
    : alertaAtivo
    ? "#ff4d4f"
    : ehAzul
    ? "#ffe066"
    : "#ddb892";

  const emAcaoDividida =
    inimigo.estado === "saltando_mergulho" ||
    inimigo.estado === "mergulhando" ||
    inimigo.estado === "saindo_terra" ||
    inimigo.estado === "saltando_azul";

  const corCorpo = emDano ? "#ffffff" : ehAzul ? "#339af0" : "#9c6644";
  const corCabeca = emDano ? "#ffffff" : ehAzul ? "#74c0fc" : "#b08968";
  const corContorno = "#18120e";

  if (emAcaoDividida && inimigo.rastroPulo && inimigo.rastroPulo.length > 1) {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let i = 0; i < inimigo.rastroPulo.length - 1; i++) {
      const p1 = inimigo.rastroPulo[i];
      const p2 = inimigo.rastroPulo[i + 1];
      const fade = 1 - i / inimigo.rastroPulo.length;

      ctx.strokeStyle = emDano
        ? `rgba(255, 255, 255, ${fade * 0.65})`
        : ehAzul
        ? `rgba(51, 154, 240, ${fade * 0.55})`
        : `rgba(156, 102, 68, ${fade * 0.55})`;
      ctx.lineWidth = Math.max(1.5, 6.5 * fade);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    const ptCabeca = obterPosicaoCabecaRastejador(inimigo);
    const ptCauda =
      inimigo.rastroPulo[Math.min(inimigo.rastroPulo.length - 1, 18)] || ptCabeca;
    const anguloMergulho = Math.atan2(
      ptCabeca.y - ptCauda.y,
      ptCabeca.x - ptCauda.x
    );

    // Segmentos + espinhos seguindo o arco
    for (let s = 3; s >= 1; s--) {
      const idxCauda = Math.min(inimigo.rastroPulo.length - 1, s * 6);
      const segPt = inimigo.rastroPulo[idxCauda] || ptCauda;
      const raioSeg = Math.max(3, 7.5 * (1 - s * 0.18));

      ctx.save();
      ctx.translate(segPt.x, segPt.y);
      ctx.rotate(anguloMergulho);

      ctx.fillStyle = corOlho;
      ctx.strokeStyle = corContorno;
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(-2, -raioSeg + 1);
      ctx.lineTo(0, -raioSeg - 5.5);
      ctx.lineTo(3, -raioSeg + 1);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = corCorpo;
      ctx.strokeStyle = corContorno;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, raioSeg, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // Cabeça avançando na frente do arco
    ctx.translate(ptCabeca.x, ptCabeca.y);
    ctx.rotate(anguloMergulho);

    ctx.fillStyle = corOlho;
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-4, -7);
    ctx.lineTo(-1, -14.5);
    ctx.lineTo(3, -7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = corCabeca;
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, 11.5, 8.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = corOlho;
    ctx.beginPath();
    ctx.arc(4, -3, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    desenharBarraVidaInimigo(inimigo);
    return;
  }

  ctx.save();
  ctx.translate(centroX, baseY);
  ctx.scale(-dir, 1);

  const cabecaX = -14;
  const cabecaY = -12 + Math.sin(tempo) * 1.5;

  for (let s = 6; s >= 1; s--) {
    const segX = cabecaX + s * 7;
    const segY = -9 + Math.sin(tempo - s * 0.85) * 2.5;
    const raio = Math.max(3.5, 9 * (1 - (s / 6) * 0.55));
    const altEspinho = Math.max(3.5, 7 * (1 - (s / 6) * 0.45));

    ctx.fillStyle = corOlho;
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(segX - 2.5, segY - raio + 1);
    ctx.lineTo(segX, segY - raio - altEspinho);
    ctx.lineTo(segX + 2.5, segY - raio + 1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = corCorpo;
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(segX, segY, raio, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.fillStyle = corOlho;
  ctx.strokeStyle = corContorno;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(cabecaX - 3, cabecaY - 7);
  ctx.lineTo(cabecaX, cabecaY - 15);
  ctx.lineTo(cabecaX + 3.5, cabecaY - 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = corCabeca;
  ctx.strokeStyle = corContorno;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(cabecaX, cabecaY, 11, 8.5, -0.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = corOlho;
  ctx.beginPath();
  ctx.arc(cabecaX - 2, cabecaY - 3, 3.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  desenharBarraVidaInimigo(inimigo);
}

function desenharSoldado() {
  const emDano = estadoJogo.danoSoldadoFrames > 0;
  const centroX = soldado.x + soldado.largura / 2;
  const baseY = soldado.y + soldado.alturaAtual;
  const andando =
    !soldado.mirandoParado &&
    !soldado.caindoNoAbismo &&
    (Math.abs(soldado.vx) > 0.1 || Math.abs(soldado.vy) > 0.1) &&
    (soldado.noChao || estadoJogo.status === "lobby");
  const cicloPasso = andando ? Math.sin(estadoJogo.frameAtual * 0.35) : 0;
  const atirouAgora = estadoJogo.frameAtual - estadoJogo.ultimoTiroFrame <= 3;

  const corContorno = "#111613";
  const corUniforme = emDano ? "#ff8787" : "#4d6b53";
  const corUniformeEscuro = emDano ? "#e03131" : "#2f4233";
  const corCalca = emDano ? "#c92a2a" : "#28362b";
  const corPele = emDano ? "#ffa8a8" : "#dfb089";
  const corCapacete = emDano ? "#ff6b6b" : "#354a39";

  ctx.save();
  ctx.translate(centroX, baseY);
  ctx.scale(soldado.direcao, 1);

  if (emDano) {
    ctx.rotate(estadoJogo.inclinacaoDano);
  }

  let anguloArma = 0;
  if (soldado.mirandoParado) {
    const dxLocal = soldado.miraDx * soldado.direcao;
    const dyLocal = soldado.miraDy;
    anguloArma = Math.atan2(dyLocal, dxLocal === 0 ? 0.0001 : dxLocal);
  } else if (soldado.olhandoCima) {
    anguloArma = -Math.PI / 2;
  } else if (soldado.olhandoBaixo) {
    anguloArma = Math.PI / 2;
  }

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (soldado.deitado) {
    // Perna traseira e frontal estendidas
    ctx.fillStyle = corCalca;
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.roundRect(-24, -13, 12, 6, 3);
    ctx.roundRect(-23, -8, 12, 6, 3);
    ctx.fill();
    ctx.stroke();

    // Bota tática
    ctx.fillStyle = "#1c211e";
    ctx.fillRect(-25, -13, 4, 6);
    ctx.fillRect(-24, -8, 4, 6);

    // Tronco tático deitado
    ctx.fillStyle = corUniforme;
    ctx.beginPath();
    ctx.roundRect(-13, -15, 22, 11, 4);
    ctx.fill();
    ctx.stroke();

    // Cinto e mochila
    ctx.fillStyle = "#2b241d";
    ctx.fillRect(-16, -15, 4, 10);
    ctx.fillRect(-2, -15, 3, 11);

    // Cabeça e capacete
    ctx.fillStyle = corPele;
    ctx.beginPath();
    ctx.roundRect(8, -13, 9, 8, 3);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = corCapacete;
    ctx.beginPath();
    ctx.arc(12, -12, 6.5, Math.PI * 0.85, Math.PI * 2.05);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Visor ótico
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(13, -10, 4.5, 2.5);

    desenharFuzil(11, -8, anguloArma, atirouAgora, corContorno);
  } else {
    const deslocamentoPerna = soldado.noChao || estadoJogo.status === "lobby" ? cicloPasso * 7.5 : 5.5;
    const elevacaoPernaA = andando ? Math.max(0, -Math.cos(estadoJogo.frameAtual * 0.35) * 4) : 0;
    const elevacaoPernaB = andando ? Math.max(0, Math.cos(estadoJogo.frameAtual * 0.35) * 4) : 0;

    // Perna traseira
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 8.5;
    ctx.beginPath();
    ctx.moveTo(1, -22);
    ctx.lineTo(1 - deslocamentoPerna, -6 - elevacaoPernaB);
    ctx.stroke();

    ctx.strokeStyle = corCalca;
    ctx.lineWidth = 5.5;
    ctx.beginPath();
    ctx.moveTo(1, -22);
    ctx.lineTo(1 - deslocamentoPerna, -6 - elevacaoPernaB);
    ctx.stroke();

    // Bota traseira
    ctx.fillStyle = "#1b201d";
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.roundRect(-3 - deslocamentoPerna, -6 - elevacaoPernaB, 9, 6, 2);
    ctx.fill();
    ctx.stroke();

    // Perna frontal
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-2, -22);
    ctx.lineTo(-2 + deslocamentoPerna, -6 - elevacaoPernaA);
    ctx.stroke();

    ctx.strokeStyle = corUniformeEscuro;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-2, -22);
    ctx.lineTo(-2 + deslocamentoPerna, -6 - elevacaoPernaA);
    ctx.stroke();

    // Bota frontal
    ctx.fillStyle = "#222925";
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.roundRect(-5 + deslocamentoPerna, -6 - elevacaoPernaA, 10, 6, 2);
    ctx.fill();
    ctx.stroke();

    // Mochila tática nas costas
    ctx.fillStyle = "#3a3228";
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.roundRect(-13, -43, 6, 17, 2.5);
    ctx.fill();
    ctx.stroke();

    // Tronco e colete
    ctx.fillStyle = corUniforme;
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-8, -44, 16, 23, 5);
    ctx.fill();
    ctx.stroke();

    // Detalhe do colete e cinto
    ctx.fillStyle = corUniformeEscuro;
    ctx.fillRect(-6, -41, 12, 11);
    ctx.fillStyle = "#4a3b2c";
    ctx.fillRect(-8, -25, 16, 4);
    ctx.fillStyle = "#f0b429";
    ctx.fillRect(2, -25, 3, 4);

    // Pescoço e cabeça
    ctx.fillStyle = corPele;
    ctx.fillRect(-2.5, -47, 5, 4);

    ctx.fillStyle = corPele;
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.roundRect(-5.5, -56, 11.5, 11, 4.5);
    ctx.fill();
    ctx.stroke();

    // Capacete com aba e faixa tática
    ctx.fillStyle = corCapacete;
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -53, 8.2, Math.PI * 0.96, Math.PI * 2.04);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#233025";
    ctx.fillRect(-7.5, -54, 15, 2.5);
    ctx.fillRect(4, -52, 6.5, 2.2);

    // Olho / visor tático
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(1.5, -51.5, 4.5, 2.8);

    // Braço de apoio e arma
    ctx.strokeStyle = corContorno;
    ctx.lineWidth = 6.5;
    ctx.beginPath();
    ctx.moveTo(-2, -39);
    ctx.lineTo(4, -34);
    ctx.stroke();

    ctx.strokeStyle = corUniforme;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-2, -39);
    ctx.lineTo(4, -34);
    ctx.stroke();

    desenharFuzil(3, -34, anguloArma, atirouAgora, corContorno);
  }

  if (soldado.mirandoParado && estadoJogo.status === "jogando") {
    const origemMiraX = soldado.deitado ? 11 : 3;
    const origemMiraY = soldado.deitado ? -8 : -34;
    const dxLocal = soldado.miraDx * soldado.direcao;
    const dyLocal = soldado.deitado && soldado.miraDy > 0 ? 0 : soldado.miraDy;
    const angMira = Math.atan2(dyLocal, dxLocal === 0 && dyLocal === 0 ? 1 : dxLocal);
    const distRet = 72;
    const rx = origemMiraX + Math.cos(angMira) * distRet;
    const ry = origemMiraY + Math.sin(angMira) * distRet;

    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.72)";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(origemMiraX + Math.cos(angMira) * 28, origemMiraY + Math.sin(angMira) * 28);
    ctx.lineTo(rx, ry);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(rx, ry, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

function desenharFuzil(origemX, origemY, angulo, atirouAgora, corContorno = "#111613") {
  ctx.save();
  ctx.translate(origemX, origemY);
  ctx.rotate(angulo);
  ctx.lineJoin = "round";

  // Coronha traseira
  ctx.fillStyle = "#3d2c1e";
  ctx.strokeStyle = corContorno;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-11, -3.5);
  ctx.lineTo(-3, -2.5);
  ctx.lineTo(-3, 3.5);
  ctx.lineTo(-11, 4.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Corpo principal (receiver) do fuzil
  ctx.fillStyle = "#24292e";
  ctx.beginPath();
  ctx.roundRect(-3, -3.5, 17, 6.2, 1.5);
  ctx.fill();
  ctx.stroke();

  // Carregador inclinado
  ctx.fillStyle = "#181b1f";
  ctx.beginPath();
  ctx.moveTo(3, 2.5);
  ctx.lineTo(8, 2.5);
  ctx.lineTo(6.5, 8.5);
  ctx.lineTo(1.5, 8.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Guarda-mão e cano estriado
  ctx.fillStyle = "#343a40";
  ctx.fillRect(14, -2.2, 8, 3.6);
  ctx.strokeRect(14, -2.2, 8, 3.6);

  ctx.fillStyle = "#6c757d";
  ctx.fillRect(22, -1.4, 6, 2);

  // Mira superior
  ctx.fillStyle = "#181b1f";
  ctx.fillRect(2, -5.5, 3, 2);
  ctx.fillRect(19, -4.2, 2, 2);

  if (atirouAgora) {
    ctx.fillStyle = "#ff922b";
    ctx.beginPath();
    ctx.moveTo(28, -0.4);
    ctx.lineTo(41, -7.5);
    ctx.lineTo(36, -0.4);
    ctx.lineTo(42, 6.5);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#fff3bf";
    ctx.beginPath();
    ctx.moveTo(28, -0.4);
    ctx.lineTo(36, -4.2);
    ctx.lineTo(33, -0.4);
    ctx.lineTo(37, 3.5);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

function desenharBossExtraterrestre(boss) {
  const emDano = boss.danoFrames > 0;
  const modoFuria = boss.vida <= boss.vidaMaxima * 0.5;
  const rindo = boss.estado === "rindo";
  const olhandoCima = boss.estado === "olhando_cima";
  const socando = boss.estado === "socando_chao";

  const tremorDano = emDano ? Math.sin(estadoJogo.frameAtual * 1.5) * 4 : 0;
  const baseX = boss.x + boss.largura / 2 + tremorDano;
  const baseY = boss.y + boss.altura;
  const dirFlip = -(boss.direcaoOlhar || -1);
  const escalaX = (boss.escalaX || 1) * dirFlip;
  const escalaY = boss.escalaY || 1;

  ctx.save();
  ctx.translate(baseX, baseY);
  ctx.scale(escalaX, escalaY);

  const corPeleEscura = emDano ? "#ff8787" : modoFuria ? "#5c0909" : "#861616";
  const corPeleClara = emDano ? "#ffe3e3" : modoFuria ? "#b01717" : "#e03131";

  ctx.fillStyle = corPeleEscura;
  ctx.beginPath();
  ctx.roundRect(-48, -36, 34, 34, 10);
  ctx.roundRect(14, -36, 34, 34, 10);
  ctx.fill();

  ctx.fillStyle = corPeleClara;
  ctx.strokeStyle = "#3b0707";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(0, -74, 66, 56, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.save();
  ctx.translate(-8, -124);
  ctx.rotate(olhandoCima ? 0.48 : rindo ? 0.2 : 0);

  ctx.fillStyle = corPeleClara;
  ctx.beginPath();
  ctx.ellipse(0, -8, 34, 27, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f8f9fa";
  ctx.beginPath();
  ctx.moveTo(-14, -14);
  ctx.quadraticCurveTo(-56, -34, -48, -80);
  ctx.quadraticCurveTo(-30, -48, -2, -24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = olhandoCima ? "#94d82d" : "#ffe066";
  ctx.beginPath();
  ctx.arc(-20, -9, 6, 0, Math.PI * 2);
  ctx.arc(-9, -8, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  let punhoX = -68;
  let punhoY = -44;
  if (socando) {
    punhoX = boss.frameAcao < 33 ? -45 : -82;
    punhoY = boss.frameAcao < 33 ? -140 : -16;
  }

  ctx.strokeStyle = corPeleClara;
  ctx.lineWidth = 20;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-46, -92);
  ctx.lineTo(punhoX, punhoY);
  ctx.stroke();

  ctx.fillStyle = corPeleEscura;
  ctx.beginPath();
  ctx.arc(punhoX, punhoY, 19, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  if (boss.risadasFlutuantes && boss.risadasFlutuantes.length > 0) {
    ctx.save();
    ctx.font = "bold 16px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    for (let i = 0; i < boss.risadasFlutuantes.length; i++) {
      const r = boss.risadasFlutuantes[i];
      ctx.globalAlpha = Math.max(0, r.vida / r.vidaMax);
      ctx.fillStyle = "#ffe066";
      ctx.fillText(r.texto, r.x, r.y);
    }
    ctx.restore();
  }
}

function desenharCena() {
  if (estadoJogo.status === "lobby") {
    desenharMapaLobbyCuphead();
    return;
  }

  if (estadoJogo.status === "press_key" || estadoJogo.status === "menu") {
    ctx.fillStyle = "#11161d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return;
  }

  const configNivel = NIVEIS[estadoJogo.nivelIndice];

  if (configNivel.numero === 1) {
    desenharCenarioPosApocaliptico(configNivel);
  } else if (configNivel.numero === 2) {
    desenharCenarioCaverna(configNivel);
  } else {
    ctx.fillStyle = configNivel.corCeu;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  const tremorY =
    (estadoJogo.boss && estadoJogo.boss.tremorChaoFrames > 0) ||
    estadoJogo.status === "derrotando_boss"
      ? Math.sin(estadoJogo.frameAtual * 1.9) * 5
      : 0;

  ctx.save();
  ctx.translate(-estadoJogo.cameraX, tremorY);

  if (configNivel.numero !== 1 && configNivel.numero !== 2) {
    ctx.fillStyle = configNivel.corChao;
    ctx.fillRect(0, CHAO_Y, configNivel.distanciaMeta + 200, canvas.height - CHAO_Y);
    ctx.fillStyle = "#5c7a62";
    ctx.fillRect(0, CHAO_Y, configNivel.distanciaMeta + 200, 5);
  }

  desenharCaminhosSubterraneos();
  desenharBuracosChao();
  desenharEstruturasQuebradas();
  desenharPlataformas(configNivel);
  desenharItensChao();

  if (configNivel.numero < NIVEIS.length) {
    desenharEntradaCaverna(configNivel.distanciaMeta);
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
    } else if (inimigo.tipo === "voador_acido") {
      desenharVoadorAcidoRealista(inimigo);
    }
  }

  if (estadoJogo.boss) {
    desenharBossExtraterrestre(estadoJogo.boss);
  }

  for (let i = 0; i < estadoJogo.tirosJogador.length; i++) {
    const t = estadoJogo.tirosJogador[i];
    ctx.save();
    ctx.translate(t.x + t.largura / 2, t.y + t.altura / 2);
    ctx.rotate(t.angulo || 0);
    ctx.fillStyle = t.especial ? "#38bdf8" : "#ffe066";
    ctx.fillRect(-7, -3, 14, 6);
    ctx.restore();
  }

  for (let i = 0; i < estadoJogo.tirosInimigos.length; i++) {
    const t = estadoJogo.tirosInimigos[i];
    if (t.tipo === "acido") {
      const cx = t.x + t.largura / 2;
      const cy = t.y + t.altura / 2;
      ctx.save();
      ctx.fillStyle = "#82c91e";
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else {
      ctx.fillStyle = "#ff6b6b";
      ctx.fillRect(t.x, t.y, t.largura, t.altura);
    }
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
    ctx.fillStyle = boss.vida <= boss.vidaMaxima * 0.5 ? "#ff922b" : "#fa5252";
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

  desenharHudNoCanvas();
  desenharAcaoVitoriaOverlay();
}

// =========================================================
// 10. LOOP PRINCIPAL (NORMALIZADO COM DELTA TIME)
// =========================================================
let ultimoTimestamp = 0;

function loopPrincipal(timestamp = 0) {
  if (!ultimoTimestamp) ultimoTimestamp = timestamp;
  const dt = Math.min((timestamp - ultimoTimestamp) / (1000 / 60), 2);
  ultimoTimestamp = timestamp;

  if (estadoJogo.status === "lobby") {
    estadoJogo.frameAtual += dt;
    atualizarLobbyCuphead(dt);
  } else if (estadoJogo.status === "jogando") {
    estadoJogo.frameAtual += dt;
    atualizarPlataformas(dt);
    atualizarItensChao(dt);
    atualizarMiraESoldado(dt);
    atualizarInimigos(dt);
    atualizarCaminhosSubterraneos(dt);
    atualizarBuracosChao(dt);
    atualizarBoss(dt);
    atualizarProjeteis(dt);
    atualizarParticulasDano(dt);
  } else if (estadoJogo.status === "derrotando_boss") {
    estadoJogo.frameAtual += dt;
    atualizarSequenciaDerrotaBoss(dt);
  } else if (estadoJogo.status === "vitoria_fase") {
    estadoJogo.frameAtual += dt;
    atualizarAcaoVitoriaFase(dt);
  }

  desenharCena();
  requestAnimationFrame(loopPrincipal);
}

// Inicialização ao carregar o script
registrarEventos();
atualizarRecordesUI();
atualizarBotoesAudioUI();
irParaTelaPressKey();
loopPrincipal();