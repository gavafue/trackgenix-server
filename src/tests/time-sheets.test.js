/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import TimeSheets from '../models/Time-sheets';
import Projects from '../models/Projects';
import Employees from '../models/Employees';
import timeSheetsSeed from '../seeds/time-sheets';
import projectsSeed from '../seeds/projects';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await TimeSheets.collection.insertMany(timeSheetsSeed);
  await Projects.collection.insertMany(projectsSeed);
  await Employees.collection.insertMany(employeesSeed);
});

let timeSheetId1;
let timeSheetId2;
let timeSheetId3;
let timeSheetId4;

describe('GET /timeSheets', () => {
  // SUCCESS
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/timeSheets').send();
    expect(response.status).toBe(200);
  });

  test('response should return a successful message', async () => {
    const response = await request(app).get('/timeSheets').send();
    expect(response.body.message).toBe('The time-sheet was found');
  });

  test('response should return at least one time sheet', async () => {
    const response = await request(app).get('/timeSheets').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/timeSheets').send();
    expect(response.error).toBe(false);
  });

  // SUCCESS WITH FILTERS
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/timeSheets/?weekSprint=7').send();
    expect(response.status).toBe(200);
  });

  test('response should return a successful message', async () => {
    const response = await request(app).get('/timeSheets/?weekSprint=7').send();
    expect(response.body.message).toBe('The time-sheet was found');
  });

  test('response should return at least one time sheet', async () => {
    const response = await request(app).get('/timeSheets/?weekSprint=7').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/timeSheets/?weekSprint=7').send();
    expect(response.error).toBe(false);
  });

  // NOT FOUND
  test('response should return a 404 status', async () => {
    const response = await request(app).get('/timeSheets/?date=').send();
    expect(response.status).toBe(404);
  });

  test('response should return a not found message', async () => {
    const response = await request(app).get('/timeSheets/?date=').send();
    expect(response.body.message).toBe('Time-sheet was not found');
  });

  test('response should return undefined', async () => {
    const response = await request(app).get('/timeSheets/?date=').send();
    expect(response.body.data).toBeUndefined();
  });

  test('response should return true error', async () => {
    const response = await request(app).get('/timeSheets/?date=').send();
    expect(response.error).toBeTruthy();
  });
});

describe('POST /timeSheets', () => {
  const createTimeSheet = {
    project: mongoose.Types.ObjectId('628bb53a8667fb09f64dd9fd'),
    employee: mongoose.Types.ObjectId('6282ca7cf9ae0f95595c6a68'),
    weekSprint: 7,
    date: '2021-10-21T03:00:00.000Z',
    hoursWorked: 5,
    hoursProject: 15,
    workDescription: 'Created server',
  };

  test('response should return a 201 status', async () => {
    const response = await request(app).post('/timeSheets').send(createTimeSheet);
    expect(response.status).toBe(201);
    timeSheetId1 = response.body.data._id;
  });

  test('response should return a successful message', async () => {
    const response = await request(app).post('/timeSheets').send(createTimeSheet);
    expect(response.body.message).toBe('Time-Sheet created successfully');
    timeSheetId2 = response.body.data._id;
  });

  test('response should return the created time sheet', async () => {
    const response = await request(app).post('/timeSheets').send(createTimeSheet);
    expect(response.body.data).toBeDefined();
    timeSheetId3 = response.body.data._id;
  });

  test('response should return false error', async () => {
    const response = await request(app).post('/timeSheets').send(createTimeSheet);
    expect(response.error).toBe(false);
    timeSheetId4 = response.body.data._id;
  });

  // NOT FOUND
  const NewTS = {
    project: mongoose.Types.ObjectId('628bb53a8667fb09f64dd9fa'),
    employee: mongoose.Types.ObjectId('6282ca7cf9ae0f95595c6a68'),
    weekSprint: 7,
    date: '2021-10-21T03:00:00.000Z',
    hoursWorked: 5,
    hoursProject: 15,
    workDescription: 'Created server',
  };

  test('response should return a 404 status', async () => {
    const response = await request(app).post('/timeSheets').send(NewTS);
    expect(response.status).toBe(404);
  });

  test('response should return a not found message', async () => {
    const response = await request(app).post('/timeSheets').send(NewTS);
    expect(response.body.message)
      .toBe(`There is no project with id ${NewTS.project} or employee with the id: ${NewTS.employee}`);
  });

  test('response should return undefined', async () => {
    const response = await request(app).post('/timeSheets').send(NewTS);
    expect(response.body.data).toBeUndefined();
  });

  test('response should return true error', async () => {
    const response = await request(app).post('/timeSheets').send(NewTS);
    expect(response.error).toBeTruthy();
  });

  // DOESN´T PASS THE VALIDATIONS
});

