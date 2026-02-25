import { Router } from 'express';
import { checkLocation, gameboard } from '../controllers/gameController.js';

const gameRouter = Router();

gameRouter.post('/gameboard', gameboard)
gameRouter.post('/check-location', checkLocation)

export default gameRouter;
