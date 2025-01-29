import { Socket } from 'socket.io';
import { EVENTS } from '../events';
import { myRooms } from '../../models/Room';
import { logger } from '../../services/logger';

export const handleRoom = (socket: Socket) => async () => {
	try {
	
	} catch (error) {
		logger.error('Error joining game', { error });
		socket.emit(EVENTS.ERROR, 'Failed to get room');
	}
};