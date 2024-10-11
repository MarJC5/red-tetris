const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// Custom logger
const logger = {
  logFile: fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' }),
  
  formatMessage: (level, message, meta = {}) => {
    const timestamp = new Date().toISOString();
    return `${timestamp} [${level.toUpperCase()}] ${message} ${JSON.stringify(meta)}\n`;
  },

  log: function(level, message, meta) {
    const formattedMessage = this.formatMessage(level, message, meta);
    this.logFile.write(formattedMessage);
    
    // Also log to console in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      console.log(formattedMessage);
    }
  },

  info: function(message, meta) {
    this.log('info', message, meta);
  },

  error: function(message, meta) {
    this.log('error', message, meta);
  },

  warn: function(message, meta) {
    this.log('warn', message, meta);
  }
};

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

const getIpAddress = (socket) => {
  return socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
};

io.on('connection', (socket) => {
  const ipAddress = getIpAddress(socket);
  const userAgent = socket.handshake.headers['user-agent'];

  logger.info('New connection', {
    ip: ipAddress,
    userAgent,
    socketId: socket.id
  });

  socket.on('disconnect', () => {
    logger.info('Client disconnected', {
      ip: ipAddress,
      socketId: socket.id
    });
  });

  socket.on('error', (error) => {
    logger.error('Socket error', {
      ip: ipAddress,
      socketId: socket.id,
      error: error.message
    });
  });

  socket.emit('yourIp', ipAddress);
});

server.listen(PORT, () => {
  logger.info(`Server started`, {
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', {
    error: error.message,
    stack: error.stack
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', {
    reason: reason.message || reason,
    stack: reason.stack
  });
});