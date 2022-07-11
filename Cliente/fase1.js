var fase1 = new Phaser.Scene("fase 1");


var player1;
var cursors;
var cameras;
var inventoryText;
var inventory = 0;
var book1;
var book2;
var book3;
var book4;
var book5;
var book6;
var book7;
var sombra;
var ice_servers = {
    iceServers: [
        {
            urls: "stun:ifsc.cloud",
        },
        {
            urls: "turns:ifsc.cloud",
            username: "etorresini",
            credential: "matrix",
        },
    ],
};

fase1.preload = function () {
    this.load.image("bibli", "./assets/bibli.png");
    this.load.tilemapTiledJSON("map", "./assets/biblo.json");
    this.load.spritesheet("player1", "./assets/Mono.png", { frameWidth: 72, frameHeight: 72, });
    this.load.spritesheet("book1", "./assets/book1.png", { frameWidth: 1000, frameHeight: 1000, });
    this.load.spritesheet("book2", "./assets/book2.png", { frameWidth: 1000, frameHeight: 1000, });
    this.load.spritesheet("book3", "./assets/book3.png", { frameWidth: 1000, frameHeight: 1000, });
    this.load.spritesheet("book4", "./assets/book4.png", { frameWidth: 1000, frameHeight: 1000, });
    this.load.spritesheet("book5", "./assets/book5.png", { frameWidth: 1000, frameHeight: 1000, });
    this.load.spritesheet("book6", "./assets/book6.png", { frameWidth: 1000, frameHeight: 1000, });
    this.load.spritesheet("book7", "./assets/book7.png", { frameWidth: 1000, frameHeight: 1000, });
    this.load.spritesheet("sombra", "./assets/Sombra.png", { frameWidth: 960, frameHeight: 960, });
}

fase1.create = function () {
    cursors = this.input.keyboard.createCursorKeys();

    //Mapa e Colisão
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("bibli", "bibli");
    const belowLayer = map.createLayer("belowplayer", tileset, 0, 0);
    const worldLayer = map.createLayer("world", tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    //Spawn//Tamanho do bloco de colisão do Player
    player1 = this.physics.add.sprite(47, 800, "player1", 0).setScale(0.4);
    player1.setSize(38, 69, true);

    //Colisão com Player e WorldLayer
    var physics = this.physics;
    physics.add.collider(player1, worldLayer);
    player1.setCollideWorldBounds(true);

    //Animaçao
    this.anims.create({
        key: "down1",
        frames: this.anims.generateFrameNumbers("player1", { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1,
    });
    this.anims.create({
        key: "left1",
        frames: this.anims.generateFrameNumbers("player1", { start: 4, end: 7 }),
        frameRate: 8,
        repeat: -1,
    });
    this.anims.create({
        key: "turn1",
        frames: [{ key: "player1", frame: 0 }],
        frameRate: 20,
    });
    this.anims.create({
        key: "right1",
        frames: this.anims.generateFrameNumbers("player1", { start: 8, end: 11 }),
        frameRate: 8,
        repeat: -1,
    });
    this.anims.create({
        key: "up1",
        frames: this.anims.generateFrameNumbers("player1", { start: 12, end: 15 }),
        frameRate: 8,
        repeat: -1,
    });
    //Camera
    var cameras = this.cameras;
    //this.cameras.main.setBounds(0, 0, 960, 960);
    this.physics.world.setBounds(0, 0, 960, 960);
    this.cameras.main.setZoom(1);
    cameras.main.startFollow(player1);

    //Itens
    book1 = this.physics.add.sprite(495, 385, "book1").setScale(0.4); //Vermelho OK
    book2 = this.physics.add.sprite(440, 567, "book2").setScale(0.4); //Amarelo OK
    book3 = this.physics.add.sprite(913, 47, "book3").setScale(0.4);
    book4 = this.physics.add.sprite(785, 272, "book4").setScale(0.4);
    book5 = this.physics.add.sprite(440, 810, "book5").setScale(0.4); //Azul OK
    book6 = this.physics.add.sprite(495, 50, "book6").setScale(0.4);
    book7 = this.physics.add.sprite(39, 265, "book7").setScale(0.4); //ok
    //Coleta dos livros
    this.physics.add.overlap(player1, book1, collectbook, null, this);
    this.physics.add.overlap(player1, book2, collectbook, null, this);
    this.physics.add.overlap(player1, book3, collectbook, null, this);
    this.physics.add.overlap(player1, book4, collectbook, null, this);
    this.physics.add.overlap(player1, book5, collectbook, null, this);
    this.physics.add.overlap(player1, book6, collectbook, null, this);
    this.physics.add.overlap(player1, book7, collectbook, null, this);
    //Inventario
    var add = this.add;
    inventoryText = add.text(100, 100, "0",
        {
            fontSize: "64px",
            fill: "#fff",
        });

    //sombra = this.physics.add.sprite(0, 0, "sombra")
    //var sombra = this.sombra
    //sombra.main.startFollow(player1);
    //const rt = this.make.renderTexture({
    //       width,
    //      height
    //  }, true)

    // fill it with black
    //  rt.fill(0x000000, 1)

    // draw the floorLayer into it
    //   rt.draw(belowplayer)

    // set a dark blue tint
    //   rt.setTint(0x0a2948)
}

fase1.update = function (time, delta) {
    if (cursors.down.isDown) {
        player1.setVelocityY(160);

        player1.anims.play('down1', true);
    }
    else if (cursors.left.isDown) {
        player1.setVelocityX(-160);

        player1.anims.play('left1', true);
    }
    else if (cursors.right.isDown) {
        player1.setVelocityX(160);

        player1.anims.play('right1', true);
    }
    else if (cursors.up.isDown) {
        player1.setVelocityY(-160);

        player1.anims.play('up1', true);
    }
    else {
        player1.setVelocityX(0);
        player1.setVelocityY(0);
        player1.anims.play('turn1');
    }


}
function collectbook(player1, book1) {
    //chave some quando coletada
    book1.disableBody(true, true);
}




export { fase1 };