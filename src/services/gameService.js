import prisma from '../../lib/prisma.js';

export const getGameboardUrl = async name => {
  return await prisma.level.findUnique({
    where: {
      name,
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
