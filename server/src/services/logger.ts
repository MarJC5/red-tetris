import fs from 'fs';
import path from 'path';

class Logger {
  private logFile: fs.WriteStream;

  constructor() {
    this.logFile = fs.createWriteStream(path.join(__dirname, '../../server.log'), { flags: 'a' });
  }

  private formatMessage(level: string, message: string, meta: object = {}) {
    const timestamp = new Date().toISOString();
    return `${timestamp} [${level.toUpperCase()}] ${message} ${JSON.stringify(meta)}\n`;
  }

  private log(level: string, message: string, meta?: object) {
    const formattedMessage = this.formatMessage(level, message, meta);
    this.logFile.write(formattedMessage);
    
    if (process.env.NODE_ENV !== 'production') {
      console.log(formattedMessage);
    }
  }

  info(message: string, meta?: object) {
    this.log('info', message, meta);
  }

  error(message: string, meta?: object) {
    this.log('error', message, meta);
  }

  warn(message: string, meta?: object) {
    this.log('warn', message, meta);
  }
}

export const logger = new Logger();