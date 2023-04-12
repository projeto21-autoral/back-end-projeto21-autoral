import { notFoundError } from '@/errors/notFoundError';
import { ScrapbookParams } from '@/protocols';
import scrapbookRepository from '@/repositories/scrapbookRepository';

async function createScrapbook(name: string, userId: number, numberPictures: number): Promise<ScrapbookParams> {
  return scrapbookRepository.create(name, userId, numberPictures);
}

async function findScrapbookById(id: number) {
  const scrapbook = await scrapbookRepository.findScrapbookById(id);
  if (!scrapbook) throw notFoundError();

  return scrapbook;
}

async function findScrapbookByUserId(userId: number) {
  const userScrapbooks = await scrapbookRepository.findScrapbookByUserId(userId);
  if (!userScrapbooks) throw notFoundError();

  return userScrapbooks;
}

async function deleteScrapbook(scrapbookId: number) {
  await findScrapbookById(scrapbookId);

  const deletedScrapbook = await scrapbookRepository.deleteScrapbook(scrapbookId);

  return deletedScrapbook;
}

const scrapbookService = {
  createScrapbook,
  findScrapbookById,
  findScrapbookByUserId,
  deleteScrapbook,
};

export default scrapbookService;
