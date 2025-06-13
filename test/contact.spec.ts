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

  // CONTACT CREATE TEST
  describe('POST /api/contacts', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
          first_name: '',
          last_name: '',
          email: 'salah',
          phone: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able create new contact', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
          first_name: 'test_contact',
          last_name: 'test_contact_last',
          email: 'test@example.com',
          phone: '6287781383892',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('test_contact');
      expect(response.body.data.last_name).toBe('test_contact_last');
      expect(response.body.data.email).toBe('test@example.com');
      expect(response.body.data.phone).toBe('6287781383892');
    });
  });

  // CONTACT GET TEST
  describe('GET /api/contacts/:contactId', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
      await testService.createContact();
    });

    it('should be rejected if request is not found', async () => {
      const contact = await testService.getContact();

      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${contact?.id}` + 1)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able get contact', async () => {
      const contact = await testService.getContact();

      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${contact?.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('test_contact');
      expect(response.body.data.last_name).toBe('test_contact_last');
      expect(response.body.data.email).toBe('test@example.com');
      expect(response.body.data.phone).toBe('6287781383892');
    });
  });

  // CONTACT PUT TEST
  describe('PUT /api/contacts', () => {
    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
      await testService.createContact();
    });

    it('should be rejected if request is invalid', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .put(`/api/contacts/${contact?.id}`)
        .set('Authorization', 'test')
        .send({
          first_name: '',
          last_name: '',
          email: 'salah',
          phone: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if contact not found', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .put(`/api/contacts/${Number(contact?.id) + 1}`)
        .set('Authorization', 'test')
        .send({
          first_name: 'test_contact_new',
          last_name: 'test_contact_update',
          email: 'test@example.com',
          phone: '62877813838452',
        });

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able update contact', async () => {
      const contact = await testService.getContact();

      const response = await request(app.getHttpServer())
        .put(`/api/contacts/${contact?.id}`)
        .set('Authorization', 'test')
        .send({
          first_name: 'test_contact_updated',
          last_name: 'test_contact_last_updated',
          email: 'test_updated@example.com',
          phone: '62877808505477',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('test_contact_updated');
      expect(response.body.data.last_name).toBe('test_contact_last_updated');
      expect(response.body.data.email).toBe('test_updated@example.com');
      expect(response.body.data.phone).toBe('62877808505477');
    });
  });
});
