import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeed from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

let newAdmin;

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

describe('POST /admins', () => {
  newAdmin = {
    name: 'Thomas',
    lastName: 'Shelby',
    email: 'thomasshel@aol.com',
    password: '6321keel',
    gender: 'Male',
    phone: '3760343434',
    zip: '3233',
    city: 'London',
    active: false,
    dateBirth: '08/06/1978',
  };

  test('response should return a 201 status', async () => {
    const response = await request(app).post('/admins').send(newAdmin);
    expect(response.status).toBe(201);
  });

  test('response should return a 400 status', async () => {
    const response = await request(app).post('/admins').send(newAdmin);
    expect(response.status).toBe(400);
  });

  test('response should return a true error', async () => {
    const response = await request(app).post('/admins').send(newAdmin);
    expect(response.body.error).toBeTruthy();
  });

  test('response should return a false error', async () => {
    newAdmin.email = 'newEmail@gmail.com';
    const response = await request(app).post('/admins').send(newAdmin);
    expect(response.body.error).toBeFalsy();
  });

  test('response should return an already exist message', async () => {
    const response = await request(app).post('/admins').send(newAdmin);
    expect(response.body.message).toEqual('An admin with this email already exists');
  });

  test('response should return success message', async () => {
    newAdmin.email = 'newEmail-2@gmail.com';
    const response = await request(app).post('/admins').send(newAdmin);
    expect(response.body.message).toEqual('Admin created successfully');
  });

  test('response should return an undefined data', async () => {
    const response = await request(app).post('/admins').send(newAdmin);
    expect(response.body.data).toBeUndefined();
  });

  test('response should return the created admin', async () => {
    newAdmin.email = 'newEmail-3@gmail.com';
    const response = await request(app).post('/admins').send(newAdmin);
    expect(response.body.data).toBeDefined();
  });
});
