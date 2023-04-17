import { ArrayPictureParams } from '../../protocols';
import { notFoundError } from '../../errors/notFoundError';
import pictureRepository from '../../repositories/picturesRepository';
import scrapbookRepository from '../../repositories/scrapbookRepository';
import { forbiddenError } from '../../errors/forbiddenError';

async function createMany(data: ArrayPictureParams) {
  const scrapbook = await scrapbookRepository.findScrapbookById(data[0].scrapBookId)
  if(!scrapbook) throw notFoundError();
  if(scrapbook.Pictures.length >= 5) throw forbiddenError()
  return pictureRepository.createMany(data);
}

async function findPictureById(pictureId: number) {
  const picture = await pictureRepository.findPictureById(pictureId);
  if (!picture) throw notFoundError();
  return picture;
}


async function deletePicture(pictureId: number) {
  await findPictureById(pictureId);
  const deletedPicture = await pictureRepository.deletePicture(pictureId);
  return deletedPicture;
}

async function updatePicture(pictureId: number, url: string, name: string, comment: string) {
  
  const picture = await findPictureById(pictureId);
  
  const updatedPicture = await pictureRepository.updatePicture(picture.id,  url, name, comment );
  
  return updatedPicture;
}

const picturesService = {
  createMany,
  findPictureById,
  deletePicture,
  updatePicture,
};

export default picturesService;
