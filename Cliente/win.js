// Importar a próxima cena
import { fase1 } from "./cena0";

// Criar a cena 0
var win = new Phaser.Scene("win");

win.preload = function () {
  // Imagem de fundo
  this.load.image("win", "assets/win.png");
};

win.create = function () {
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

win.update = function () { };

// Exportar a cena
export { win };