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

export const getAllLevels = async () => {
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
