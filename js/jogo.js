// =========================================================
// 1. SELEÇÃO DE ELEMENTOS DO DOM
// =========================================================
const appTelaCheia = document.querySelector("#app-tela-cheia");
const canvas = document.querySelector("#tela-jogo");
const ctx = canvas.getContext("2d");

const btnPauseJogo = document.querySelector("#btn-pause-jogo");
const overlayPause = document.querySelector("#overlay-pause");
const painelPauseMenu = document.querySelector("#painel-pause-menu");
const painelPauseControles = document.querySelector("#painel-pause-controles");
const painelPauseConfig = document.querySelector("#painel-pause-config");

const btnPauseContinuar = document.querySelector("#btn-pause-continuar");
const btnPauseControles = document.querySelector("#btn-pause-controles");
const btnPauseOpcoes = document.querySelector("#btn-pause-opcoes");
const btnPauseLobby = document.querySelector("#btn-pause-lobby");

const btnVoltarPauseControles = document.querySelector("#btn-voltar-pause-controles");
const btnVoltarPauseOpcoes = document.querySelector("#btn-voltar-pause-opcoes");
const btnPauseOpcaoMusica = document.querySelector("#btn-pause-opcao-musica");
const btnPauseOpcaoFullscreen = document.querySelector("#btn-pause-opcao-fullscreen");

const barraLobby = document.querySelector("#barra-lobby");
const statusLobbyTexto = document.querySelector("#status-lobby-texto");
const btnLobbyMusica = document.querySelector("#btn-lobby-musica");
const btnLobbyMenu = document.querySelector("#btn-lobby-menu");
const btnResetProgresso = document.querySelector("#btn-reset-progresso");

const overlayPressKey = document.querySelector("#overlay-press-key");

const overlayMenuPrincipal = document.querySelector("#overlay-menu-principal");
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
const btnOpcaoFullscreen = document.querySelector("#btn-opcao-fullscreen");
const btnConfirmarSair = document.querySelector("#btn-confirmar-sair");
const btnCancelarSair = document.querySelector("#btn-cancelar-sair");

const overlayFim = document.querySelector("#overlay-fim");
const tituloFim = document.querySelector("#titulo-fim");
const mensagemFim = document.querySelector("#mensagem-fim");
const pontuacaoFinalEl = document.querySelector("#pontuacao-final");

const btnReiniciar = document.querySelector("#btn-reiniciar");
const btnVoltarLobby = document.querySelector("#btn-voltar-lobby");

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
    nome: "Setor 2 - Caverna Profunda",
    corCeu: "#12161f",
    corChao: "#262229",
    distanciaMeta: 3100,
    intervaloSpawn: 220,
    tiposInimigos: ["voador_acido"]
  },
  {
    numero: 3,
    nome: "Setor 3 - Núcleo do Boss",
    corCeu: "#2b1215",
    corChao: "#3b1d22",
    distanciaMeta: 900,
    intervaloSpawn: 160,
    tiposInimigos: ["voador_acido", "rastejador"]
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
    subtitulo: "Abismos, rastejadores e voadores de ácido",
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
// 2B. TRILHA SONORA PROCEDURAL (APENAS MÚSICA MUTÁVEL) E SFX
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
    bpm: 124,
    ondaMelodia: "sawtooth",
    ondaBaixo: "triangle",
    volume: 0.042,
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
  musicaAtiva: true
};

function podeControlarMusica() {
  if (estadoJogo.status === "pausado") {
    return true;
  }
  if (estadoJogo.status === "menu" && !painelOpcoes.classList.contains("oculto")) {
    return true;
  }
  return ["lobby", "jogando", "vitoria_fase", "derrota"].includes(estadoJogo.status);
}

function atualizarBotaoMusicaUI() {
  const liberado = podeControlarMusica();
  const rotulo = sistemaAudio.musicaAtiva ? "🎵 Música: ON" : "🔇 Música: OFF";

  [btnLobbyMusica, btnOpcaoMusica, btnPauseOpcaoMusica].forEach((btn) => {
    if (btn) {
      btn.textContent = rotulo;
      btn.disabled = !liberado;
    }
  });
}

