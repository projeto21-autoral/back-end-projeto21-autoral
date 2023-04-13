import { prisma } from '@/config';
import { ArrayPictureParams, UpdatePictureParams } from '@/protocols';

async function createMany(data: ArrayPictureParams) {
  return prisma.pictures.createMany({
    data,
  });
}

async function findPictureById(id: number) {
  return prisma.pictures.findUnique({
    where: {
      id,
    },
  });
}

// async function findPictureByScrapbookId(scrapBookId: number) {
//   return prisma.pictures.findMany({
//     where: {
//       scrapBookId,
//     },
//   });
// }

async function deletePicture(id: number) {
  return prisma.pictures.delete({
    where: {
      id,
    },
  });
}

async function updatePicture(id: number, data: UpdatePictureParams) {
  return prisma.pictures.update({
    where: {
      id,
    },
    data: {
      url: data.url,
      name: data.name,
      comment: data.comment,
    },
  });
}

const pictureRepository = {
  createMany,
  findPictureById,
//   findPictureByScrapbookId,
  deletePicture,
  updatePicture,
};

export default pictureRepository;
