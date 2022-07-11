// Importar a próxima cena
import { fase1 } from "./fase1.js";

// Criar a cena 0
var cena0 = new Phaser.Scene("cena0");

cena0.preload = function () {
  // Imagem de fundo
  this.load.image("cadeado", "assets/start.png");
};

cena0.create = function () {
  // Botão com a imagem de fundo
  var button = this.add.image(320, 180, "cadeado", 0).setInteractive();

  // Ao clicar no botão, inicia a cena 1
  button.on(
    "pointerdown",
    function () {
      this.scale.startFullscreen();
      this.scene.start(fase1);
    },
    this
  );
};

cena0.update = function () { };

// Exportar a cena
export { cena0 };