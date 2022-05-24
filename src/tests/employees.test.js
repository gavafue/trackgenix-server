/* test.todo('add required tests'); */
import request from 'supertest';
import app from '../app';
import EmployeeModel from '../models/Employees';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await EmployeeModel.collection.insertMany(employeesSeed);
});

describe('GetAll - Employees', () => {
  test('This should be status 200', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(200);
  });
  test('The message will return when it is successfully found', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.message).toBe('The list has been successfully retrieved');
  });
  test('Response error false', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.error).toBe(false);
  });
  test('Return content with data', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('When the query is incorrect you must return the error message', async () => {
    const response = await request(app).get('/employees?firstName=').send();
    expect(response.body.message).toBe('You must enter a correct query');
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

const idEmployee = '6282ca7cf9ae0f95595c6a68';
describe('GetById - Employees', () => {
  test('This should be status 200', async () => {
    const response = await request(app).get('/employees/6282ca7cf9ae0f95595c6a68').send();
    expect(response.status).toBe(200);
  });
  test('The message will return when it is successfully found', async () => {
    const response = await request(app).get('/employees/6282ca7cf9ae0f95595c6a68').send();
    expect(response.body.message).toBe(`This employee with ID ${idEmployee} has been found`);
  });
  test('Response error false', async () => {
    const response = await request(app).get('/employees/6282ca7cf9ae0f95595c6a68').send();
    expect(response.error).toBe(false);
  });
  test('Return content with data', async () => {
    const response = await request(app).get('/employees/6282ca7cf9ae0f95595c6a68').send();
    expect(response.body.data).toBeDefined();
  });
  test('Returns 400 when by id incorrect', async () => {
    const response = await request(app).get('/employees/6282ca75c6a68').send();
    expect(response.status).toBe(400);
  });
  test('Return undefined with data in error', async () => {
    const response = await request(app).get('/employees/6282ca75c6a68').send();
    expect(response.body.data).toBeUndefined();
  });
});

const idEmployeeDelete = '6283a60fe570d6df244f64aa';
describe('Delete - Employees', () => {
  test('This should be status 200', async () => {
    const response = await request(app).delete('/employees/6283a60fe570d6df244f64aa').send();
    expect(response.status).toBe(200);
  });
  test('The message will return when it is successfully delete', async () => {
    const response = await request(app).delete('/employees/6283a60fe570d6df244f64aa').send();
    expect(response.body.message).toBe(`This employee with ID ${idEmployeeDelete} has been eliminated`);
  });
  test('Response error false', async () => {
    const response = await request(app).delete('/employees/6283a60fe570d6df244f64aa').send();
    expect(response.error).toBe(false);
  });
  test('Return content with data', async () => {
    const response = await request(app).delete('/employees/6283a60fe570d6df244f64aa').send();
    expect(response.body.data).toBeDefined();
  });
  test('Returns 400 when employee  was not deleted', async () => {
    const response = await request(app).delete('/employees/6282ca75c6a68').send();
    expect(response.status).toBe(400);
  });
  test('Return undefined with data in error', async () => {
    const response = await request(app).delete('/employees/6282ca75c6a68').send();
    expect(response.body.data).toBeUndefined();
  });
});
