import { Router } from 'express';
import { checkLocation, gameboard, startGame } from '../controllers/gameController.js';

const gameRouter = Router();

gameRouter.post('/gameboard', gameboard)
gameRouter.post('/check-location', checkLocation)
gameRouter.post('/game-start', startGame)

export default gameRouter;
