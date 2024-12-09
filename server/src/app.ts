import express, { Request, Response } from 'express';
import path from 'path';

export const createApp = () => {
  const app = express();

  // Serve static files from Vue build
  app.use(express.static(path.join(__dirname, '../../../client/dist')));

  // Handle SPA routing for any unmatched routes
  app.get('*', (req: Request, res: Response) => {
    const filePath = path.join(__dirname, '../../../client/dist/index.html');
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error serving index.html:', err);
        res.status(500).send('Internal Server Error');
      }
    });
  });

  return app;
};
