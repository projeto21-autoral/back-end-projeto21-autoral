import app, { init } from '@/app';
import { prisma } from '@/config';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createPictures, createScrapbook, createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { notFoundError } from '@/errors/notFoundError';
import * as jwt from 'jsonwebtoken';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /pictures', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/pictures/:id');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/pictures/:id').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/pictures/:id').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 when invalid data ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const scrapbook = await createScrapbook(user.id);
      const picture = await createPictures(scrapbook.id);

      const response = await server.get(`/pictures/:id`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });
  it('should respond with status 200 and picture data', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const scrapbook = await createScrapbook(user.id);
    const picture = await createPictures(scrapbook.id);

    const response = await server.get(`/pictures/${picture.id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      id: expect.any(Number),
      url: expect.any(String),
      name: expect.any(String),
      scrapBookId: expect.any(Number),
      comment: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});

describe('POST /pictures', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/pictures');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/pictures').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/pictures').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 when invalid data ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const scrapbook = await createScrapbook(user.id);
      const body = '';

      const response = await server.post(`/pictures`).set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 201 and picture data ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const scrapbook = await createScrapbook(user.id);
      const body = {
        url: faker.internet.url(),
        name: faker.name.firstName(),
        scrapBookId: scrapbook.id,
        comment: faker.lorem.lines(),
      };

      const response = await server.post('/pictures').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        url: expect.any(String),
        name: expect.any(String),
        scrapBookId: expect.any(Number),
        comment: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});

describe('PUT /pictures', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.put('/pictures/update/:id');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.put('/pictures/update/:id').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.put('/pictures/update/:id').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 when invalid data ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const scrapbook = await createScrapbook(user.id);
      const body = '';

      const response = await server.put(`/pictures/update/:id`).set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 200 and updated picture data ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const scrapbook = await createScrapbook(user.id);
      const picture = await createPictures(scrapbook.id);
      const body = {
        url: faker.internet.url,
        name: faker.name.firstName(),
        comment: faker.lorem.lines,
      };

      const response = await server.put(`/pictures/update/${picture.id}`).set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        url: expect.any(String),
        name: expect.any(String),
        scrapBookId: expect.any(Number),
        comment: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});

describe('DELETE /pictures', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.delete('/pictures/:id');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.delete('/pictures/:id').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete('/pictures/:id').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 when there is no scrapbookId ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.delete('/pictures/:id').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('should respond with status 200 and delete scrapbook', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const scrapbook = await createScrapbook(user.id);
      const picture = await createPictures(scrapbook.id)
      const response = await server.delete(`/pictures/${picture.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
