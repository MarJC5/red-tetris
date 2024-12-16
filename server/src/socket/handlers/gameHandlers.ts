import { Socket } from 'socket.io';
import { logger } from '../../services/logger';
import { Game } from '../../models/Game';
import { EVENTS } from '../events';

const games = new Map<string, Game>();

export const handleCreateGame = (socket: Socket) => async (roomId: string, playerName: string) => {
  try {
    let game = games.get(roomId);
    if (!game) {
      game = new Game(roomId);
      games.set(roomId, game);
    }
    
    // Join socket.io room
    await socket.join(roomId);
    
    // Add player to game
    game.addPlayer(socket.id, playerName);
    
    // Notify room of new player
    socket.to(roomId).emit(EVENTS.PLAYERS_UPDATE, game.getPlayers());
    
    logger.info('Player joined game', { roomId, playerName, socketId: socket.id });
  } catch (error) {
    logger.error('Error joining game', { error, roomId, playerName });
    socket.emit(EVENTS.ERROR, 'Failed to join game');
  }
};

export const handleJoinGame = (socket: Socket) => async (roomId: string, playerName: string) => {
  try {
    let game = games.get(roomId);
    if (!game) {
      game = new Game(roomId);
      games.set(roomId, game);
    }
    
    // Join socket.io room
    await socket.join(roomId);
    
    // Add player to game
    game.addPlayer(socket.id, playerName);
    
    // Notify room of new player
    socket.to(roomId).emit(EVENTS.PLAYERS_UPDATE, game.getPlayers());
    
    logger.info('Player joined game', { roomId, playerName, socketId: socket.id });
  } catch (error) {
    logger.error('Error joining game', { error, roomId, playerName });
    socket.emit(EVENTS.ERROR, 'Failed to join game');
  }
};