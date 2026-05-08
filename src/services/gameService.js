import prisma from '../../lib/prisma.js';

export const getGameboardUrl = async id => {
  return await prisma.level.findUnique({
    where: {
      id,
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

export const getTotalTarget = async id => {
  return await prisma.level.findUnique({
    where: {
      id,
    },
    select: {
      target: true,
    },
  });
};
