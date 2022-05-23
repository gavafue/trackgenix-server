import request from 'supertest';
// import mongoose from 'mongoose';
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

describe('GET /timeSheets', () => {
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
});

// describe('POST /timeSheets', () => {
//   test('response should return a 201 status', async () => {
//     const response = await request(app).post('/timeSheets').send({
//       project: mongoose.Types.ObjectId('628bb53a8667fb09f64dd9fd'),
//       employee: mongoose.Types.ObjectId('60d4a32f257e066e8495ce12'),
//       weekSprint: 7,
//       date: '2021-10-21T03:00:00.000Z',
//       hoursWorked: 5,
//       hoursProject: 15,
//       workDescription: 'Created server',
//     });
//     expect(response.status).toBe(201);
//   });

//   test('response should return a successful message', async () => {
//     const response = await request(app).post('/timeSheets').send({
//       project: mongoose.Types.ObjectId('628bb53a8667fb09f64dd9fd'),
//       employee: mongoose.Types.ObjectId('60d4a32f257e066e8495ce12'),
//       weekSprint: 7,
//       date: '2021-10-21T03:00:00.000Z',
//       hoursWorked: 5,
//       hoursProject: 15,
//       workDescription: 'Created server',
//     });
//     expect(response.body.message).toBe('Time-Sheet created successfully');
//   });

//   test('response should return the created time sheet', async () => {
//     const response = await request(app).post('/timeSheets').send({
//       project: mongoose.Types.ObjectId('628bb53a8667fb09f64dd9fd'),
//       employee: mongoose.Types.ObjectId('60d4a32f257e066e8495ce12'),
//       weekSprint: 7,
//       date: '2021-10-21T03:00:00.000Z',
//       hoursWorked: 5,
//       hoursProject: 15,
//       workDescription: 'Created server',
//     });
//     expect(response.body.data).toBeDefined();
//   });

//   test('response should return false error', async () => {
//     const response = await request(app).post('/timeSheets').send({
//       project: mongoose.Types.ObjectId('628bb53a8667fb09f64dd9fd'),
//       employee: mongoose.Types.ObjectId('60d4a32f257e066e8495ce12'),
//       weekSprint: 7,
//       date: '2021-10-21T03:00:00.000Z',
//       hoursWorked: 5,
//       hoursProject: 15,
//       workDescription: 'Created server',
//     });
//     expect(response.error).toBe(false);
//   });
// });
