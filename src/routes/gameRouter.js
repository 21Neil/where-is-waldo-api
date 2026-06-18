import { Router } from 'express';
import {
  getGameboard,
  checkLocation,
  startGame,
  getLevels,
  createLeaderboardEntry,
  getLeaderboard,
} from '../controllers/gameController.js';

const gameRouter = Router();

gameRouter.get('/gameboard/:id', getGameboard);
gameRouter.post('/check-location', checkLocation);
gameRouter.post('/start', startGame);
gameRouter.get('/levels', getLevels);
gameRouter.post('/leaderboards', createLeaderboardEntry);
gameRouter.get('/leaderboards/:id', getLeaderboard);

export default gameRouter;
