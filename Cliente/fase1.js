import { win } from "./win.js";
import { restart } from "./restart.js";


var fase1 = new Phaser.Scene("fase 1");


var player1;
var cursors;
var cameras;
var saida;
var inventoryText;
var inventory = 0;
var timer = -1;
var timerText;
var timedEvent;
var book1;
var book2;
var book3;
var book4;
var book5;
var book6;
var book7;
var sombra;
var camera0;
var wingame
var restartgame
var camera0
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
    this.load.spritesheet("sombra", "./assets/sombra.png", { frameWidth: 960, frameHeight: 960, });
    this.load.spritesheet("saida", "./assets/saida.png", {
        frameWidth: 19, frameHeight: 18,
    });
}

fase1.create = function () {
    var time = this.time;
    cursors = this.input.keyboard.createCursorKeys();
    timer = -1;
    wingame = false
    restartgame = false

    //Mapa e Colisão
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("bibli", "bibli");
    const belowLayer = map.createLayer("belowplayer", tileset, 0, 0);
    const worldLayer = map.createLayer("world", tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    var add = this.add;

    //Spawn//Tamanho do bloco de colisão do Player
    player1 = this.physics.add.sprite(47, 850, "player1", 0).setScale(0.4);
    player1.setSize(38, 65, true);

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
    cameras.main.setBounds(0, 0, 960, 960);
    camera0 = this.cameras.add(23, 400, 960, 960);
    cameras.startFollow(player1);
    var camera0 = this.camera0
    this.cameras.setZoom(1);

    //Itens
    book1 = this.physics.add.sprite(495, 385, "book1").setScale(0.4); //Vermelho OK
    book2 = this.physics.add.sprite(440, 567, "book2").setScale(0.4); //Amarelo OK
    book3 = this.physics.add.sprite(913, 47, "book3").setScale(0.4);
    book4 = this.physics.add.sprite(785, 272, "book4").setScale(0.4);
    book5 = this.physics.add.sprite(440, 810, "book5").setScale(0.4); //Azul OK
    book6 = this.physics.add.sprite(495, 50, "book6").setScale(0.4);
    book7 = this.physics.add.sprite(39, 265, "book7").setScale(0.4); //ok
    saida = this.physics.add.sprite(800, 10, "saida");
    //Coleta dos livros
    this.physics.add.overlap(player1, book1, collectbook, null, this);
    this.physics.add.overlap(player1, book2, collectbook, null, this);
    this.physics.add.overlap(player1, book3, collectbook, null, this);
    this.physics.add.overlap(player1, book4, collectbook, null, this);
    this.physics.add.overlap(player1, book5, collectbook, null, this);
    this.physics.add.overlap(player1, book6, collectbook, null, this);
    this.physics.add.overlap(player1, book7, collectbook, null, this);
    //Inventario 
    //sombra = this.physics.add.sprite(100, 800, "sombra")
    this.physics.add.overlap(player1, saida, touchSaida, null, this);
    timer = 5;
    timedEvent = time.addEvent({
        delay: 1000,
        callback: countdown,
        callbackScope: this,
        loop: true,
    });
    inventoryText = this.add.text(10, 770, "0", { fontSize: "16px", fill: "#fff", }).setScrollFactor(0)
    timerText = this.add.text(280, 770, "150", { fontSize: "64px", fill: "#fff", }).setScale(0.2)//.setScrollFactor(0);
}

fase1.update = function (time, delta) {
    if (wingame === true) {
        //musicagameplay.stop();
        this.scene.stop(fase1);
        this.scene.start(win);
    } else if (restartgame === true) {
        //musicagameplay.stop();
        this.scene.stop(fase1);
        this.scene.start(restart);
    }

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
    //inventoryText.x = player1.body.position.x;
    //inventoryText.y = player1.body.position.y;
    //timerText.x = player1.body.position.x;
    //timerText.y = player1.body.position.y;
    //sombra.x = player1.body.position.x;
   // sombra.y = player1.body.position.y;


}
function touchSaida(player1, saida) {
    if (inventory === 1 && timer > 0) {
        wingame = true
        //musicagameplay.stop();
        //this.scene.stop(fase1);
        //this.scene.start(win);
    } else if (timer === 0) {
        restartgame = true
        //musicagameplay.stop();
        //this.scene.stop(fase1);
        //this.scene.start(restart);
    }
}
function collectbook(player1, book1) {
    //chave some quando coletada
    book1.disableBody(true, true);
    inventory += 1;
    inventoryText.setText(inventory);
}
function countdown() {
    //Contador decrementa em 1 segundo
    timer -= 1;
    timerText.setText(timer);
}

export { fase1 };