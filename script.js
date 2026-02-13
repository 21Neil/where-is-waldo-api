import prisma from './lib/prisma.js';

const main = async () => {
  const level = await prisma.level.create({
    data: {
      name: 'beach',
      imageUrl:
        'https://pub-6c975cd2df9342cc9994b0776938af47.r2.dev/Wheres-Waldo-Beach.webp',
      target: {
        create: [
          {
            name: 'Waldo',
            x: 61.88,
            y: 39.11,
          },
          {
            name: 'Wanda',
            x: 77.34,
            y: 41.36,
          },
          {
            name: 'Wizard',
            x: 27.1,
            y: 36.67,
          },
          {
            name: 'Odlaw',
            x: 10.74,
            y: 36.92,
          },
        ],
      },
    },
  });

  console.log(level);

  const allLevel = await prisma.level.findMany({
    include: {
      target: true,
    },
  });

  console.log(allLevel);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
