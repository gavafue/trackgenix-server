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

  test('Response message should be the same as in controller', async () => {
    const response = await request(app).get('/super-admin').send();
    expect(response.body.message).toBe('The request was made successfully');
  });

  test('Response should return a 404 status', async () => {
    const response = await request(app).get('/super-admin?firstName=Diavolo').send();
    expect(response.status).toBe(404);
  });

  test('Response message should be the same as in controller', async () => {
    const response = await request(app).get('/super-admin?firstName=Diavolo').send();
    expect(response.body.message).toBe('Super admin was not found');
  });

  test('Response should return undefined data', async () => {
    const response = await request(app).get('/super-admin?firstName=Diavolo').send();
    expect(response.body.data).toBe(undefined);
  });

  test('Response should return error true', async () => {
    const response = await request(app).get('/super-admin?firstName=Diavolo').send();
    expect(response.body.error).toBe(true);
  });

  test('Response should return more than one super admin', async () => {
    const response = await request(app).get('/super-admin?active=true').send();
    expect(response.body.data.length).toBeGreaterThan(1);
  });

  test('Response should return more than one super admin', async () => {
    const response = await request(app).get('/super-admin?active=false').send();
    expect(response.body.data.length).toBeGreaterThan(1);
  });

  test('Response should return the requested employee', async () => {
    const response = await request(app).get('/super-admin?firstName=Dio').send();
    expect(response.body.data[0].firstName).toBe('Dio');
  });

  test('Response should return the requested employee', async () => {
    const response = await request(app).get('/super-admin?email=dio.muda@konodda.com').send();
    expect(response.body.data[0].firstName).toBe('Dio');
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

  test('Response should return error true', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Risotto',
      lastName: 'Nero',
      password: 'M3t4ll1c4',
      role: 'QA',
      email: 'risotto.nero@squadra.com',
      active: false,
    });
    expect(response.body.error).toBe(true);
  });

  test('Response should return a 200 status', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Risotto',
      lastName: 'Nero',
      password: 'M3t4ll1c4',
      role: 'SA',
      email: 'risotto.n@squadra.com',
      active: false,
    });
    expect(response.status).toBe(200);
  });

  test('Response should return error true', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Risotto',
      lastName: 'Nero',
      password: 'M3t4ll1c4',
      role: 'SA',
      email: 'risotto.n@squadra.com',
      active: false,
    });
    expect(response.body.error).toBe(true);
  });

  test('Response should return undefined data', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Risotto',
      lastName: 'Nero',
      password: 'M3t4ll1c4',
      role: 'SA',
      email: 'risotto.n@squadra.com',
      active: false,
    });
    expect(response.body.data).toBe(undefined);
  });

  test('Response message should be the same as in controller', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Risotto',
      lastName: 'Nero',
      password: 'M3t4ll1c4',
      role: 'SA',
      email: 'risotto.n@squadra.com',
      active: false,
    });
    expect(response.body.message).toBe('Super admin with this email already exists');
  });

  test('Response should return error true', async () => {
    const response = await request(app).post('/super-admin').send({
      lastName: 'Nero',
      password: 'M3t4ll1c4',
      role: 'SA',
      email: 'risotto.nero@squadra.com',
      active: false,
    });
    expect(response.body.error).toBe(true);
  });

  test('Response should return a 400 status', async () => {
    const response = await request(app).post('/super-admin').send({
      lastName: 'Nero',
      password: 'M3t4ll1c4',
      role: 'SA',
      email: 'risotto.nero@squadra.com',
      active: false,
    });
    expect(response.status).toBe(400);
  });

  test('Response should return undefined data', async () => {
    const response = await request(app).post('/super-admin').send({
      lastName: 'Nero',
      password: 'M3t4ll1c4',
      role: 'SA',
      email: 'risotto.nero@squadra.com',
      active: false,
    });
    expect(response.body.data).toBe(undefined);
  });

  test('Response should return error true', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Risotto',
      password: 'M3t4ll1c4',
      role: 'SA',
      email: 'risotto.n@squadra.com',
      active: false,
    });
    expect(response.body.error).toBe(true);
  });

  test('Response should return error true', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Risotto',
      lastName: 'Nero',
      role: 'SA',
      email: 'risotto.n@squadra.com',
      active: false,
    });
    expect(response.body.error).toBe(true);
  });

  test('Response should return error true', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Risotto',
      lastName: 'Nero',
      password: 'M3t4ll1c4',
      email: 'risotto.n@squadra.com',
      active: false,
    });
    expect(response.body.error).toBe(true);
  });

  test('Response should return error true', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Risotto',
      lastName: 'Nero',
      password: 'M3t4ll1c4',
      role: 'SA',
      active: false,
    });
    expect(response.body.error).toBe(true);
  });

  test('Response should return error true', async () => {
    const response = await request(app).post('/super-admin').send({
      firstName: 'Risotto',
      lastName: 'Nero',
      password: 'M3t4ll1c4',
      role: 'SA',
      email: 'risotto.n@squadra.com',
    });
    expect(response.body.error).toBe(true);
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

  test('Response message should be the same as in controller', async () => {
    const response = await request(app).get(`/super-admin/${superAdminId1}`).send();
    expect(response.body.message).toBe('The request was successful');
  });

  test('Response should return correct super admin', async () => {
    const response = await request(app).get(`/super-admin/${superAdminId1}`).send();
    expect(response.body.data.email).toBe('jo.jo@swmarine.com');
  });

  test('Response should return a 404 status', async () => {
    const response = await request(app).get('/super-admin/628c086f48e6f9779ae82eac').send();
    expect(response.status).toBe(404);
  });

  test('Response should return error true', async () => {
    const response = await request(app).get('/super-admin/628c086f48e6f9779ae82eac').send();
    expect(response.body.error).toBe(true);
  });

  test('Response should return undefined data', async () => {
    const response = await request(app).get('/super-admin/628c086f48e6f9779ae82eac').send();
    expect(response.body.data).toBe(undefined);
  });

  test('Response message should be the same as in controller', async () => {
    const response = await request(app).get('/super-admin/628c086f48e6f9779ae82eac').send();
    expect(response.body.message).toBe('The superadmin with id 628c086f48e6f9779ae82eac has not been found');
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
    const response = await request(app).put(`/super-admin/${superAdminId3}`).send({
      lastName: 'Speedwagon',
      email: 'pesci@squadra.com',
    });
    expect(response.body.data).not.toBe(undefined);
  });

  test('Response message should be the same as in controller', async () => {
    const response = await request(app).put(`/super-admin/${superAdminId3}`).send({
      firstName: 'Luke',
      active: false,
    });
    expect(response.body.message).toBe('Super admin updated successfully');
  });

  test('Response should return a 404 status(id not in database)', async () => {
    const response = await request(app).put('/super-admin/628bcfc73699c2ac94a02a8c').send({
      lastName: 'Evans',
      email: 'valderrama@squadra.com',
    });
    expect(response.status).toBe(404);
  });

  test('Response should return a 404 status(no id sent)', async () => {
    const response = await request(app).put('/super-admin/').send({
      lastName: 'Evans',
      email: 'valderrama@squadra.com',
    });
    expect(response.status).toBe(404);
  });
});

