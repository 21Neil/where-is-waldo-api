import * as gameService from '../services/gameService.js';

export const getGameboard = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const info = await gameService.getGameboard(id);

    res.json(info);
  } catch (err) {
    next(err);
  }
};

export const checkLocation = async (req, res, next) => {
  try {
    const { name, levelId, x, y } = req.body;
    const target = await gameService.getTarget(name, levelId);
    const isCorrect =
      x > target.x - 1 &&
      x < target.x + 1 &&
      y > target.y - 2 &&
      y < target.y + 2;

    const gameData = req.session.gameData;

    if (!gameData) return res.status(403).json({ message: 'SESSION_EXPIRED' });

    if (isCorrect) {
      const targets = await gameService.getTargets(levelId);
      const targetsLength = targets.targets.length;

      if (!gameData.foundTargetNames.includes(name))
        gameData.foundTargetNames.push(name);
      if (gameData.foundTargetNames.length === targetsLength) {
        const duration = Date.now() - gameData.startTime;

        gameData.duration = duration;
        gameData.isGameOver = true;

        return res.json({
          result: isCorrect,
          isGameOver: true,
          foundTargetNames: gameData.foundTargetNames,
          duration,
        });
      }
    }

    return res.json({
      result: isCorrect,
      isGameOver: false,
      foundTargetNames: gameData.foundTargetNames,
    });
  } catch (err) {
    next(err);
  }
};

export const startGame = async (req, res, next) => {
  try {
    req.session.gameData = {
      startTime: Date.now(),
      foundTargetNames: [],
      levelId: req.body.levelId,
    };

    res.json({ message: 'Game started' });
  } catch (err) {
    next(err);
  }
};

export const getLevels = async (req, res, next) => {
  try {
    const levels = await gameService.getLevels();

    res.json(levels);
  } catch (err) {
    next(err);
  }
};

export const createLeaderboardEntry = async (req, res, next) => {
  try {
    const { gameData } = req.session;

    if (!gameData || !gameData.isGameOver || !gameData.duration) {
      return res.status(403).json({
        message: 'Invalid game record',
      });
    }
    
    const name = req.body.name?.trim() || 'Anonymous';
    const score = gameData.duration
    const rank = await gameService.createLeaderboardEntry({
      name,
      score,
      levelId: gameData.levelId,
    });

    req.session.gameData = null;

    return res.status(201).json({
      name,
      score,
      rank,
    });
  } catch (err) {
    next(err);
  }
};

export const getLeaderboard = async (req, res, next) => {
  try {
    const levelId = +req.params.id;
    const leaderboard = await gameService.getLeaderboard(levelId);

    res.json(leaderboard);
  } catch (err) {
    next(err);
  }
};
