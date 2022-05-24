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
  test('Response error false', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.error).toBe(false);
  });
  test('Return content with data', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('Returns error if the first name is empty', async () => {
    const response = await request(app).get('/employees?firstName=').send();
    expect(response.status).toBe(404);
  });
  test('Returns error if the last name is empty', async () => {
    const response = await request(app).get('/employees?lastName=').send();
    expect(response.status).toBe(404);
  });
  test('Returns error if the birth date is empty', async () => {
    const response = await request(app).get('/employees?birthDate=').send();
    expect(response.status).toBe(404);
  });
  test('Returns error if the country is empty', async () => {
    const response = await request(app).get('/employees?country=').send();
    expect(response.status).toBe(404);
  });
  test('Returns error if the city is empty', async () => {
    const response = await request(app).get('/employees?city=').send();
    expect(response.status).toBe(404);
  });
  test('Returns error if the zip is empty', async () => {
    const response = await request(app).get('/employees?zip=').send();
    expect(response.status).toBe(404);
  });
  test('Returns error if the phone is empty', async () => {
    const response = await request(app).get('/employees?phone=').send();
    expect(response.status).toBe(404);
  });
  test('Returns error if the email is empty', async () => {
    const response = await request(app).get('/employees?email=').send();
    expect(response.status).toBe(404);
  });
  test('Returns error if the password is empty', async () => {
    const response = await request(app).get('/employees?password=').send();
    expect(response.status).toBe(404);
  });
  test('Returns error if the photo is empty', async () => {
    const response = await request(app).get('/employees?photo=').send();
    expect(response.status).toBe(404);
  });
});

/* describe('DELETE /emplyees', () => {
  test('Delete employee', async () => {
    const response = await request(app).delete('/employees/60d4a32f257e066e8495ce12').send();
    expect(response.status).toBe(200);
  });
});
 */
