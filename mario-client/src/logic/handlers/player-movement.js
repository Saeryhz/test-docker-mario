import constants from '../../constants/index.js';
import socket from '../../online/socket.js';
import * as logic from '../index.js';

export default function handlePlayerMovement(player) {
    onKeyPress(constants.keyboard.INPUT_JUMP, () => {
        if (player.isGrounded() && !player.isFrozen) {
            player.jump(constants.game.JUMP_FORCE);
            socket.emit('onPlayerMovement', {
                direction: 'jump',
                x: player.pos.x,
                y: player.pos.y
            });
        }
    });

    onKeyPress(constants.keyboard.INPUT_ACTION, () => {
        if (!player.isFrozen) {
            logic.shootCoin(player);
        }
    });

    onKeyDown(constants.keyboard.INPUT_LEFT, () => {
        if (!player.isFrozen) {
            player.flipX(true);
            player.move(-constants.game.PLAYER_MOVE_SPEED, 0);
            socket.emit('onPlayerMovement', {
                direction: 'left',
                x: player.pos.x,
                y: player.pos.y
            });
        }
    });

    onKeyDown(constants.keyboard.INPUT_RIGHT, () => {
        if (!player.isFrozen) {
            player.flipX(false);
            player.move(constants.game.PLAYER_MOVE_SPEED, 0);
            socket.emit('onPlayerMovement',
                {
                    direction: 'right',
                    x: player.pos.x,
                    y: player.pos.y
                });
        }
    });
}