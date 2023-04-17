import { faker } from '@faker-js/faker';

import { prisma } from '@/config';

export async function createScrapbook(userId: number) {
  return prisma.scrapbook.create({
    data: {
      name: faker.name.firstName(),
      userId: userId,
      numberPictures: faker.datatype.number(),
    },
  });
}
