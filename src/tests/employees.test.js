/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import EmployeeModel from '../models/Employees';
import employeesSeed from '../seeds/employees';

let employeesId1;
let employeesId2;
let employeesId3;
let employeesId4;

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

describe('POST /employees', () => {
  test('Should return a 201 status when an employee are created', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Tadeo',
      lastName: 'Cherry',
      birthDate: '06/04/1942',
      country: 'Poland',
      city: 'Zaklików',
      zip: '37470',
      phone: '4152354251',
      email: 'tcherry6@angelfire.com',
      password: 'U0y8aLihaW',
      photo: 'http://dummyimage.com/100x100.png/dddddd/000000',
      active: true,
    });
    expect(response.status).toBe(201);
    employeesId1 = response.body.data._id;
  });

  test('Should indicate the creation of an Employee', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Tadeo',
      lastName: 'Cherry',
      birthDate: '06/04/1942',
      country: 'Poland',
      city: 'Zaklików',
      zip: '37470',
      phone: '4152354251',
      email: 'diositoGMAN@com.as',
      password: 'U0y8aLihaW',
      photo: 'http://dummyimage.com/100x100.png/dddddd/000000',
      active: false,
    });
    expect(response.body.message).toEqual('Employee created succesfully');
    employeesId2 = response.body.data._id;
  });

  test('Should show the data of the Employee created when is created', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Tadeo',
      lastName: 'Cherry',
      birthDate: '06/04/1942',
      country: 'Poland',
      city: 'Zaklików',
      zip: '37470',
      phone: '4152354251',
      email: 'acordeau5s@jigsy.com',
      password: 'U0y8aLihaW',
      photo: 'http://dummyimage.com/100x100.png/dddddd/000000',
      active: true,
    });
    expect(response.body.data).toMatchObject({
      firstName: 'Tadeo',
      lastName: 'Cherry',
      birthDate: '1942-06-04T03:00:00.000Z',
      country: 'Poland',
      city: 'Zaklików',
      zip: 37470,
      phone: 4152354251,
      email: 'acordeau5s@jigsy.com',
      password: 'U0y8aLihaW',
      photo: 'http://dummyimage.com/100x100.png/dddddd/000000',
      active: true,
    });
    employeesId3 = response.body.data._id;
  });

  test('Should return false error when a employee is created succesfully', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Tadeo',
      lastName: 'Cherry',
      birthDate: '06/04/1942',
      country: 'Poland',
      city: 'Zaklików',
      zip: '37470',
      phone: '4152354251',
      email: 'elmawaso6@quienpregunta.com',
      password: 'U0y8aLihaW',
      photo: 'http://dummyimage.com/100x100.png/dddddd/000000',
      active: false,
    });
    expect(response.body.error).not.toBeTruthy();
    employeesId4 = response.body.data._id;
  });

  test('Should return a 400 status when a account with that email already exists', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'German',
      lastName: 'Borges',
      birthDate: '04/18/1990',
      country: 'United Kingdom',
      city: 'East End',
      zip: '58794',
      phone: '5876943215',
      email: 'tcherry6@angelfire.com',
      password: 'J5JQwOjK',
      photo: 'http://dummyimage.com/100x100.png/dddddd/000000',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('Should indicate that there is already an employee with that email', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'German',
      lastName: 'Borges',
      birthDate: '04/18/1990',
      country: 'United Kingdom',
      city: 'East End',
      zip: '58794',
      phone: '5876943215',
      email: 'tcherry6@angelfire.com',
      password: 'J5JQwOjK',
      photo: 'http://dummyimage.com/100x100.png/dddddd/000000',
      active: true,
    });
    expect(response.body.message).toEqual('Employee account with this email already exists');
  });

  test('Should return true error when that employee already exists', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Tadeo',
      lastName: 'Cherry',
      birthDate: '06/04/1942',
      country: 'Poland',
      city: 'Zaklików',
      zip: '37470',
      phone: '4152354251',
      email: 'tcherry6@angelfire.com',
      password: 'U0y8aLihaW',
      photo: 'http://dummyimage.com/100x100.png/dddddd/000000',
      active: false,
    });
    expect(response.body.error).toBeTruthy();
  });
});

describe('PUT /employees', () => {
  test('Should return a 200 status when a employee is updated sucessfully', async () => {
    const response = await request(app).put(`/employees/${employeesId1}`).send({
      firstName: 'Giuseppe',
      lastName: 'Pinocho',
      birthDate: '04/18/1990',
      country: 'Italy',
      city: 'Rome',
      zip: '87935',
      phone: '5876943215',
      email: 'tcherry6@angelfire.com',
      password: 'J5JQwOjK',
      photo: 'http://dummyimage.com/100x100.png/dddddd/000000',
      active: false,
    });
    expect(response.status).toBe(200);
  });

  test('Should indicate than an employee was updated', async () => {
    const response = await request(app).put(`/employees/${employeesId2}`).send({
      firstName: 'Romeo',
      lastName: 'Garrica',
      country: 'Chile',
      city: 'Santiago',
      zip: '21458',
      email: 'los33@live.com.ar',
      active: true,
    });
    expect(response.body.message).toEqual(`Employee account with ID "${employeesId2}" updated succesfully`);
  });

  test('Should show the update data of that Employee', async () => {
    const response = await request(app).put(`/employees/${employeesId3}`).send({
      firstName: 'Carlos',
      lastName: 'Heisenberg',
      country: 'Argentina',
      city: 'Rosario',
      zip: '2005',
      email: 'tuturrito@hotmail.com',
      active: false,
    });
    expect(response.body.data).toMatchObject({
      firstName: 'Carlos',
      lastName: 'Heisenberg',
      country: 'Argentina',
      city: 'Rosario',
      zip: 2005,
      email: 'tuturrito@hotmail.com',
      active: false,
    });
  });

  test('Should return a false error when a employee is updated sucessfully', async () => {
    const response = await request(app).put(`/employees/${employeesId4}`).send({
      firstName: 'Daniel',
      lastName: 'Monzon',
      country: 'Colombia',
      city: 'Medellin',
      zip: '67587',
      email: 'jmaskelyne5y@drupal.org',
      active: true,
    });
    expect(response.body.error).not.toBeTruthy();
  });

  test('Should return a 404 status when not found that employee', async () => {
    const response = await request(app).put('/employees/60d4a32c257e066e6495ce18').send({
      firstName: 'Giuseppe',
      lastName: 'Pinocho',
      country: 'Italy',
      city: 'Rome',
      zip: '87935',
      email: 'tcherry6@angelfire.com',
      active: false,
    });
    expect(response.status).toBe(404);
  });

  test('Should indicate than can not find an specific Employee', async () => {
    const response = await request(app).put('/employees/60d4a32c257e066e6495ce18').send({
      firstName: 'Giuseppe',
      lastName: 'Pinocho',
      country: 'Italy',
      city: 'Rome',
      zip: '87935',
      email: 'tcherry6@angelfire.com',
      active: false,
    });
    expect(response.body.message).toEqual('Employee account with ID "60d4a32c257e066e6495ce18" can not be found.');
  });

  test('Should return a true error when not found that employee', async () => {
    const response = await request(app).put('/employees/60d4a32c257e066e6495ce18').send({
      firstName: 'Giuseppe',
      lastName: 'Pinocho',
      country: 'Italy',
      city: 'Rome',
      zip: '87935',
      email: 'tcherry6@angelfire.com',
      active: false,
    });
    expect(response.body.error).toBeTruthy();
  });
});
