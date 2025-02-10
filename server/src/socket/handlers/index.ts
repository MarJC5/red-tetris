import { Server, Socket } from 'socket.io';
import { handleJoinGame, handleLeaveGame } from './gameHandlers';
import { handleMove, handleRotate, handleDrop } from './playerHandlers';
import { handleGetRooms } from './roomHandlers';
import { EVENTS } from '../events';

export const attachGameHandlers = (io: Server, socket: Socket) => {
  // Game handlers
  socket.on(EVENTS.JOIN_GAME, handleJoinGame(socket, io));
  socket.on(EVENTS.LEAVE_GAME, handleLeaveGame(socket, io));

  // Room handlers
  socket.on(EVENTS.ROOM_GET_LIST, handleGetRooms(socket));
  
  // Player handlers
  socket.on(EVENTS.MOVE_PIECE, handleMove(io, socket));
  socket.on(EVENTS.ROTATE_PIECE, handleRotate(io, socket));
  socket.on(EVENTS.DROP_PIECE, handleDrop(io, socket));
};