function alternarMusicaApenas() {
  if (!podeControlarMusica()) return;

  sistemaAudio.musicaAtiva = !sistemaAudio.musicaAtiva;
  atualizarBotaoMusicaUI();

  if (!sistemaAudio.musicaAtiva) {
    pararMusicaFase();
  } else if (estadoJogo.status === "lobby") {
    garantirAudioContexto();
    iniciarMusica("lobby");
  } else if (estadoJogo.status === "jogando") {
    garantirAudioContexto();
    const configNivel = NIVEIS[estadoJogo.nivelIndice];
    iniciarMusica(configNivel.numero);
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

function tocarNotaSintetizada(freq, duracaoSeg, tipoOnda, ganhoMax, offsetFiltro = 1400) {
  if (!freq || freq <= 0 || !sistemaAudio.ctx || !sistemaAudio.musicaAtiva) return;

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

function tocarSfxAcertoInimigo(eliminado = false) {
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
  const audioCtx = garantirAudioContexto();
  if (!audioCtx) return;

  const sequencia = [
    { freq: 523.25, delay: 0, dur: 0.12 },
    { freq: 659.25, delay: 110, dur: 0.12 },
    { freq: 783.99, delay: 220, dur: 0.12 },
    { freq: 1046.5, delay: 340, dur: 0.22 },
    { freq: 880.0, delay: 560, dur: 0.12 },
    { freq: 1046.5, delay: 690, dur: 0.36 }
  ];

  sequencia.forEach((nota) => {
    setTimeout(() => {
      if (!sistemaAudio.ctx) return;
      tocarNotaSintetizada(nota.freq, nota.dur, "triangle", 0.075, 2800);
      tocarNotaSintetizada(nota.freq * 0.5, nota.dur, "square", 0.025, 1100);
    }, nota.delay);
  });
}

function tocarSfxDerrota() {
  const audioCtx = garantirAudioContexto();
  if (!audioCtx) return;

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
  if (!faixa || !sistemaAudio.musicaAtiva) {
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
    if (!sistemaAudio.musicaAtiva) return;
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
// 3. ESTADO DO JOGO (FLUXO INICIAL, MENU, LOBBY, PAUSE E COMBATE)
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
  // "press_key" | "menu" | "lobby" | "jogando" | "pausado" | "vitoria_fase" | "derrota"
  status: "press_key",
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
  abismosSemFundo: [],
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
  caindoNoAbismo: false,
  deitado: false,
  olhandoCima: false,
  mirandoParado: false,
  miraDx: 1,
  miraDy: 0,
  direcao: 1,
  vida: 100,
  vidaMaxima: 100
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
  atualizarBotaoPauseUI();
}

function pausarJogo(subtela = "principal") {
  if (estadoJogo.status !== "jogando" && estadoJogo.status !== "pausado") return;

  pararMusicaFase();
  estadoJogo.status = "pausado";

  Object.keys(teclas).forEach((codigoTecla) => {
    teclas[codigoTecla] = false;
  });

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
  atualizarBotaoMusicaUI();
}

function continuarJogo() {
  if (estadoJogo.status !== "pausado") return;

  estadoJogo.status = "jogando";
  esconderTodosOverlays();
  atualizarBarraLobbyUI();
  atualizarBotaoMusicaUI();

  if (sistemaAudio.musicaAtiva) {
    const configNivel = NIVEIS[estadoJogo.nivelIndice];
    iniciarMusica(configNivel.numero);
  }
}

function irParaTelaPressKey() {
  pararMusicaFase();
  estadoJogo.status = "press_key";
  esconderTodosOverlays();
  overlayPressKey.classList.remove("oculto");
  atualizarBarraLobbyUI();
  atualizarBotaoMusicaUI();
}

function irDiretoParaMenuAposTecla() {
  if (estadoJogo.status !== "press_key") return;
  solicitarTelaCheiaSePossivel();
  garantirAudioContexto();
  abrirMenuPrincipal("principal");
}

function abrirMenuPrincipal(subtela = "principal") {
  pararMusicaFase();
  estadoJogo.status = "menu";
  esconderTodosOverlays();
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
  atualizarBotaoMusicaUI();
}

function sairDoJogo() {
  pararMusicaFase();
  try {
    window.close();
  } catch {
    // Ignora se bloqueado pelo navegador
  }
  abrirMenuPrincipal("sair");
}

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
  soldado.mirandoParado = false;
  soldado.miraDx = 1;
  soldado.miraDy = 0;
  soldado.caindoNoAbismo = false;
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

  esconderTodosOverlays();
  posicionarSoldadoNoNoLobby(alvo);
  atualizarBotaoMusicaUI();

  if (sistemaAudio.musicaAtiva) {
    iniciarMusica("lobby");
  }
}

function resetarProgressoLobby() {
  estadoJogo.maiorFaseDesbloqueada = 0;
  estadoJogo.fasesConcluidas = [];
  estadoJogo.pontuacao = 0;
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
  estadoJogo.abismosSemFundo = [];
  estadoJogo.buracosChao = [];
  estadoJogo.caminhosSubterraneos = [];

  soldado.vida = soldado.vidaMaxima;
  soldado.direcao = 1;
  soldado.deitado = false;
  soldado.mirandoParado = false;
  soldado.miraDx = 1;
  soldado.miraDy = 0;
  soldado.caindoNoAbismo = false;
  soldado.largura = soldado.larguraEmPe;
  soldado.alturaAtual = soldado.alturaEmPe;

  esconderTodosOverlays();
  atualizarBarraLobbyUI();
  atualizarBotaoMusicaUI();
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
  estadoJogo.tirosJogador = [];
  estadoJogo.tirosInimigos = [];
  estadoJogo.boss = null;
  estadoJogo.danoSoldadoFrames = 0;
  estadoJogo.pulsoTelaDano = 0;
  estadoJogo.inclinacaoDano = 0;
  estadoJogo.avisoNivelFrames = 140;

  soldado.deitado = false;
  soldado.mirandoParado = false;
  soldado.miraDx = 1;
  soldado.miraDy = 0;
  soldado.caindoNoAbismo = false;
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
    configurarMapaFase2Caverna(configNivel.distanciaMeta);
    posicionarRastejadoresFase2();
    posicionarVoadoresFase2();
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

function configurarMapaFase2Caverna(distanciaMeta) {
  const abismos = [
    { x: 520, largura: 84 },
    { x: 1060, largura: 90 },
    { x: 1360, largura: 250 }, // Buraco bem grande no mapa
    { x: 1840, largura: 88 },
    { x: 2340, largura: 92 },
    { x: 2800, largura: 88 }
  ];

  for (let i = 0; i < abismos.length; i++) {
    const ab = abismos[i];
    estadoJogo.abismosSemFundo.push({
      x: ab.x,
      largura: ab.largura
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

  // Apenas plataformas pontuais: a que desaba no abismo grande e uma suspensa no meio da caverna
  const abismosComPlataforma = [1360, 1840];

  for (let i = 0; i < abismos.length; i++) {
    const ab = abismos[i];
    if (!abismosComPlataforma.includes(ab.x)) continue;

    const ehBuracoGrande = ab.largura >= 160;

    if (ehBuracoGrande) {
      // Plataforma que desaba no meio do buraco grande para ajudar na travessia
      const larguraPlat = 120;
      const xPlat = ab.x + (ab.largura - larguraPlat) / 2;
      estadoJogo.plataformas.push({
        x: xPlat,
        y: CHAO_Y - 38,
        largura: larguraPlat,
        altura: 18,
        tipo: "caverna",
        desmoronavel: true,
        pisada: false,
        tempoRestanteFrames: Math.round(FPS_ESTIMADO * 1.35),
        desmoronando: false,
        vy: 0,
        removida: false
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
}

function posicionarRastejadoresMapa() {
  const pontosMapa = [
    { x: 540, alcance: 230, velocidadeAtaque: 1.35, variante: "normal" },
    { x: 860, alcance: 235, velocidadeAtaque: 1.4, variante: "azul" },
    { x: 1220, alcance: 240, velocidadeAtaque: 1.5, variante: "normal" },
    { x: 1580, alcance: 240, velocidadeAtaque: 1.55, variante: "azul" },
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
    // Trecho 1: guarda o solo e a rocha elevada após o 1º abismo
    { x: 730, alcance: 240, velocidadeAtaque: 1.55, variante: "normal", yBase: CHAO_Y },
    { x: 850, alcance: 250, velocidadeAtaque: 1.6, variante: "azul", yBase: CHAO_Y - 66 },

    // Trecho 2: meio da caverna, após o grande abismo
    { x: 1865, alcance: 255, velocidadeAtaque: 1.7, variante: "azul", yBase: CHAO_Y - 108 },
    { x: 1995, alcance: 250, velocidadeAtaque: 1.75, variante: "normal", yBase: CHAO_Y },

    // Trecho 3: reta final antes da saída da caverna
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
    // Apenas 3 patrulhas aéreas espaçadas ao longo da caverna
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
  estadoJogo.vitoriaTimerFrames = 145;

  soldado.vx = 0;
  soldado.vy = -5.5;
  soldado.noChao = false;

  const telaX = soldado.x - estadoJogo.cameraX + soldado.largura / 2;
  const telaY = soldado.y + soldado.alturaAtual / 2;
  gerarParticulasVitoria(telaX, telaY);
  atualizarBarraLobbyUI();
  atualizarBotaoMusicaUI();
}

function atualizarAcaoVitoriaFase() {
  estadoJogo.vitoriaTimerFrames--;

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

function finalizarDerrota(motivoQueda = false) {
  pararMusicaFase();
  tocarSfxDerrota();
  estadoJogo.status = "derrota";
  tituloFim.textContent = motivoQueda ? "Você Caiu no Abismo!" : "Soldado Abatido!";
  mensagemFim.textContent = motivoQueda
    ? "Você caiu em um buraco sem fundo. Tente novamente ou volte ao lobby."
    : "Sua energia chegou a zero. Tente novamente ou volte ao lobby.";
  pontuacaoFinalEl.textContent = estadoJogo.pontuacao;
  atualizarBarraLobbyUI();
  atualizarBotaoMusicaUI();
  esconderTodosOverlays();
  overlayFim.classList.remove("oculto");
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

  btnPauseControles.addEventListener("click", function () {
    pausarJogo("controles");
  });

  btnPauseOpcoes.addEventListener("click", function () {
    pausarJogo("opcoes");
  });

  btnPauseLobby.addEventListener("click", function () {
    abrirLobby(estadoJogo.nivelIndice);
  });

  btnVoltarPauseControles.addEventListener("click", function () {
    pausarJogo("principal");
  });

  btnVoltarPauseOpcoes.addEventListener("click", function () {
    pausarJogo("principal");
  });

  btnPauseOpcaoMusica.addEventListener("click", alternarMusicaApenas);
  btnPauseOpcaoFullscreen.addEventListener("click", alternarTelaCheia);

  overlayPressKey.addEventListener("click", function () {
    irDiretoParaMenuAposTecla();
  });

  btnLobbyMusica.addEventListener("click", alternarMusicaApenas);

  btnLobbyMenu.addEventListener("click", function () {
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

  if (btnResetProgresso) {
    btnResetProgresso.addEventListener("click", resetarProgressoLobby);
  }

  canvas.addEventListener("click", function (evento) {
    if (estadoJogo.status !== "lobby") return;

    const rect = canvas.getBoundingClientRect();
    const escalaX = canvas.width / rect.width;
    const escalaY = canvas.height / rect.height;
    const clickX = (evento.clientX - rect.left) * escalaX;
    const clickY = (evento.clientY - rect.top) * escalaY;

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
  });

  window.addEventListener("keydown", function (evento) {
    const codigo = evento.code;

    if (estadoJogo.status === "press_key") {
      if (["Space", "Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(codigo)) {
        evento.preventDefault();
      }
      if (!evento.repeat) {
        irDiretoParaMenuAposTecla();
      }
      return;
    }

    if (codigo === "Escape" && !evento.repeat) {
      evento.preventDefault();
      if (estadoJogo.status === "jogando") {
        pausarJogo("principal");
      } else if (estadoJogo.status === "pausado") {
        pausarJogo("principal");
      } else if (estadoJogo.status === "menu") {
        if (!painelMenuOpcoes.classList.contains("oculto")) {
          abrirLobby(estadoJogo.maiorFaseDesbloqueada);
        } else {
          abrirMenuPrincipal("principal");
        }
      } else if (estadoJogo.status === "lobby") {
        abrirMenuPrincipal("principal");
      }
      return;
    }

    if (estadoJogo.status === "pausado") {
      evento.preventDefault();
      return;
    }

    if (estadoJogo.status === "menu") {
      if (["Space", "Enter", "ArrowUp", "ArrowDown"].includes(codigo)) {
        evento.preventDefault();
      }
      return;
    }

    teclas[codigo] = true;

    if (codigo === "KeyM" && !evento.repeat && podeControlarMusica()) {
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

    if (codigo === "KeyR" && estadoJogo.status === "jogando") {
      iniciarFase(estadoJogo.nivelIndice);
    }
  });

  window.addEventListener("keyup", function (evento) {
    teclas[evento.code] = false;
  });
}

// =========================================================
// 6. LÓGICA DO SOLDADO, PLATAFORMAS, ABISMOS E DISPAROS
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

function atualizarMiraESoldado() {
  if (soldado.caindoNoAbismo) {
    soldado.vy += GRAVIDADE * 1.1;
    soldado.y += soldado.vy;
    soldado.x += soldado.vx * 0.4;
    if (soldado.y > canvas.height + 24) {
      soldado.vida = 0;
      finalizarDerrota(true);
    }
    return;
  }

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
  } else {
    soldado.miraDx = soldado.direcao;
    soldado.miraDy = 0;
    soldado.olhandoCima = Boolean(cima && !soldado.deitado);
  }

  const querDeitar = Boolean(!segurandoTravaMira && baixo && soldado.noChao);

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

  const peX = soldado.x + soldado.largura / 2;
  const abismoSobrePe = encontrarAbismoSobrePe(peX);

  if (!abismoSobrePe && soldado.y + soldado.alturaAtual >= CHAO_Y) {
    soldado.y = CHAO_Y - soldado.alturaAtual;
    soldado.vy = 0;
    soldado.noChao = true;
  } else if (abismoSobrePe && soldado.y + soldado.alturaAtual >= CHAO_Y + 6) {
    soldado.caindoNoAbismo = true;
    tocarSfxDano();
    return;
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
    estadoJogo.pontuacao += 200;
    concluirFaseComVitoria(estadoJogo.nivelIndice);
  }
}

function dispararTiroSoldado() {
  const velocidadeTiro = 10;
  tocarSfxTiro();

  if (soldado.mirandoParado) {
    const dx = soldado.miraDx;
    const dy = soldado.miraDy;
    const mag = Math.hypot(dx, dy) || 1;
    const vx = (dx / mag) * velocidadeTiro;
    const vy = (dy / mag) * velocidadeTiro;
    const angulo = Math.atan2(vy, vx);

    const origemX = soldado.x + soldado.largura / 2 + dx * 16;
    const origemY = soldado.y + soldado.alturaAtual * 0.45 + dy * 16;
    const nivelTiro = dy > 0 && dx === 0 ? "baixo" : dy < 0 && dx === 0 ? "alto" : "medio";

    estadoJogo.tirosJogador.push({
      x: origemX - 7,
      y: origemY - 3,
      largura: 14,
      altura: 6,
      vx: vx,
      vy: vy,
      angulo: angulo,
      dano: 1,
      nivelTiro: nivelTiro
    });
    return;
  }

  if (soldado.olhandoCima) {
    estadoJogo.tirosJogador.push({
      x: soldado.x + soldado.largura / 2 - 3,
      y: soldado.y - 10,
      largura: 14,
      altura: 6,
      vx: 0,
      vy: -velocidadeTiro,
      angulo: -Math.PI / 2,
      dano: 1,
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
      angulo: soldado.direcao === 1 ? 0 : Math.PI,
      dano: 1,
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
      angulo: soldado.direcao === 1 ? 0 : Math.PI,
      dano: 1,
      nivelTiro: "medio"
    });
  }
}

// =========================================================
// 7. INIMIGOS, BURACOS, CAMINHO SUBTERRÂNEO EM "U" E BOSS
// =========================================================
function gerarInimigos() {
  const configNivel = NIVEIS[estadoJogo.nivelIndice];

  if (configNivel.numero === 1 || configNivel.numero === 2) return;

  if (estadoJogo.frameAtual % configNivel.intervaloSpawn !== 0) return;

  if (configNivel.numero === 3 && (!estadoJogo.boss || estadoJogo.inimigos.length >= 2)) {
    return;
  }

  const spawnX = canvas.width - 40;
  const variante = estadoJogo.frameAtual % 2 === 0 ? "azul" : "normal";
  estadoJogo.inimigos.push(criarRastejador(spawnX, 250, 1.55, estadoJogo.frameAtual, variante));
}

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

  // 1. Plataformas suspensas
  for (let i = 0; i < estadoJogo.plataformas.length; i++) {
    const plat = estadoJogo.plataformas[i];
    if (plat.desmoronando) continue;

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

  // 2. Rochas elevadas e obstáculos sólidos
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

  // 3. Chão principal (fora de abismos)
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

function atualizarInimigos() {
  const configNivel = NIVEIS[estadoJogo.nivelIndice];
  const centroSoldadoX = soldado.x + soldado.largura / 2;
  const centroSoldadoY = soldado.y + soldado.alturaAtual / 2;

  for (let i = estadoJogo.inimigos.length - 1; i >= 0; i--) {
    const inimigo = estadoJogo.inimigos[i];
    if (inimigo.danoFrames > 0) {
      inimigo.danoFrames--;
    }

    if (inimigo.tipo === "rastejador") {
      const centroInimigoX = inimigo.x + inimigo.largura / 2;
      const distanciaX = centroSoldadoX - centroInimigoX;
      const distanciaAbs = Math.abs(distanciaX);
      const ehAzul = inimigo.variante === "azul";
      const yAnteriorInimigo = inimigo.y;

      if (inimigo.cooldownPuloAzul > 0) {
        inimigo.cooldownPuloAzul--;
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
          // Caindo suavemente caso saia da borda de uma rocha ou plataforma
          inimigo.vy += GRAVIDADE * 0.85;
          inimigo.y += inimigo.vy;
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
        const passoX = inimigo.direcaoOlhar * inimigo.velocidadeAtaque;
        const proximoX = inimigo.x + passoX;

        if (ehAzul) {
          // Se estiver em plataforma suspensa sobre abismo, permanece na plataforma sem cair no vazio
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

            // Pulo baixo e calculado apenas para vencer a altura do obstáculo ou buraco
            if (devePularObstaculo && obsAFrente) {
              const gRastejador = GRAVIDADE * 0.85;
              const impulsoCalculado = Math.sqrt(2 * gRastejador * (obsAFrente.altura + 8));
              inimigo.vy = -Math.min(9.1, Math.max(7.4, impulsoCalculado));
            } else {
              inimigo.vy = -7.5;
            }

            inimigo.cooldownPuloAzul = 38;
            inimigo.x += inimigo.vx;
            inimigo.y += inimigo.vy;
          } else if (
            estaLogoAbaixoDoSoldado ||
            infoAbismo.atingiria ||
            bloqueadoPorBordaPlataforma
          ) {
            inimigo.vx = 0;
          } else {
            inimigo.vx = passoX;
            inimigo.x = proximoX;
          }
        } else {
          // Rastejador marrom: cava túnel em "U" ao encontrar obstáculo
          const infoAbismo = noChaoPrincipal
            ? rastejadorAtingiriaAbismo(proximoX, inimigo.largura, inimigo.direcaoOlhar, 0)
            : { atingiria: false, pulavel: false, abismo: null };

          if (noChaoPrincipal && obsAFrente && !estaLogoAbaixoDoSoldado) {
            inimigo.estado = "saltando_mergulho";
            inimigo.obstaculoAlvo = obsAFrente;
            inimigo.ocultoNaTerra = false;
            inimigo.vx = inimigo.direcaoOlhar * 1.35;
            inimigo.vy = -8.6;
            inicializarRastroArcoPulo(inimigo);
            inimigo.x += inimigo.vx;
            inimigo.y += inimigo.vy;
            registrarPontoArcoPulo(inimigo);
          } else if (estaLogoAbaixoDoSoldado || infoAbismo.atingiria) {
            inimigo.vx = 0;
          } else {
            inimigo.vx = passoX;
            inimigo.x = proximoX;
          }
        }
      } else if (inimigo.estado === "saltando_azul") {
        inimigo.ocultoNaTerra = false;
        inimigo.vy += GRAVIDADE * 0.85;
        inimigo.x += inimigo.vx;
        inimigo.y += inimigo.vy;

        const pouso = obterSuperficieApoioRastejador(inimigo, yAnteriorInimigo, false);
        if (pouso) {
          inimigo.y = pouso.y - inimigo.altura;
          inimigo.vy = 0;
          inimigo.vx = 0;
          inimigo.estado = "atacando";
        } else if (inimigo.y > canvas.height + 30) {
          estadoJogo.inimigos.splice(i, 1);
          continue;
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
            criarBuracoNoSolo(xSaida - 14, 28, true, 140);

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

        const pouso = obterSuperficieApoioRastejador(inimigo, yAnteriorInimigo, false);
        if (pouso) {
          inimigo.y = pouso.y - inimigo.altura;
          inimigo.vy = 0;
          inimigo.estado = "atacando";
        }
      } else {
        // Parado esperando em cima da plataforma, rocha ou chão
        inimigo.ocultoNaTerra = false;
        inimigo.vx = 0;
        inimigo.vy = 0;
        inimigo.direcaoOlhar = distanciaX >= 0 ? 1 : -1;
        const apoioEspera = obterSuperficieApoioRastejador(inimigo, yAnteriorInimigo, true);
        if (apoioEspera) {
          inimigo.y = apoioEspera.y - inimigo.altura;
        }
      }
    } else if (inimigo.tipo === "voador_acido") {
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
        const velPatrulha = 1.9;
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
    } else {
      inimigo.x += inimigo.vx;
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

    // Só remove inimigos que já ficaram para trás da câmera ou saíram do limite final da fase
    const foraEsquerda = inimigo.x + inimigo.largura < estadoJogo.cameraX - 180;
    const foraLimiteMapa = inimigo.x > configNivel.distanciaMeta + 240;
    if (foraEsquerda || foraLimiteMapa) {
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
        const danoBala = tiro.dano !== undefined ? tiro.dano : 1;
        inimigo.vida = Math.max(0, inimigo.vida - danoBala);
        inimigo.mostrarBarraVida = true;
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
        concluirFaseComVitoria(estadoJogo.nivelIndice);
        return;
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
    tiro.x += tiro.vx;
    tiro.y += tiro.vy;

    if (tiro.tipo === "acido" && estadoJogo.frameAtual % 3 === 0) {
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
      aplicarDanoSoldado(tiro.tipo === "acido" ? 14 : 12, direcaoImpacto);
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

function desenharHudNoCanvas(configNivel) {
  const pct =
    configNivel.numero < NIVEIS.length
      ? Math.min(100, Math.floor((soldado.x / (configNivel.distanciaMeta - 40)) * 100))
      : estadoJogo.boss
      ? 50
      : 100;

  ctx.save();
  ctx.fillStyle = "rgba(15, 23, 42, 0.78)";
  ctx.strokeStyle = "#2f3e52";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(14, 12, 430, 28, 6);
  ctx.fill();
  ctx.stroke();

  const miraTag = soldado.mirandoParado ? "  |  MIRA TRAVADA (K/X)" : "";
  ctx.fillStyle = "#e6edf3";
  ctx.font = "bold 12px Segoe UI, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(
    `FASE ${configNivel.numero}/3   |   VIDA ${soldado.vida}   |   PONTOS ${estadoJogo.pontuacao}   |   ${pct}%${miraTag}`,
    24,
    26
  );
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
  ctx.font = "bold 13px Segoe UI, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("MAPA DO LOBBY • Ande até a fase e aperte Enter/Espaço", 30, 28);
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

    ctx.fillStyle = "#08090d";
    ctx.fillRect(ab.x, CHAO_Y, ab.largura, alturaChao);

    ctx.fillStyle = "#3a3242";
    ctx.fillRect(ab.x - 4, CHAO_Y, 6, 10);
    ctx.fillRect(ab.x + ab.largura - 2, CHAO_Y, 6, 10);

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

function desenharTetoCaverna(configNivel) {
  const limiteMundo = configNivel.distanciaMeta + 300;

  // 1. Camada profunda da abóbada rochosa (parallax mais lento para dar profundidade)
  ctx.save();
  ctx.translate(-estadoJogo.cameraX * 0.4, 0);
  ctx.fillStyle = "#0e121b";
  ctx.beginPath();
  ctx.moveTo(-40, 0);
  for (let rx = -40; rx <= limiteMundo; rx += 130) {
    const alturaArco = 42 + ((Math.abs(rx) * 19) % 24);
    ctx.lineTo(rx + 45, alturaArco);
    ctx.lineTo(rx + 95, alturaArco - 12);
    ctx.lineTo(rx + 130, alturaArco + 4);
  }
  ctx.lineTo(limiteMundo, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 2. Camada principal do teto de rocha e estalactites presas diretamente na pedra
  ctx.save();
  ctx.translate(-estadoJogo.cameraX * 0.65, 0);

  const passoRocha = 95;
  const pontosContorno = [];
  for (let sx = -55; sx <= limiteMundo; sx += passoRocha) {
    const baseTeto = 24 + ((Math.abs(sx) * 17) % 18);
    pontosContorno.push({ x: sx, y: baseTeto });
    pontosContorno.push({ x: sx + 32, y: baseTeto + 11 });
    pontosContorno.push({ x: sx + 64, y: baseTeto - 4 });
  }

  // Massa principal de rocha do teto
  ctx.fillStyle = "#191e2b";
  ctx.beginPath();
  ctx.moveTo(pontosContorno[0].x, 0);
  for (let i = 0; i < pontosContorno.length; i++) {
    ctx.lineTo(pontosContorno[i].x, pontosContorno[i].y);
  }
  ctx.lineTo(pontosContorno[pontosContorno.length - 1].x, 0);
  ctx.closePath();
  ctx.fill();

  // Facetas internas de pedra para textura rochosa
  for (let i = 0; i < pontosContorno.length - 2; i += 2) {
    const p1 = pontosContorno[i];
    const p2 = pontosContorno[i + 1];
    const p3 = pontosContorno[i + 2];

    ctx.fillStyle = i % 4 === 0 ? "#242b3d" : "#1f2534";
    ctx.beginPath();
    ctx.moveTo(p1.x, 0);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y - 6);
    ctx.lineTo(p3.x, 0);
    ctx.closePath();
    ctx.fill();
  }

  // Estalactites partindo da borda inferior do teto rochoso
  for (let sx = 40; sx < limiteMundo; sx += passoRocha) {
    const baseTeto = 24 + ((Math.abs(sx) * 17) % 18);
    const comp = 22 + ((sx * 13) % 28);

    ctx.fillStyle = "#161a24";
    ctx.beginPath();
    ctx.moveTo(sx - 18, baseTeto - 3);
    ctx.lineTo(sx + 18, baseTeto - 3);
    ctx.lineTo(sx + 2, baseTeto + comp);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#283044";
    ctx.beginPath();
    ctx.moveTo(sx - 12, baseTeto - 3);
    ctx.lineTo(sx + 2, baseTeto - 3);
    ctx.lineTo(sx + 2, baseTeto + comp - 4);
    ctx.closePath();
    ctx.fill();
  }

  // Borda inferior iluminada da rocha do teto
  ctx.strokeStyle = "#343e56";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < pontosContorno.length; i++) {
    const pt = pontosContorno[i];
    if (i === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  }
  ctx.stroke();

  ctx.restore();
}

function desenharCenarioCaverna(configNivel) {
  const gradCeu = ctx.createLinearGradient(0, 0, 0, CHAO_Y);
  gradCeu.addColorStop(0, "#090c12");
  gradCeu.addColorStop(0.5, "#151b27");
  gradCeu.addColorStop(1, "#26212d");
  ctx.fillStyle = gradCeu;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Pilares rochosos de fundo e cristais distantes conectando teto e chão
  ctx.save();
  ctx.translate(-estadoJogo.cameraX * 0.25, 0);
  for (let px = 190; px < configNivel.distanciaMeta; px += 460) {
    ctx.fillStyle = "rgba(15, 19, 29, 0.65)";
    ctx.beginPath();
    ctx.moveTo(px - 28, 25);
    ctx.lineTo(px + 28, 25);
    ctx.lineTo(px + 18, CHAO_Y * 0.52);
    ctx.lineTo(px + 34, CHAO_Y);
    ctx.lineTo(px - 34, CHAO_Y);
    ctx.lineTo(px - 18, CHAO_Y * 0.52);
    ctx.closePath();
    ctx.fill();
  }

  for (let cx = 140; cx < configNivel.distanciaMeta; cx += 340) {
    ctx.fillStyle = "rgba(56, 189, 248, 0.08)";
    ctx.beginPath();
    ctx.moveTo(cx, CHAO_Y - 12);
    ctx.lineTo(cx + 12, CHAO_Y - 52);
    ctx.lineTo(cx + 24, CHAO_Y - 12);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Teto de rocha e estalactites
  desenharTetoCaverna(configNivel);

  ctx.save();
  ctx.translate(-estadoJogo.cameraX, 0);

  desenharChaoComAbismosSemFundo(configNivel);

  for (let i = 0; i < estadoJogo.obstaculos.length; i++) {
    const obs = estadoJogo.obstaculos[i];

    ctx.fillStyle = "#2d2834";
    ctx.beginPath();
    ctx.moveTo(obs.x, obs.y + obs.altura);
    ctx.lineTo(obs.x + 8, obs.y + 8);
    ctx.lineTo(obs.x + obs.largura * 0.35, obs.y);
    ctx.lineTo(obs.x + obs.largura * 0.72, obs.y + 3);
    ctx.lineTo(obs.x + obs.largura - 6, obs.y + 10);
    ctx.lineTo(obs.x + obs.largura, obs.y + obs.altura);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#4b4356";
    ctx.fillRect(obs.x + 6, obs.y, obs.largura - 12, 8);

    ctx.fillStyle = "#675c75";
    ctx.fillRect(obs.x + 10, obs.y, Math.max(12, obs.largura - 24), 3);
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
  const batidaAsa = Math.sin(estadoJogo.frameAtual * frequenciaAsa + inimigo.faseAsa);

  ctx.save();
  ctx.translate(centroX, centroY);
  ctx.scale(dir, 1);

  const asaTrasY = -batidaAsa * amplitudeAsa - 3;
  ctx.fillStyle = emDano ? "#ffd43b" : "#3a2e47";
  ctx.beginPath();
  ctx.moveTo(2, -3);
  ctx.quadraticCurveTo(11, asaTrasY - 11, 25, asaTrasY + 1);
  ctx.quadraticCurveTo(15, asaTrasY + 10, 4, 3);
  ctx.closePath();
  ctx.fill();

  const asaFrenteY = batidaAsa * (amplitudeAsa + 2) - 4;
  const gradAsa = ctx.createLinearGradient(-2, -5, -26, asaFrenteY + 9);
  gradAsa.addColorStop(0, emDano ? "#ffffff" : "#6c537a");
  gradAsa.addColorStop(1, emDano ? "#ff8787" : "#32233b");

  ctx.fillStyle = gradAsa;
  ctx.strokeStyle = "#140f17";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-2, -3);
  ctx.quadraticCurveTo(-13, asaFrenteY - 13, -27, asaFrenteY + 1);
  ctx.quadraticCurveTo(-21, asaFrenteY + 11, -11, asaFrenteY + 6);
  ctx.quadraticCurveTo(-6, asaFrenteY + 12, -2, 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "rgba(216, 245, 162, 0.22)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-4, -2);
  ctx.lineTo(-23, asaFrenteY + 1);
  ctx.moveTo(-4, 0);
  ctx.lineTo(-15, asaFrenteY + 8);
  ctx.stroke();

  const gradCorpo = ctx.createRadialGradient(-2, -2, 2, 0, 1, 15);
  gradCorpo.addColorStop(0, emDano ? "#ffffff" : "#806191");
  gradCorpo.addColorStop(1, emDano ? "#ff8787" : "#2c1e33");

  ctx.fillStyle = gradCorpo;
  ctx.strokeStyle = "#120c14";
  ctx.lineWidth = 1.7;
  ctx.beginPath();
  ctx.ellipse(2, 1, 13, 8.5, -0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = emDano ? "#ffffff" : "#3a2842";
  ctx.beginPath();
  ctx.moveTo(13, -1);
  ctx.lineTo(22, 1);
  ctx.lineTo(13, 4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = emDano ? "#ffffff" : "#4a3354";
  ctx.beginPath();
  ctx.ellipse(-9, 1, 7.5, 6.5, 0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#d8f5a2";
  ctx.beginPath();
  ctx.arc(-11.5, -1.2, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#120c14";
  ctx.fillRect(-12, -2.5, 1.3, 2.6);

  ctx.fillStyle = "#f1f3f5";
  ctx.beginPath();
  ctx.moveTo(-14.5, 4);
  ctx.lineTo(-17.5, 8.5);
  ctx.lineTo(-11.5, 5.5);
  ctx.closePath();
  ctx.fill();

  const tempoDesdeTiro = estadoJogo.frameAtual - inimigo.ultimoAcidoFrame;
  const prestesAtirar = inimigo.ativoPatrulha && inimigo.cadenciaAcido - tempoDesdeTiro <= 35;
  if (prestesAtirar) {
    ctx.fillStyle = "#94d82d";
    ctx.beginPath();
    ctx.arc(-16.5, 6.5, 2.8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
  desenharBarraVidaInimigo(inimigo);
}

function desenharRastejadorAlien(inimigo) {
  if (inimigo.ocultoNaTerra) return;

  const ehAzul = inimigo.variante === "azul";
  const saltandoAzul = inimigo.estado === "saltando_azul";
  const saltandoMergulho = inimigo.estado === "saltando_mergulho";
  const mergulhando = inimigo.estado === "mergulhando";
  const saindo = inimigo.estado === "saindo_terra";
  const dir = inimigo.direcaoOlhar || -1;
  const emDano = inimigo.danoFrames > 0;
  const emAlerta = inimigo.estado !== "esperando";
  const corOlho = emDano
    ? "#ff2a55"
    : emAlerta
    ? "#e03131"
    : "#ddb892";

  const corSegmentoPar = ehAzul ? "#339af0" : "#9c6644";
  const corSegmentoImpar = ehAzul ? "#1c7ed6" : "#7f5539";
  const corCabeca = ehAzul ? "#74c0fc" : "#b08968";
  const corEspinho = ehAzul ? "#a5d8ff" : "#c8553d";

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
        ? corSegmentoPar
        : corSegmentoImpar;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, raio, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = emDano ? "#ffd43b" : corEspinho;
      ctx.beginPath();
      ctx.moveTo(
        pt.x + normalX * raio - Math.cos(tangenteAngulo) * 2,
        pt.y + normalY * raio - Math.sin(tangenteAngulo) * 2
      );
      ctx.lineTo(
        pt.x + normalX * (raio + 4.5 * (1 - proporcao * 0.4)),
        pt.y + normalY * (raio + 4.5 * (1 - proporcao * 0.4))
      );
      ctx.lineTo(
        pt.x + normalX * raio + Math.cos(tangenteAngulo) * 2,
        pt.y + normalY * raio + Math.sin(tangenteAngulo) * 2
      );
      ctx.closePath();
      ctx.fill();
    }

    const ptCabeca = inimigo.rastroPulo[0];
    const anguloCabeca = Math.atan2(ptCabeca.vy, ptCabeca.vx);

    ctx.save();
    ctx.translate(ptCabeca.x, ptCabeca.y);
    ctx.rotate(anguloCabeca);
    ctx.scale(-1, dir === 1 ? 1 : -1);

    ctx.fillStyle = emDano ? "#ffffff" : corCabeca;
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

    ctx.fillStyle = corOlho;
    ctx.beginPath();
    ctx.arc(-2, -3, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#111417";
    ctx.fillRect(-2.5, -5, 1.5, 4);

    ctx.restore();
    ctx.restore();
    desenharBarraVidaInimigo(inimigo);
    return;
  }

  const baseY = inimigo.y + inimigo.altura;
  const seMovendo = Math.abs(inimigo.vx) > 0.05 || saltandoAzul || saindo;
  const freq = seMovendo ? 0.16 : 0.06;
  const ampOnda = seMovendo ? 3.2 : 0.8;
  const tempo = estadoJogo.frameAtual * freq + inimigo.faseCobra;

  const centroX = inimigo.x + inimigo.largura / 2;
  ctx.translate(centroX, baseY);
  ctx.scale(-dir, 1);

  if (saltandoAzul || saindo) {
    const anguloPulo = Math.max(-0.85, Math.min(0.45, inimigo.vy * 0.08));
    ctx.rotate(anguloPulo);
  }

  const cabecaX = -14;
  const cabecaY = -12 + Math.sin(tempo) * (seMovendo ? 1.8 : 0.4);

  const segmentos = 6;
  for (let s = segmentos; s >= 1; s--) {
    const proporcao = s / segmentos;
    const segX = cabecaX + s * 7;
    const ondaY = Math.sin(tempo - s * 0.85) * (ampOnda * proporcao);
    const segY = -9 + ondaY;
    const raio = Math.max(3.5, 9 * (1 - proporcao * 0.55));

    if (emDano) {
      ctx.fillStyle = s % 2 === 0 ? "#ffffff" : "#ff6b6b";
    } else {
      ctx.fillStyle = s % 2 === 0 ? corSegmentoPar : corSegmentoImpar;
    }
    ctx.beginPath();
    ctx.arc(segX, segY, raio, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = emDano
      ? "#ffd43b"
      : inimigo.estado === "atacando"
      ? corEspinho
      : "#ddb892";
    ctx.beginPath();
    ctx.moveTo(segX - 2, segY - raio);
    ctx.lineTo(segX + 1, segY - raio - 4 * (1 - proporcao * 0.4));
    ctx.lineTo(segX + 4, segY - raio);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = emDano ? "#ffffff" : corCabeca;
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

  ctx.fillStyle = corOlho;
  ctx.beginPath();
  ctx.arc(cabecaX - 2, cabecaY - 3, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#111417";
  ctx.fillRect(cabecaX - 2.5, cabecaY - 5, 1.5, 4);

  ctx.restore();
  desenharBarraVidaInimigo(inimigo);
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

  let anguloArma = 0;
  if (soldado.mirandoParado) {
    const dxLocal = soldado.miraDx * soldado.direcao;
    const dyLocal = soldado.miraDy;
    anguloArma = Math.atan2(dyLocal, dxLocal === 0 ? 0.0001 : dxLocal);
  } else if (soldado.olhandoCima) {
    anguloArma = -Math.PI / 2;
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

    desenharFuzil(11 + impulsoRastejarX * 0.4, -9 + elevacaoTroncoY * 0.6, anguloArma, atirouAgora);
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

    desenharFuzil(2, -35 + balancoTronco, anguloArma, atirouAgora);
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

  ctx.save();
  ctx.translate(-estadoJogo.cameraX, 0);

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
    } else if (inimigo.tipo === "voador_acido") {
      desenharVoadorAcidoRealista(inimigo);
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

  for (let i = 0; i < estadoJogo.tirosJogador.length; i++) {
    const t = estadoJogo.tirosJogador[i];
    ctx.save();
    ctx.translate(t.x + t.largura / 2, t.y + t.altura / 2);
    ctx.rotate(t.angulo || 0);
    ctx.fillStyle = "#ffe066";
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

      ctx.fillStyle = "#d8f5a2";
      ctx.beginPath();
      ctx.arc(cx - 1.5, cy - 1.5, 2.5, 0, Math.PI * 2);
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

  desenharHudNoCanvas(configNivel);
  desenharAcaoVitoriaOverlay();
}

// =========================================================
// 10. LOOP PRINCIPAL
// =========================================================
function loopPrincipal() {
  if (estadoJogo.status === "lobby") {
    estadoJogo.frameAtual++;
    atualizarLobbyCuphead();
  } else if (estadoJogo.status === "jogando") {
    estadoJogo.frameAtual++;
    atualizarPlataformas();
    atualizarMiraESoldado();
    gerarInimigos();
    atualizarInimigos();
    atualizarCaminhosSubterraneos();
    atualizarBuracosChao();
    atualizarBoss();
    atualizarProjeteis();
    atualizarParticulasDano();
  } else if (estadoJogo.status === "vitoria_fase") {
    estadoJogo.frameAtual++;
    atualizarAcaoVitoriaFase();
  }

  desenharCena();
  requestAnimationFrame(loopPrincipal);
}

// Inicialização ao carregar o script
registrarEventos();
atualizarBotaoMusicaUI();
irParaTelaPressKey();
loopPrincipal();