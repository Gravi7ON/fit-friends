import { PrismaClient } from '@prisma/client';
import { UserLocation } from '../../../libs/shared-types/src/lib/user-location.enum';

const prisma = new PrismaClient();

export async function fillDb() {
  const randomInteger = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  const titles = [
    'Lorem consectetur cupidatat aliquip quis amet.',
    'Proident laboris ex dolor voluptate reprehenderit labore elit officia.',
    'Irure exercitation do amet commodo cillum deserunt Lorem duis non nulla qui aliquip.',
    'Aliquip officia aute ea elit velit laborum voluptate labore laboris do quis aliquip.',
    'Laboris dolor sit voluptate dolore consequat ad pariatur consectetur magna amet in sint Lorem.',
  ];

  const costs = [1700, 1500, 1000, 1200, 2000];

  const descriptions = [
    'Adipisicing nisi id reprehenderit proident.',
    'Non sunt cupidatat dolor nisi elit.',
    'Qui tempor anim id quis.',
    'Ut veniam exercitation ipsum irure eiusmod ea qui eiusmod sint aute.',
    'Culpa laboris excepteur dolor nostrud.',
  ];

  const locations = [
    UserLocation.Petrogradskaya,
    UserLocation.Pionerskaya,
    UserLocation.Sportivnaya,
    UserLocation.Udelnaya,
    UserLocation.Zvozdnaya,
  ];

  const features = [
    ['бассейн'],
    ['бассейн', 'бесплатная парковка'],
    ['бассейн', 'бесплатная парковка', 'детская комната'],
    ['бассейн', 'бесплатная парковка', 'массаж'],
    ['бассейн', 'бесплатная парковка', 'детская комната', 'массаж'],
  ];

  for (const iter of Array(5)
    .fill(1)
    .map((_number, index) => (index += 1))) {
    await prisma.gym.upsert({
      where: { id: iter },
      update: {},
      create: {
        title: titles[randomInteger(0, 4)],
        location: locations[randomInteger(0, 4)],
        isOriginal: Boolean(randomInteger(0, 1)),
        features: features[randomInteger(0, 4)],
        image: `http://localhost:${
          globalThis.process.env.PORT
        }/api/files/test/workouts/gym-${randomInteger(1, 12)}.jpg`,
        description: descriptions[randomInteger(0, 4)],
        cost: costs[randomInteger(0, 4)],
      },
    });
  }
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    globalThis.process.exit(1);
  });
