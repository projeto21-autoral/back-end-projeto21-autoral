import { faker } from '@faker-js/faker';
import { prisma } from '../../src/config';

export async function createPictures(scrapBookId: number){
  

  return prisma.pictures.create({
    data: {
      url: faker.internet.url(),
      name:faker.name.firstName(),
      scrapBookId: scrapBookId,
      comment: faker.lorem.lines(),
    },
  });
}
