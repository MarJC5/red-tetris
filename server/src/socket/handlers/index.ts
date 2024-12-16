import { Server, Socket } from 'socket.io';
import { handleCreateGame, handleJoinGame } from './gameHandlers';
import { handleMove, handleRotate, handleDrop } from './playerHandlers';
import { EVENTS } from '../events';

export const attachGameHandlers = (io: Server, socket: Socket) => {
  // Game handlers
  socket.on(EVENTS.CREATE_GAME, handleCreateGame(socket));
  socket.on(EVENTS.JOIN_GAME, handleJoinGame(socket));
  
  // Player handlers
  socket.on(EVENTS.MOVE_PIECE, handleMove(io, socket));
  socket.on(EVENTS.ROTATE_PIECE, handleRotate(io, socket));
  socket.on(EVENTS.DROP_PIECE, handleDrop(io, socket));
};