var restart = new Phaser.Scene("restart");

restart.preload = function () {
  // Imagem de fundo
  this.load.image("restart", "assets/restart.png");
};

restart.create = function () {
  // Botão com a imagem de fundo
  var button = this.add.image(320, 180, "restart", 0).setInteractive();

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

restart.update = function () { };

// Exportar a cena
export { restart };