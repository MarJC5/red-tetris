import { GameServer } from './src/server';

const port = Number(process.env.PORT) || 3000;
const server = new GameServer(port);

server.start();