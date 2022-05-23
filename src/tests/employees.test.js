/* test.todo('add required tests'); */
import request from 'supertest';
import app from '../app';
import EmployeeModel from '../models/Employees';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await EmployeeModel.collection.insertMany(employeesSeed);
});

describe('GetAll - Employee', () => {
  test('This should be status 200', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(200);
  });
  test('response error false ', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.error).toBe(false);
  });
  test('Return bad request false ', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.error).not.toBe(true);
  });
  test('return data in employees ', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