describe('GET /timeSheets/:id', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get(`/timeSheets/${timeSheetId1}`).send();
    expect(response.status).toBe(200);
  });

  test('response should return a successful message', async () => {
    const response = await request(app).get(`/timeSheets/${timeSheetId1}`).send();
    expect(response.body.message).toBe('The request was successful');
  });

  test('response should return at least one time sheet', async () => {
    const response = await request(app).get(`/timeSheets/${timeSheetId1}`).send();
    expect(response.body.data).toBeDefined();
  });

  test('response should return false error', async () => {
    const response = await request(app).get(`/timeSheets/${timeSheetId1}`).send();
    expect(response.error).toBe(false);
  });
});

describe('PUT /timeSheets/:id', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).put(`/timeSheets/${timeSheetId1}`).send({
      //   project: mongoose.Types.ObjectId('628bb53a8667fb09f64dd9fd'),
      //   employee: mongoose.Types.ObjectId('6282ca7cf9ae0f95595c6a68'),
      //   weekSprint: 7,
      //   date: '2021-10-21T03:00:00.000Z',
      //   hoursWorked: 5,
      //   hoursProject: 15,
      workDescription: 'Created server correction',
    });
    expect(response.status).toBe(200);
  });

  test('response should return a successful message', async () => {
    const response = await request(app).put(`/timeSheets/${timeSheetId2}`).send({
      //   project: mongoose.Types.ObjectId('628bb53a8667fb09f64dd9fd'),
      //   employee: mongoose.Types.ObjectId('6282ca7cf9ae0f95595c6a68'),
      //   weekSprint: 7,
      //   date: '2021-10-21T03:00:00.000Z',
      //   hoursWorked: 5,
      //   hoursProject: 15,
      workDescription: 'Created server correction',
    });
    expect(response.body.message).toBe('The time-sheet updated successfully');
  });

  test('response should return the updated time sheet', async () => {
    const response = await request(app).put(`/timeSheets/${timeSheetId3}`).send({
      //   project: mongoose.Types.ObjectId('628bb53a8667fb09f64dd9fd'),
      //   employee: mongoose.Types.ObjectId('6282ca7cf9ae0f95595c6a68'),
      //   weekSprint: 7,
      //   date: '2021-10-21T03:00:00.000Z',
      //   hoursWorked: 5,
      //   hoursProject: 15,
      workDescription: 'Created server correction',
    });
    expect(response.body.data).toBeDefined();
  });

  test('response should return false error', async () => {
    const response = await request(app).put(`/timeSheets/${timeSheetId4}`).send({
      //   project: mongoose.Types.ObjectId('628bb53a8667fb09f64dd9fd'),
      //   employee: mongoose.Types.ObjectId('6282ca7cf9ae0f95595c6a68'),
      //   weekSprint: 7,
      //   date: '2021-10-21T03:00:00.000Z',
      //   hoursWorked: 5,
      //   hoursProject: 15,
      workDescription: 'Created server correction',
    });
    expect(response.error).toBe(false);
  });
});

describe('DELETE /timeSheets/:id', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).delete(`/timeSheets/${timeSheetId1}`).send();
    expect(response.status).toBe(200);
  });

  test('response should return a successful message', async () => {
    const response = await request(app).delete(`/timeSheets/${timeSheetId2}`).send();
    expect(response.body.message).toBe(`The time sheet with ${timeSheetId2} has been successfully deleted`);
  });

  test('response should return the deleted time sheet', async () => {
    const response = await request(app).delete(`/timeSheets/${timeSheetId3}`).send();
    expect(response.body.data).toBeDefined();
  });

  test('response should return false error', async () => {
    const response = await request(app).delete(`/timeSheets/${timeSheetId4}`).send();
    expect(response.error).toBe(false);
  });
});
