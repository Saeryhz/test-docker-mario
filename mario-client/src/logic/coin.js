import constants from '../constants/index.js';

export default function shootCoin(player) {
    add([
        sprite('coin'),
        area(),
        pos(player.pos.x, player.pos.y),
        origin('bot'),
        move(RIGHT, constants.game.ENEMY_SPEED),
        cleanup(),
        layer('game'),
        'coin',
    ]);
}