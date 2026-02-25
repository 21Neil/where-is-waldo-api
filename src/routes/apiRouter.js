import { Router } from 'express';
import gameRouter from './gameRouter.js';

const apiRouter = Router();

apiRouter.use('/game', gameRouter);

export default apiRouter;
