import express, { Request, Response } from 'express';
import path from 'path';

export const createApp = () => {
  const app = express();

  // Dynamically resolve the client build path based on the current directory
  const clientPath = path.resolve(
    __dirname,
    process.env.NODE_ENV === 'production' ? '../../../client/dist' : '../../client/dist'
  );

  // Serve static files from Vue build
  app.use(express.static(clientPath));

  // Handle SPA routing for any unmatched routes
  app.get('*', (req: Request, res: Response) => {
    const filePath = path.join(clientPath, 'index.html');
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error serving index.html:', err);
        res.status(500).send('Internal Server Error');
      }
    });
  });

  return app;
};
