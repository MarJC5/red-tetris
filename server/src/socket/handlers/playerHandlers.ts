import { Server, Socket } from 'socket.io';
import { logger } from '../../services/logger';
import { EVENTS } from '../events';

export const handleMove = (io: Server, socket: Socket) => async (direction: 'left' | 'right' | 'down') => {
  try {
    const rooms = Array.from(socket.rooms);
    const gameRoom = rooms.find(room => room !== socket.id);
    
    if (!gameRoom) {
      throw new Error('Player not in a game room');
    }

    // Broadcast movement to all players in room except sender
    socket.to(gameRoom).emit(EVENTS.BOARD_UPDATE, {
      playerId: socket.id,
      type: 'move',
      direction
    });

    logger.info('Piece moved', { 
      socketId: socket.id, 
      direction, 
      gameRoom 
    });
  } catch (error) {
    logger.error('Error handling move', { error, socketId: socket.id });
    socket.emit(EVENTS.ERROR, 'Failed to move piece');
  }
};

export const handleRotate = (io: Server, socket: Socket) => async () => {
  try {
    const rooms = Array.from(socket.rooms);
    const gameRoom = rooms.find(room => room !== socket.id);
    
    if (!gameRoom) {
      throw new Error('Player not in a game room');
    }

    // Broadcast rotation to all players in room except sender
    socket.to(gameRoom).emit(EVENTS.BOARD_UPDATE, {
      playerId: socket.id,
      type: 'rotate'
    });

    logger.info('Piece rotated', { 
      socketId: socket.id, 
      gameRoom 
    });
  } catch (error) {
    logger.error('Error handling rotation', { error, socketId: socket.id });
    socket.emit(EVENTS.ERROR, 'Failed to rotate piece');
  }
};

export const handleDrop = (io: Server, socket: Socket) => async () => {
  try {
    const rooms = Array.from(socket.rooms);
    const gameRoom = rooms.find(room => room !== socket.id);
    
    if (!gameRoom) {
      throw new Error('Player not in a game room');
    }

    // Broadcast drop to all players in room except sender
    socket.to(gameRoom).emit(EVENTS.BOARD_UPDATE, {
      playerId: socket.id,
      type: 'drop'
    });

    logger.info('Piece dropped', { 
      socketId: socket.id, 
      gameRoom 
    });
  } catch (error) {
    logger.error('Error handling drop', { error, socketId: socket.id });
    socket.emit(EVENTS.ERROR, 'Failed to drop piece');
  }
};