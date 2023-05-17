import constants from '../constants/index.js';
import * as handlers from '../logic/handlers/index.js';
import * as logic from '../logic/index.js';
import * as worlds from '../worlds/index.js';
import socket from '../online/socket.js';

export default function gameScene() {
    // Connexion du joueur
    let TODO_CURRENT_PLAYERNAME = 'William' + Math.floor(Math.random() * (999 - 1 + 1) + 1);
    let players = [];

    socket.emit('onCurrentPlayerConnect', { playerName: TODO_CURRENT_PLAYERNAME, x: constants.game.DEFAULT_SPAWN.x, y: constants.game.DEFAULT_SPAWN.y });
    debug.log(`${TODO_CURRENT_PLAYERNAME} (vous) a rejoint`);

    scene('game', (currentLevel = 0) => {
        // Récupération des données du jeu auprès du serveur (joueurs, scores, etc)
        socket.emit('getGameData', (gameData) => {
            gameData.players.forEach(player => {
                if (player.playerId !== socket.id) {
                    players[player.playerId] = add([sprite('mario', { frame: 0 }), pos(player.x, player.y), area({ width: 16, height: 16 }), body(), origin('bot'), layer('game'), logic.player(), 'player', { playerName: player.playerName }]);
                }
            });
        });

        // On affiche le joueur
        let currentPlayer = add([sprite('mario', { frame: 0 }), pos(constants.game.DEFAULT_SPAWN.x, constants.game.DEFAULT_SPAWN.y), area({ width: 16, height: 16 }), body(), origin('bot'), layer('game'), logic.player(), 'player', { playerName: TODO_CURRENT_PLAYERNAME }]);

        // Lorsqu'un autre joueur se connecte
        socket.on('onPlayerConnect', (newPlayer) => {
            if (newPlayer.playerId !== socket.id) {
                players[newPlayer.playerId] = add([sprite('mario', { frame: 0 }), pos(newPlayer.x, newPlayer.y), area({ width: 16, height: 16 }), body(), origin('bot'), layer('game'), logic.player(), 'player', { playerName: newPlayer.playerName }]);
                debug.log(`${players[newPlayer?.playerId]?.playerName} a rejoint`);
            }
        });

        // Lorsqu'un autre joueur se déconnecte
        socket.on('onPlayerLeave', (disconnectedPlayer) => {
            destroy(players[disconnectedPlayer?.playerId]);
            debug.log(`${players[disconnectedPlayer?.playerId]?.playerName} est parti`);
        });

        // Lorsqu'un autre joueur meurt
        socket.on('onPlayerDeath', (data) => {
            let player = players[data.deadPlayer.playerId];
            if (player) {
                console.log('un autre joueur est mort')
                debug.log(`${player?.playerName} est mort par ${data.killedBy}`)
            } else {
                console.log('le joueur actuel est mort')
                debug.log(`${TODO_CURRENT_PLAYERNAME} est mort par ${data.killedBy}`)
            }
        });

        // Lorsqu'un autre joueur bouge
        socket.on('onPlayerMovement', (data) => {
            if (data.playerId !== socket.id) {
                players[data.playerId].moveTo(data.x, data.y);
                switch (data.direction) {
                    case 'left':
                        players[data.playerId].flipX(true);
                        break;
                    case 'right':
                        players[data.playerId].flipX(false);
                        break;
                    case 'jump':
                        players[data.playerId].jump(constants.JUMP_FORCE);
                        break;
                    default:
                        break;
                }
            }
        });

        layers(['background', 'game', 'ui'], 'game');
        gravity(constants.game.GRAVITY);
        add([text('Level ' + (currentLevel + 1), { size: 24 }), pos(170, 50), origin('center'), layer('ui'),/* lifespan(1, { fade: 0.5 })*/]);

        const scoreLabel = add([text(currentPlayer.score), pos(5, 30), fixed(), layer('ui'), 'score']);
        const gameLevel = addLevel(worlds.dev.LEVELS[currentLevel], worlds.world1.CONFIG);

        currentPlayer.onUpdate(() => {
            // La caméra suit le joueur
            camPos(currentPlayer.pos.x, camPos().y);

            // Tue le joueur si il tombe de la map
            if (currentPlayer.pos.y > height() - 10) {
                socket.emit('onPlayerDeath', { killedBy: 'chute' });
                currentPlayer.kill();
            }
        });

        onUpdate(() => {
            currentPlayer.score++;
            scoreLabel.text = 'Score:' + currentPlayer.score;
        });

        handlers.handlePlayerMovement(currentPlayer);
        handlers.handleCollisions();
    })
}
