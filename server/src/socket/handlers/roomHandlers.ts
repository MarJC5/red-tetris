import { Socket } from 'socket.io';
import { logger } from '../../services/logger';
import { EVENTS } from '../events';
import { myRooms } from '../../models/Room';

export const handleGetRooms = (socket: Socket) => async () => {
  try {

    socket.emit(EVENTS.ROOM_LIST, myRooms.getRoom());
    
    logger.info('Player get room', { socketId: socket.id });
  } catch (error) {
    logger.error('Error getting rooms', { error, socketId: socket.id });
    socket.emit(EVENTS.ERROR, 'Failed to leave game');
  }
};