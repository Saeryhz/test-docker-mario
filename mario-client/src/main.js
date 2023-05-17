import kaboom from 'kaboom';
import * as loadScene from './scenes/index.js';
import * as logic from './logic/index.js';
import constants from './constants/index.js';
import socket from './online/socket.js';

kaboom({
    background: [134, 135, 247],
    scale: 2,
    font: 'sinko',
    logMax: constants.kaboom.DEBUG_LOG_MAX_MESSAGES
});

debug.inspect = constants.kaboom.DEBUG_INSPECT;
debug.showLog = constants.kaboom.DEBUG_LOG;

logic.loadAssets();

loadScene.game();
loadScene.lose();
loadScene.connectionLost();

socket.on('connect', () => {
    go('game');
});

socket.io.on('reconnect', () => debug.log('Connexion au serveur retablie'));

socket.io.on('reconnect_attempt', (attempt) => {
    go('connectionLost', { attempt })
});