import { Server, Socket } from 'socket.io';
import { logger } from '../../services/logger';
import { Game } from '../../models/Game';
import { EVENTS } from '../events';
import { myRooms } from '../../models/Room';

const games = new Map<string, Game>();

export const handleJoinGame = (socket: Socket, io: Server) => async (roomId: string, playerName: string) => {
  try {
    roomId = JSON.stringify(roomId).replace('{"id":"', '').replace('"}', '');
    playerName = JSON.stringify(playerName).replace('{"username":"', '').replace('"}', '');
    let game = games.get(roomId);
    if (!game) {
      game = new Game(roomId);
      games.set(roomId, game);

      myRooms.addRoom(roomId, socket.id, playerName);
      io.emit(EVENTS.ROOM_LIST, myRooms.getRoom());
      console.log("Room List : ", myRooms.getNameRoom());
    }
    
    // Join socket.io room
    await socket.join(roomId);
    
    // Add player to game
    // game.addPlayer(socket.id, playerName);
    
    // Notify room of new player
    // socket.to(roomId).emit(EVENTS.PLAYERS_UPDATE, game.getPlayers());
    
    logger.info('Player joined game', { roomId, playerName, socketId: socket.id });
  } catch (error) {
    logger.error('Error joining game', { error, roomId, playerName });
    socket.emit(EVENTS.ERROR, 'Failed to join game');
  }
};

export const handleLeaveGame = (socket: Socket, io: Server) => async (roomId: string, playerName: string) => {
  try {
    roomId = JSON.stringify(roomId).replace('{"id":"', '').replace('"}', '');
    playerName = JSON.stringify(playerName).replace('{"username":"', '').replace('"}', '');
    
    // Delete the room only if it's the owner
    myRooms.deleteRoom(roomId, socket.id, playerName);
    io.emit(EVENTS.ROOM_LIST, myRooms.getRoom());

    // Leave socket.io room
    await socket.leave(roomId);
    
    // Notify room of leaving's player
    // socket.to(roomId).emit(EVENTS.PLAYERS_UPDATE, game.getPlayers());
    
    logger.info('Player leaved game', { roomId, playerName, socketId: socket.id });
  } catch (error) {
    logger.error('Error leaving game', { error, roomId, playerName });
    socket.emit(EVENTS.ERROR, 'Failed to leave game');
  }
};