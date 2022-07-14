
// Importar a próxima cena

// Criar a cena 0
var win = new Phaser.Scene("win");

win.preload = function () {
  // Imagem de fundo
  this.load.image("win", "assets/win.png");
};

win.create = function () { };

win.update = function () { };

// Exportar a cena
export { win };