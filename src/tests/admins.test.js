import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeed from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

describe('GET /admins', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.status).toBe(200);
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.error).toBe(false);
  });
});
