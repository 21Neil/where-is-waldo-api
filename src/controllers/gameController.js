import { getGameboardUrl, getTarget } from '../services/gameService.js';

export const gameboard = async (req, res, next) => {
  const name = req.body.name;

  try {
    const info = await getGameboardUrl(name);
    res.json({ id: info.id, imageUrl: info.imageUrl });
  } catch (err) {
    next(err);
  }
};

export const checkLocation = async (req, res, next) => {
  const name = req.body.name;
  const levelId = req.body.levelId;
  const x = req.body.x;
  const y = req.body.y;

  try {
    const target = await getTarget(name, levelId);
    const checkX = x > target.x - 1 && x < target.x + 1;
    const checkY = y > target.y - 2 && y < target.y + 2;
    if (checkX && checkY) return res.json({ result: true });
    return res.json({ result: false });
  } catch (err) {
    next(err);
  }
};
