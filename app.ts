import express from 'express';
import helmet from 'helmet';
import { connectToDb } from './src/apps/Incredefined/db/connections';
import { User } from './src/apps/Incredefined/db/schemas/user';
import Logger from './src/logger/logger';

const app = express();

app.use(express.json());
app.use(helmet());

export default app;
