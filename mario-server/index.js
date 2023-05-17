import { Server } from 'socket.io';
import services from './services/index.js';
import config from './config.js';

const io = new Server(config.port, { cors: { origin: config.corsOrigins }, serveClient: false });

let gameData = {
	players: []
};

services.logger.warn('En attente de connexion...');

io.on('connect', (socket) => {
	services.logger.debug('Un joueur s\'est connecté');

	socket.on('getGameData', (callback) => {
		// On renvoie les données de tous les joueurs du serveur au joueur
		callback(gameData);
	});

	socket.on('onCurrentPlayerConnect', (data) => {
		// On ajoute le joueur dans gameData
		let newPlayer = { ...data, playerId: socket.id };
		gameData.players.push(newPlayer);
		services.logger.info(`${data.playerName} a rejoint, ${gameData.players.length} joueur(s) en ligne`);

		// On prévient tous les joueurs qu'un joueur s'est connecté
		io.emit('onPlayerConnect', newPlayer);
	});

	socket.on('disconnect', () => {
		let disconnectedPlayer = gameData.players.find(p => p.playerId === socket.id);
		gameData.players = gameData.players.filter(p => p.playerId !== disconnectedPlayer.playerId);
		services.logger.info(`${disconnectedPlayer?.playerName} est parti, ${gameData.players.length} joueur(s) en ligne`);
		io.emit('onPlayerLeave', disconnectedPlayer);
	});

	socket.on('onPlayerMovement', (data) => {
		try {
			let player = gameData.players.find(p => p.playerId === socket.id);
			player.x = data.x;
			player.y = data.y;
			// services.logger.debug(`${player?.playerName} bouge vers: ${data.direction}`);
			io.emit('onPlayerMovement', { playerId: socket.id, x: player.x, y: player.y, direction: data.direction });
		} catch (error) {

		}
	});

	socket.on('onPlayerDeath', (data) => {
		let player = gameData.players.find(p => p.playerId === socket.id);
		player.death++;
		player.isAlive = false; // TODO: ne pas faire spawn les morts
		services.logger.error(`${player?.playerName} est mort`);
		io.emit('onPlayerDeath', { deadPlayer: player, killedBy: data.killedBy });
	});

	socket.on('onPlayerRespawn', () => {
		let player = gameData.players.find(p => p.playerId === socket.id);
		player.isAlive = true;
		services.logger.info(`${player?.playerName} a respawn`);
		io.emit('onPlayerRespawn', { player: player });
	});
});