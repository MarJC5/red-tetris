import { Server } from 'http';
import { createApp } from './app';
import { configureSocket } from './config/socket';
import { logger } from './services/logger';

export class GameServer {
  private server: Server;
  private port: number;

  constructor(port: number = 3000) {
    const app = createApp();
    this.server = new Server(app as any);
    this.port = port;

    // Configure Socket.ioyarn
    configureSocket(this.server);

    // Setup error handlers
    this.setupErrorHandlers();
  }

  private setupErrorHandlers() {
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception', {
        error: error.message,
        stack: error.stack
      });
      process.exit(1);
    });

    process.on('unhandledRejection', (reason: any) => {
      logger.error('Unhandled Rejection', {
        reason: reason.message || reason,
        stack: reason.stack
      });
    });
  }

  public start() {
    this.server.listen(this.port, () => {
      logger.info('Server started', {
        port: this.port,
        environment: process.env.NODE_ENV || 'development'
      });
    });
  }

  public stop() {
    this.server.close(() => {
      logger.info('Server stopped');
      process.exit(0);
    });
  }
}

// Export default instance
export default new GameServer(Number(process.env.PORT) || 3000);