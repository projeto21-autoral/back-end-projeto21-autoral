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


async function deletePicture(id: number) {
  return prisma.pictures.delete({
    where: {
      id,
    },
  });
}

async function updatePicture(id: number, url:string, name:string, comment:string) {
  return prisma.pictures.update({
    where: {
      id,
    },
    data: {
      url,
      name,
      comment,
    },
  });
}

const pictureRepository = {
  createMany,
  findPictureById,
  deletePicture,
  updatePicture,
};

export default pictureRepository;
