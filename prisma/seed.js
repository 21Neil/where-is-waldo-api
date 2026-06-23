import prisma from '../lib/prisma.js';

const main = async () => {
  await prisma.level.upsert({
    where: { name: 'beach' },
    update: {},
    create: {
      name: 'beach',
      imageUrl:
        'https://pub-6c975cd2df9342cc9994b0776938af47.r2.dev/Wheres-Waldo-Beach.webp',
      thumbnailUrl:
        'https://pub-6c975cd2df9342cc9994b0776938af47.r2.dev/Wheres-Waldo-Beach-thumbnail.webp',
      targets: {
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
            x: 26.15,
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

  await prisma.level.upsert({
    where: { name: 'ocean' },
    update: {},
    create: {
      name: 'ocean',
      imageUrl:
        'https://pub-6c975cd2df9342cc9994b0776938af47.r2.dev/Wheres-Waldo-Ocean.webp',
      thumbnailUrl:
        'https://pub-6c975cd2df9342cc9994b0776938af47.r2.dev/Wheres-Waldo-Ocean-thumbnail.webp',
      targets: {
        create: [
          {
            name: 'Waldo',
            x: 66.34,
            y: 15.83,
          },
          {
            name: 'Wanda',
            x: 51.85,
            y: 23.88,
          },
          {
            name: 'Wizard',
            x: 78.65,
            y: 13.45,
          },
          {
            name: 'Odlaw',
            x: 30.15,
            y: 20.35,
          },
        ],
      },
    },
  });

  await prisma.level.upsert({
    where: { name: 'space' },
    update: {},
    create: {
      name: 'space',
      imageUrl:
        'https://pub-6c975cd2df9342cc9994b0776938af47.r2.dev/Wheres-Waldo-Space.webp',
      thumbnailUrl:
        'https://pub-6c975cd2df9342cc9994b0776938af47.r2.dev/Wheres-Waldo-Space-thumbnail.webp',
      targets: {
        create: [
          {
            name: 'Waldo',
            x: 40.55,
            y: 63.14,
          },
          {
            name: 'Wanda',
            x: 29.55,
            y: 52.62,
          },
          {
            name: 'Wizard',
            x: 78.16,
            y: 58.62,
          },
          {
            name: 'Odlaw',
            x: 7.18,
            y: 69.25,
          },
        ],
      },
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Success');
  })
  .catch(async e => {
    await prisma.$disconnect();
    console.log(e);
    process.exit(1);
  });
