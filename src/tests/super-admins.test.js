/* eslint-disable no-underscore-dangle */
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

let superAdminId1;
let superAdminId2;
let superAdminId3;
describe('POST /super-admins', () => {
  test('Response should return a 201 status', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Jotaro',
      lastName: 'Kujo',
      password: 'Y4r3Y4r3D4z3',
      role: 'SA',
      email: 'jo.jo@swmarine.com',
      active: true,
    });
    expect(response.status).toBe(201);
    superAdminId1 = response.body.data._id;
  });

  test('Response should return error false', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Jotaro',
      lastName: 'Kujo',
      password: 'Y4r3Y4r3D4z3',
      role: 'SA',
      email: 'jo.j0@swmarine.com',
      active: true,
    });
    expect(response.error).toBe(false);
    superAdminId2 = response.body.data._id;
  });

  test('Response should return the created super admin', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Risotto',
      lastName: 'Nero',
      password: 'M3t4ll1c4',
      role: 'SA',
      email: 'risotto.n@squadra.com',
      active: false,
    });
    expect(response.body.data).not.toBe(undefined);
    superAdminId3 = response.body.data._id;
  });
});

describe('GET /super-admins/:id', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get(`/super-admin/${superAdminId1}`).send();
    expect(response.status).toBe(200);
  });

  test('Response should return error false', async () => {
    const response = await request(app).get(`/super-admin/${superAdminId1}`).send();
    expect(response.error).toBe(false);
  });

  test('Response should return a super admin', async () => {
    const response = await request(app).get(`/super-admin/${superAdminId1}`).send();
    expect(response.body.data).not.toBe(undefined);
  });
});

describe('DELETE /super-admins/:id', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).delete(`/super-admin/${superAdminId1}`).send();
    expect(response.status).toBe(200);
  });

  test('Response should return error false', async () => {
    const response = await request(app).delete(`/super-admin/${superAdminId2}`).send();
    expect(response.error).toBe(false);
  });
});

describe('PUT /super-admins/:id', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).put(`/super-admin/${superAdminId3}`).send({
      password: 'p455w0rD',
      email: 'risotto.nero@squadra.com',
    });
    expect(response.status).toBe(200);
  });

  test('Response should return error false', async () => {
    const response = await request(app).put(`/super-admin/${superAdminId3}`).send({
      firstName: 'Fugo',
      active: true,
    });
    expect(response.error).toBe(false);
  });

  test('Response should return edited super admin', async () => {
    const response = await request(app).get(`/super-admin/${superAdminId3}`).send({
      lastName: 'Speedwagon',
      email: 'pesci@squadra.com',
    });
    expect(response.body.data).not.toBe(undefined);
  });
});
