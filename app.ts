import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorMiddleware } from './middlewares';
import fs from 'fs';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const partialResponse = require('express-partial-response');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(partialResponse()); // This is used to enable response keys selection

const routesDir = path.join(__dirname, 'routes');

// Function to recursively read route files and map them
const mapRoutes = (directory: string, baseRoute: string = '') => {
  fs.readdirSync(directory).forEach((file) => {
    const fullPath = path.join(directory, file);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      mapRoutes(fullPath, path.join(baseRoute, file));
    } else if (stats.isFile() && file.endsWith('.ts') && file !== 'index.ts') {
      const routeName = file.replace('.ts', '');
      const route = path.join(baseRoute, routeName === 'index' ? '' : routeName);
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const router = require(fullPath);
      
      app.use(`/${route}`, router);
      console.log(`Mapped route: /${route}`);
    }
  });
};

mapRoutes(routesDir);


app.use(errorMiddleware);
export default app;