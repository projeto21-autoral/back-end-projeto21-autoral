import { faker } from '@faker-js/faker';
import { Pictures } from '@prisma/client';
import { prisma } from '@/config';
import { createScrapbook } from './scrapbook-factory';

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
