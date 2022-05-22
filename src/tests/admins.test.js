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

  test('response should return a 200 status', async () => {
    const response = await request(app).get('/admins?active=true').send();
    expect(response.status).toBe(200);
  });

  test('response should return a 404 status', async () => {
    const response = await request(app).get('/admins?name=').send();
    expect(response.status).toBe(404);
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.body.error).toBeFalsy();
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/admins?active=true').send();
    expect(response.body.error).toBeFalsy();
  });

  test('response should return true error', async () => {
    const response = await request(app).get('/admins?name=').send();
    expect(response.body.error).toBeTruthy();
  });

  test('response should return a successful message', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.body.message).toEqual('The request was successful');
  });

  test('response should return a successful message', async () => {
    const response = await request(app).get('/admins?active=true').send();
    expect(response.body.message).toEqual('The request was successful');
  });

  test('response should return a not found message', async () => {
    const response = await request(app).get('/admins?name=').send();
    expect(response.body.message).toEqual('Admins not found');
  });

  test('response should return at least one admin', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should return at least one admin', async () => {
    const response = await request(app).get('/admins?active=true').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should not return an admin', async () => {
    const response = await request(app).get('/admins?name=').send();
    expect(response.body.data).toBeUndefined();
  });
});
