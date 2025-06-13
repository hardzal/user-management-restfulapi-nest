/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController', () => {
  let app: INestApplication<App>;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);

    await testService.deleteContact();
    await testService.deleteUser();
  });

  // REGISTER TEST
  describe('POST /api/users', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: '',
          password: '',
          name: '',
          email: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able registered new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'test_user',
          password: 'test_user',
          name: 'test user',
          email: 'test_email@example.com',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test_user');
      expect(response.body.data.name).toBe('test user');
    });

    it('should be rejected if username already exists', async () => {
      await testService.createUser();

      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'test_user',
          password: 'test_user',
          name: 'test user',
          email: 'test_email@example.com',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  // LOGIN TEST
  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: '',
          password: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to login', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'test_user',
          password: 'test_user',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test_user');
      expect(response.body.data.name).toBe('test user');
      expect(response.body.data.token).toBeDefined();
    });
  });

  // GET USER TEST
  describe('GET /api/users/current', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
    });
    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/users/current')
        .set('Authorization', 'wrong');

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to get user', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/users/current')
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test_user');
      expect(response.body.data.name).toBe('test user');
    });
  });

  // UPDATE USER TEST
  describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
          password: '',
          name: '',
          email: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able updated user name', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
          name: 'test user updated',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test_user');
      expect(response.body.data.name).toBe('test user updated');
    });

    it('should be able updated user password', async () => {
      let response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
          password: 'password_updated',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test_user');
      expect(response.body.data.name).toBe('test user');

      response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'test_user',
          password: 'password_updated',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.token).toBeDefined();
    });
  });

  // LOGOUT USER TEST
  describe('DELETE /api/users/current', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/users/current')
        .set('Authorization', 'wrong');

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able logout', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/users/current')
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);

      const user = await testService.getUser();

      expect(user?.token).toBeNull();
    });
  });
});
