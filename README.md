# 🎮 Operação Vanguarda

![HTML5](https://img.shields.io/badge/HTML5-Canvas_2D-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Responsive_UI-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Web Audio API](https://img.shields.io/badge/Audio-Web_Audio_API-4A90E2?style=for-the-badge)

**Operação Vanguarda** é um jogo de ação e plataforma 2D no estilo *Run and Gun* (inspirado em clássicos como *Contra* e *Cuphead*), desenvolvido inteiramente com **HTML5 Canvas, CSS3 e JavaScript puro (Vanilla JS)**, sem uso de engines externas ou bibliotecas de terceiros.

Todo o universo visual — incluindo cenários com paralaxe, animações de personagens, partículas, efeitos de impacto — e toda a trilha sonora e efeitos sonoros são **gerados proceduralmente via código**.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Fases e Inimigos](#-fases-e-inimigos)
- [Controles](#-controles)
- [Arquitetura e Tecnologias](#-arquitetura-e-tecnologias)
- [Como Executar Localmente](#-como-executar-localmente)
- [Roadmap de Melhorias](#-roadmap-de-melhorias)
- [Autor](#-autor)

---

## 🎯 Sobre o Projeto

O jogador assume o papel de um soldado de elite da **Operação Vanguarda**, avançando por um mapa interativo estilo *overworld* para libertar três setores hostis tomados por criaturas alienígenas. O projeto foi concebido com foco em responsividade de controles, física 2D personalizada, inteligência artificial baseada em estados e áudio dinâmico por fase.

---

## ✨ Funcionalidades Principais

- **Mapa Interativo de Lobby (Overworld):** Navegação livre entre os nós das fases com sistema de desbloqueio progressivo e salvamento automático via `localStorage`.
- **Combate Tático e Mira em 8 Direções:** Sistema de trava de mira estacionária (`K` ou `X`), disparo vertical para cima/baixo, postura agachada/rastejando para atravessar ruínas baixas e descida rápida através de plataformas.
- **Física e Interação com o Cenário:**
  - Colisão AABB precisa com detecção de teto (impede o personagem de levantar sob estruturas baixas).
  - Plataformas instáveis que tremem e desmoronam após serem pisadas.
  - Abismos sem fundo com detecção de queda.
- **Trilha Sonora e SFX Procedurais (Web Audio API):**
  - Melodias e linhas de baixo sintetizadas exclusivas para o Lobby e para cada uma das 3 fases.
  - Efeitos sonoros gerados em tempo real para disparos, pulos, danos, vitórias, derrotas, risadas e golpes do Boss.
- **Interface Completa:** Tela inicial *Press Any Key*, Menu Principal, Menu de Pause (`Esc`), tela de Controles, Opções (música e modo Tela Cheia) e HUD integrado ao Canvas.

---

## 🗺️ Fases e Inimigos

### Setores da Campanha
1. **Setor 1 — Ruínas Pós-Apocalípticas:** Cenário urbano devastado com paralaxe de prédios em ruínas, passagens baixas que exigem rastejar e plataformas desmoronáveis.
2. **Setor 2 — Caverna Profunda:** Ambiente subterrâneo com estalactites, abismos profundos, plataformas suspensas e emboscadas aéreas.
3. **Setor 3 — Núcleo do Boss:** Arena fechada para o confronto final contra o Comandante Alienígena.

### Bestiário
- **Rastejador Terrestre (Marrom):** Avança em direção ao jogador e, ao encontrar obstáculos, salta e escava túneis subterrâneos em formato de **"U"** deixando rastros de terra na superfície.
- **Rastejador Saltador (Azul):** Variante ágil capaz de calcular impulsos e saltar diretamente sobre obstáculos e abismos estreitos.
- **Voador Ácido:** Patrulha o espaço aéreo em movimento senoidal, sinaliza visualmente antes do ataque e dispara projéteis corrosivos direcionados à posição do jogador.
- **Boss Extraterrestre:** Possui máquina de estados própria com múltiplas ações:
  - *Soco Sísmico no Chão:* Causa tremor de tela e invoca rastejadores na arena.
  - *Chamado Aéreo:* Invoca voadores ácidos para posições estratégicas superiores.
  - *Salto de Arena:* Agacha e salta de um lado ao outro do cenário para pressionar o jogador.

---

## 🎮 Controles

| Ação | Teclas |
| :--- | :--- |
| **Mover / Andar** | `A` / `D` ou `←` / `→` |
| **Mirar para Cima** | `W` ou `↑` (segurar) |
| **Agachar / Rastejar** | `S` ou `↓` (segurar) |
| **Descer de Plataforma** | `S` / `↓` + `Espaço` |
| **Travar Mira (8 direções)** | Segurar `K` ou `X` + `WASD` / `Setas` |
| **Pular** | `Espaço` |
| **Atirar** | `J` ou `Z` |
| **Entrar na Fase (Lobby)** | `Enter`, `Espaço` ou Clique no nó |
| **Ativar/Desativar Música** | `M` |
| **Reiniciar Fase** | `R` |
| **Pausar / Voltar** | `Esc` |

---

## 🏗️ Arquitetura e Tecnologias

```text
operacao-vanguarda/
├── index.html          # Estrutura semântica, Canvas e overlays de UI (Menus/Pause/Fim)
├── css/
│   └── estilo.css      # Estilização responsiva em tela cheia, animações e layout dos painéis
├── js/
│   └── jogo.js         # Engine 2D: Loop principal, física, IA, renderização Canvas e Web Audio
└── README.md           # Documentação do projeto