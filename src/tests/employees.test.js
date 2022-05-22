import request from 'supertest';
import app from '../app';
import EmployeeModel from '../models/Employees';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await EmployeeModel.collection.insertMany(employeesSeed);
});

describe('POST /employees', () => {
  test('Should return a 201 status', async () => {
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
  });
});
