// Importar todas as cenas
import { cena0 } from "./cena0.js";
import { fase1 } from "./fase1.js";

// Configuração do jogo
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width:  640,
    height: 360,
  },
  scene: [cena0, fase1],
};

// Criar o objeto principal
const game = new Phaser.Game(config);