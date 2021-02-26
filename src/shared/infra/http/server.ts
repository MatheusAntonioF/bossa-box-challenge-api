/* eslint-disable no-console */
import { config } from 'dotenv';

import express from 'express';

import routes from './routes';

config();

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 - Server started on port ${PORT}`);
});
