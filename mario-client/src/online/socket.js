import { io } from 'socket.io-client';
import constants from '../constants/index.js';

let socket = null;

socket = socket ?? io(`${constants.online.SERVER_IP}:${constants.online.SERVER_PORT}`);

export default socket;