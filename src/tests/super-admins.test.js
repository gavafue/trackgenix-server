import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/Super-admins';
import superAdminsSeed from '../seeds/super-admins';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdminsSeed);
});

describe('GET /super-admins', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/super-admin').send();
    expect(response.status).toBe(200);
  });

  test('Response should return error false', async () => {
    const response = await request(app).get('/super-admin').send();
    expect(response.error).toBe(false);
  });

  test('Response should return at least one super admin', async () => {
    const response = await request(app).get('/super-admin').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
