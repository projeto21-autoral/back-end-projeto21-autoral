import app, { init } from '../app';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createScrapbook, createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import * as jwt from 'jsonwebtoken';


beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /scrapbooks', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/scrapbooks');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/scrapbooks').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/scrapbooks').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 when there is no scrapbooks ", async () => {
      const user = await createUser()
      const token = await generateValidToken(user)

      const response = await server.get('/scrapbooks').set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    
    it("should respond with status 200 and scrapbooks", async () => {
      const user = await createUser()
      const token = await generateValidToken(user)          
      const scrapbook = await createScrapbook(user.id)

      const response = await server.get('/scrapbooks').set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([{
        id: scrapbook.id,
        name: scrapbook.name,
        userId: user.id,
        numberPictures: scrapbook.numberPictures,
        createdAt: scrapbook.createdAt.toJSON(),
        updatedAt: scrapbook.updatedAt.toJSON(),
        Pictures:[],
                
      }])

    })

  })
});

describe('POST /scrapbooks', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/scrapbooks');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/scrapbooks').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/scrapbooks').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 when there is no scrapbookId ", async () => {
      const user = await createUser()
      const token = await generateValidToken(user)
      const body = {name: faker.name.firstName(), userId:faker.datatype.number, numberPictures:faker.datatype.number}

      const response = await server.post('/scrapbooks').set('Authorization', `Bearer ${token}`).send(body)

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 201 and scrapbook data", async () => {
      const user = await createUser()
      const token = await generateValidToken(user)
      const userId = Number(user.id)
      const body = {name: faker.name.firstName(), userId:userId, numberPictures:faker.datatype.number()}

      const response = await server.post('/scrapbooks').set('Authorization', `Bearer ${token}`).send(body)

      expect(response.status).toBe(httpStatus.CREATED)
      expect(response.body).toEqual({
        id:expect.any(Number),
        name: expect.any(String),
        userId: expect.any(Number),
        numberPictures: expect.any(Number)
      })
    })

  })
});


describe('DELETE /scrapbooks', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.delete('/scrapbooks/:id');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.delete('/scrapbooks/:id').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete('/scrapbooks/:id').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 when there is no scrapbookId ", async () => {
      const user = await createUser()
      const token = await generateValidToken(user)
      
      const response = await server.delete('/scrapbooks/:id').set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it("should respond with status 200 and delete scrapbook", async () => {
      const user = await createUser()
      const token = await generateValidToken(user)
      const scrapbook = await createScrapbook(user.id)
      const response = await server.delete(`/scrapbooks/${scrapbook.id}`).set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(httpStatus.OK);
    });

  })
});
