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

describe('AddressController', () => {
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
  });

  // ADDRESS CREATE TEST
  describe('POST /api/contacts/:contactId/addresses', () => {
    beforeEach(async () => {
      await testService.deleteAddress();
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
      await testService.createContact();
    });

    it('should be rejected if request is invalid', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .post(`/api/contacts/${contact?.id}/addresses`)
        .set('Authorization', 'test')
        .send({
          street: '',
          city: '',
          province: '',
          country: '',
          postal_code: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able create new address', async () => {
      const contact = await testService.getContact();
      const response = await request(app.getHttpServer())
        .post(`/api/contacts/${contact?.id}/addresses`)
        .set('Authorization', 'test')
        .send({
          street: 'New street test',
          city: 'city test',
          province: 'province test',
          country: 'country test',
          postal_code: '1234',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.street).toBe('New street test');
      expect(response.body.data.city).toBe('city test');
      expect(response.body.data.province).toBe('province test');
      expect(response.body.data.country).toBe('country test');
      expect(response.body.data.postal_code).toBe('1234');
    });
  });

  // ADDRESS GET TEST
  describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
      await testService.deleteAddress();
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
      await testService.createContact();
      await testService.createAddress();
    });

    it('should be rejected if contact is not found', async () => {
      const contact = await testService.getContact();
      const address = await testService.getAddress();

      const response = await request(app.getHttpServer())
        .get(
          `/api/contacts/${Number(contact?.id) + 1}/addresses/${address?.id}`,
        )
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if address is not found', async () => {
      const contact = await testService.getContact();
      const address = await testService.getAddress();

      const response = await request(app.getHttpServer())
        .get(
          `/api/contacts/${Number(contact?.id)}/addresses/${Number(address?.id) + 1}`,
        )
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able get address', async () => {
      const contact = await testService.getContact();
      const address = await testService.getAddress();

      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${contact?.id}/addresses/${address?.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.street).toBe('New street test');
      expect(response.body.data.city).toBe('city test');
      expect(response.body.data.province).toBe('province test');
      expect(response.body.data.country).toBe('country test');
      expect(response.body.data.postal_code).toBe('1234');
    });
  });

  // ADDRESS UPDATE TEST
  describe('PUT /api/contacts/:contactId/addresses', () => {
    beforeEach(async () => {
      await testService.deleteAddress();
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
      await testService.createContact();
      await testService.createAddress();
    });

    it('should be rejected if request is invalid', async () => {
      const contact = await testService.getContact();
      const address = await testService.getAddress();
      const response = await request(app.getHttpServer())
        .put(`/api/contacts/${contact?.id}/addresses/${address?.id}`)
        .set('Authorization', 'test')
        .send({
          street: '',
          city: '',
          province: '',
          country: '',
          postal_code: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able update address', async () => {
      const contact = await testService.getContact();
      const address = await testService.getAddress();
      const response = await request(app.getHttpServer())
        .put(`/api/contacts/${contact?.id}/addresses/${address?.id}`)
        .set('Authorization', 'test')
        .send({
          street: 'New street test',
          city: 'city test',
          province: 'province test',
          country: 'country test',
          postal_code: '1234',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.street).toBe('New street test');
      expect(response.body.data.city).toBe('city test');
      expect(response.body.data.province).toBe('province test');
      expect(response.body.data.country).toBe('country test');
      expect(response.body.data.postal_code).toBe('1234');
    });

    it('should be rejected if contact is not found', async () => {
      const contact = await testService.getContact();
      const address = await testService.getAddress();
      const response = await request(app.getHttpServer())
        .put(
          `/api/contacts/${Number(contact?.id) + 1}/addresses/${address?.id}`,
        )
        .set('Authorization', 'test')
        .send({
          street: 'New street test',
          city: 'city test',
          province: 'province test',
          country: 'country test',
          postal_code: '1234',
        });

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if address is not found', async () => {
      const contact = await testService.getContact();
      const address = await testService.getAddress();
      const response = await request(app.getHttpServer())
        .put(
          `/api/contacts/${Number(contact?.id)}/addresses/${Number(address?.id) + 1}`,
        )
        .set('Authorization', 'test')
        .send({
          street: 'New street test',
          city: 'city test',
          province: 'province test',
          country: 'country test',
          postal_code: '1234',
        });

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });
  });

  // ADDRESS DELETE TEST
  describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
      await testService.deleteAddress();
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
      await testService.createContact();
      await testService.createAddress();
    });

    it('should be rejected if contact is not found', async () => {
      const contact = await testService.getContact();
      const address = await testService.getAddress();

      const response = await request(app.getHttpServer())
        .delete(
          `/api/contacts/${Number(contact?.id) + 1}/addresses/${address?.id}`,
        )
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if address is not found', async () => {
      const contact = await testService.getContact();
      const address = await testService.getAddress();

      const response = await request(app.getHttpServer())
        .delete(
          `/api/contacts/${Number(contact?.id)}/addresses/${Number(address?.id) + 1}`,
        )
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able DELETE address', async () => {
      const contact = await testService.getContact();
      const address = await testService.getAddress();

      const response = await request(app.getHttpServer())
        .delete(`/api/contacts/${contact?.id}/addresses/${address?.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);

      const addressCheck = await testService.getAddress();
      expect(addressCheck).toBeNull();
    });
  });

  // ADDRESS LIST TEST
  describe('GET /api/contacts/:contactId/addresses', () => {
    beforeEach(async () => {
      await testService.deleteAddress();
      await testService.deleteContact();
      await testService.deleteUser();

      await testService.createUser();
      await testService.createContact();
      await testService.createAddress();
    });

    it('should be rejected if contact is not found', async () => {
      const contact = await testService.getContact();

      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${Number(contact?.id) + 1}/addresses`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able get LIST address', async () => {
      const contact = await testService.getContact();

      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${contact?.id}/addresses`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].id).toBeDefined();
      expect(response.body.data[0].street).toBe('New street test');
      expect(response.body.data[0].city).toBe('city test');
      expect(response.body.data[0].province).toBe('province test');
      expect(response.body.data[0].country).toBe('country test');
      expect(response.body.data[0].postal_code).toBe('1234');
    });
  });
});
