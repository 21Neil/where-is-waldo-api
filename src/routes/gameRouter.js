import { Router } from 'express';
import { allLevels, checkLocation, gameboard, startGame } from '../controllers/gameController.js';

const gameRouter = Router();

gameRouter.get('/gameboard/:id', gameboard)
gameRouter.post('/check-location', checkLocation)
gameRouter.post('/game-start', startGame)
gameRouter.get('/all-levels', allLevels)

export default gameRouter;
