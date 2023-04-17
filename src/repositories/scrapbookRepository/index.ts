import { prisma } from '../../config';

async function create(name: string, userId: number, numberPictures: number) {
  return prisma.scrapbook.create({
    data: { name, userId, numberPictures },
  });
}

async function findScrapbookById(id: number) {
  return prisma.scrapbook.findUnique({
     where: {
      id,
    },
   
    include:{      
      Pictures:{orderBy:{createdAt:"asc"}}       
    },
    
  });
}

async function findScrapbookByUserId(userId: number) {
  return prisma.scrapbook.findMany({
    where: {
      userId,
    },include:{
      Pictures:{orderBy:{createdAt:"asc"}} 
    }
  });
}

async function deleteScrapbook(id: number) {
    return prisma.scrapbook.delete({
        where:{
            id,
        }
    })
}

const scrapbookRepository = {
  create,
  findScrapbookByUserId,
  findScrapbookById,
  deleteScrapbook,
};

export default scrapbookRepository;
