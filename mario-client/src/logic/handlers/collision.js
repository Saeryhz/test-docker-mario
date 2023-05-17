import constants from '../../constants/index.js';

export default function handleCollisions() {
    onCollide('coin', 'enemy', (coin, enemy) => {
        destroy(coin);
        destroy(enemy);
    });

    onCollide('player', 'goomba', (player, enemy) => {
        if (!player.isGrounded()) {
            if (enemy.isAlive) {
                enemy.squash();
                player.jump(constants.JUMP_FORCE / 2);
                player.score += constants.game.ENEMY_KILL_REWARD;
                add([text('+' + constants.game.ENEMY_KILL_REWARD), pos(player.pos.x, player.pos.y - 30), lifespan(0.6, { fade: 0.3 }), layer('game')]);
            }
        } else {
            player.kill();
        }
    });
}