describe('DELETE /super-admins/:id', () => {
  test('Response should return a 200 status(success)', async () => {
    const response = await request(app).delete(`/super-admin/${superAdminId1}`).send();
    expect(response.status).toBe(200);
  });

  test('Response should return error false(success)', async () => {
    const response = await request(app).delete(`/super-admin/${superAdminId2}`).send();
    expect(response.error).toBe(false);
  });

  test('Response message should be the same as in controller(success)', async () => {
    const response = await request(app).delete(`/super-admin/${superAdminId3}`).send();
    expect(response.body.message).toBe('The Super admin has been susccessfully deleted');
  });

  test('Response should return a 404 status(no id sent)', async () => {
    const response = await request(app).delete('/super-admin/').send();
    expect(response.status).toBe(404);
  });

  test('Response should return a 404 status(id not in database)', async () => {
    const response = await request(app).delete('/super-admin/628bcfc73699c2ac94a02a8c').send();
    expect(response.status).toBe(404);
  });

  test('Response message should be the same as in controller(id not in database)', async () => {
    const response = await request(app).delete('/super-admin/628bcfc73699c2ac94a02a8c').send();
    expect(response.body.message).toBe('The Super admin has not been found');
  });

  test('Response should return undefined data(id not in database)', async () => {
    const response = await request(app).delete('/super-admin/628bcfc73699c2ac94a02a8c').send();
    expect(response.body.data).toBe(undefined);
  });

  test('Response should return error true', async () => {
    const response = await request(app).delete('/super-admin/628bcfc73699c2ac94a02a8c').send();
    expect(response.body.error).toBe(true);
  });
});
