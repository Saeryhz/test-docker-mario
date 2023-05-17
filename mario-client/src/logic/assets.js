export default function loadAssets() {
    loadRoot('src/sprites/');
    loadAseprite('mario', 'mario.png', 'mario.json');
    loadAseprite('enemies', 'enemies.png', 'enemies.json');
    loadSprite('sky', 'sky.jpg');
    loadSprite('coin', 'coin.png');
    loadSprite('bigMushy', 'bigMushy.png');
    loadSprite('brick', 'brick.png');
    loadSprite('castle', 'castle.png');
    loadSprite('emptyBox', 'emptyBox.png');
    loadSprite('ground', 'ground.png');
    loadSprite('pipe', 'pipe.png');
    loadSprite('pipeBottom', 'pipeBottom.png');
    loadSprite('pipeTop', 'pipeTop.png');
    loadSprite('questionBox', 'questionBox.png');
    loadSprite('cloud', 'cloud.png');
    loadSprite('hill', 'hill.png');
    loadSprite('shrubbery', 'shrubbery.png');
}