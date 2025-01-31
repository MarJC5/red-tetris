import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { logger } from '../services/logger';
import { EVENTS } from '../socket/events';
import { attachGameHandlers } from '../socket/handlers';
import { myRooms } from '../../src/models/Room';

export const configureSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'production' ? false : "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  io.on(EVENTS.CONNECT, (socket) => {
    const ipAddress = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
    
    logger.info('New connection', {
      ip: ipAddress,
      userAgent: socket.handshake.headers['user-agent'],
      socketId: socket.id
    });

    // Attach all event handlers
    attachGameHandlers(io, socket);

    socket.emit(EVENTS.ROOM_LIST, myRooms.getRoom());

    socket.on(EVENTS.DISCONNECT, () => {
      logger.info('Client disconnected', { socketId: socket.id });
    });

    socket.on(EVENTS.ERROR, (error) => {
      logger.error('Socket error', { socketId: socket.id, error });
    });
  });

  return io;
};