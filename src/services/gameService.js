import prisma from '../../lib/prisma.js';

export const getGameboard = async id => {
  return await prisma.level.findUnique({
    where: {
      id,
    },
    include: {
      targets: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const getTarget = async (name, levelId) => {
  return await prisma.target.findUnique({
    where: {
      name,
      levelId,
    },
  });
};

export const getLevels = async () => {
  return await prisma.level.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

export const getTargets = async id => {
  return await prisma.level.findUnique({
    where: {
      id,
    },
    select: {
      targets: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const createLeaderboardEntry = async data => {
  await prisma.leaderboard.create({
    data,
  });

  const { levelId, score } = data;

  const higherScoreCount = await prisma.leaderboard.count({
    where: {
      levelId,
      score: { lt: score }
    }
  })

  const rank = higherScoreCount + 1

  return rank;
};

export const getLeaderboard = async levelId => {
  return await prisma.leaderboard.findMany({
    where: {
      levelId,
    },
    orderBy: {
      score: 'asc',
    },
    take: 10,
  });
};
