import {
  getAllLevels,
  getGameboardUrl,
  getTarget,
  getTotalTarget,
} from '../services/gameService.js';

export const gameboard = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const info = await getGameboardUrl(id);
    res.json({ id: info.id, imageUrl: info.imageUrl });
  } catch (err) {
    next(err);
  }
};

export const checkLocation = async (req, res, next) => {
  try {
    const name = req.body.name;
    const levelId = req.body.levelId;
    const x = req.body.x;
    const y = req.body.y;
    const target = await getTarget(name, levelId);
    const isCorrect =
      x > target.x - 1 &&
      x < target.x + 1 &&
      y > target.y - 2 &&
      y < target.y + 2;

    const gameData = req.session.gameData;
    
    if (!gameData) return res.status(403).json({ message: "SESSION_EXPIRED" })

    if (isCorrect) {
      const totalTarget = await getTotalTarget(levelId);
      const totalTargetLength = totalTarget.target.length;

      gameData.foundTarget.push(name);
      if (gameData.foundTarget.length === totalTargetLength) {
        const duration = Date.now() - gameData.startTime;

        return res.json({
          result: isCorrect,
          isGameOver: true,
          foundTarget: gameData.foundTarget,
          duration,
        });
      }
    }

    return res.json({
      result: isCorrect,
      isGameOver: false,
      foundTarget: gameData.foundTarget,
    });
  } catch (err) {
    next(err);
  }
};

export const startGame = async (req, res, next) => {
  try {
    req.session.gameData = {
      startTime: Date.now(),
      foundTarget: [],
      levelId: req.body.levelId,
    };

    res.json({ message: 'Game started' });
  } catch (err) {
    next(err);
  }
};

export const allLevels = async (req, res, next) => {
  try {
    const levels = await getAllLevels();

    res.json(levels);
  } catch (err) {
    next(err);
  }
};
