import { PrismaClient } from '@prisma/client';
import { UserLocation } from '@backend/shared-types';

const MOCK_GYMS_AMOUNT = 5;

enum RangeImage {
  Min = 1,
  Max = 12,
}

enum RangeMockField {
  Min = 0,
  Max = 4,
}

enum ConvertToBool {
  False = 0,
  True = 1,
}

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

  for (const iter of Array(MOCK_GYMS_AMOUNT)) {
    const randomImageNumber = randomInteger(RangeImage.Min, RangeImage.Max);
    await prisma.gym.upsert({
      where: { id: iter },
      update: {},
      create: {
        title: titles[randomInteger(RangeMockField.Min, RangeMockField.Max)],
        location:
          locations[randomInteger(RangeMockField.Min, RangeMockField.Max)],
        isOriginal: Boolean(
          randomInteger(ConvertToBool.False, ConvertToBool.True)
        ),
        features:
          features[randomInteger(RangeMockField.Min, RangeMockField.Max)],
        image: `http://localhost:${
          globalThis.process.env.PORT
        }/api/files/gyms/gym-${
          randomImageNumber < 10 ? `0${randomImageNumber}` : randomImageNumber
        }.jpg`,
        description:
          descriptions[randomInteger(RangeMockField.Min, RangeMockField.Max)],
        cost: costs[randomInteger(RangeMockField.Min, RangeMockField.Max)],
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
