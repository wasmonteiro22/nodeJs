// src/app.ts
import 'express-async-errors';
import express from 'express';
import { router } from './modules/index';
import { errorHandler } from './shared/middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

export { app }; // Exporta apenas a instância configurada