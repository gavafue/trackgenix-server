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
  describe('time sheets are found with GET', () => {
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

  describe('filtered time sheets are found with GET', () => {
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
  });

  describe('filtered time sheets are not found with GET', () => {
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

  describe('filtered time sheets are not valid with GET', () => {
    test('response should return a 400 status', async () => {
      const response = await request(app).get('/timeSheets/?hoursWorked=cinco').send();
      expect(response.status).toBe(400);
    });

    test('response should return undefined', async () => {
      const response = await request(app).get('/timeSheets/?hoursWorked=cinco').send();
      expect(response.body.data).toBeUndefined();
    });

    test('response should return true error', async () => {
      const response = await request(app).get('/timeSheets/?hoursWorked=cinco').send();
      expect(response.error).toBeTruthy();
    });
  });
});

describe('POST /timeSheets', () => {
  describe('time sheet created with POST', () => {
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
  });

  describe('time sheet has incorrect id for projects with POST', () => {
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
  });

  describe('time sheet does not pass validations with POST', () => {
    const NewTS2 = {
      employee: mongoose.Types.ObjectId('6282ca7cf9ae0f95595c6a68'),
      weekSprint: 7,
      date: '2021-10-21T03:00:00.000Z',
      hoursWorked: 5,
      hoursProject: 15,
      workDescription: 'Created server',
    };

    test('response should return a 400 status', async () => {
      const response = await request(app).post('/timeSheets').send(NewTS2);
      expect(response.status).toBe(400);
    });

    test('response should return undefined', async () => {
      const response = await request(app).post('/timeSheets').send(NewTS2);
      expect(response.body.data).toBeUndefined();
    });

    test('response should return true error', async () => {
      const response = await request(app).post('/timeSheets').send(NewTS2);
      expect(response.error).toBeTruthy();
    });
  });
});

describe('GET /timeSheets/:id', () => {
  describe('time sheet is found with GET by id', () => {
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

  describe('time sheet is not found with GET by id', () => {
    test('response should return a 404 status', async () => {
      const response = await request(app).get('/timeSheets/62897cab226713c9db1bfc50').send();
      expect(response.status).toBe(404);
    });

    test('response should return a not found message', async () => {
      const response = await request(app).get('/timeSheets/62897cab226713c9db1bfc50').send();
      expect(response.body.message).toBe('The time sheet with id 62897cab226713c9db1bfc50 has not been found');
    });

    test('response should return undefined', async () => {
      const response = await request(app).get('/timeSheets/62897cab226713c9db1bfc50').send();
      expect(response.body.data).toBeUndefined();
    });

    test('response should return true error', async () => {
      const response = await request(app).get('/timeSheets/62897cab226713c9db1bfc50').send();
      expect(response.error).toBeTruthy();
    });
  });

  describe('id is not valid with GET by id', () => {
    test('response should return a 400 status', async () => {
      const response = await request(app).get('/timeSheets/1').send();
      expect(response.status).toBe(400);
    });

    test('response should return undefined', async () => {
      const response = await request(app).get('/timeSheets/1').send();
      expect(response.body.data).toBeUndefined();
    });

    test('response should return true error', async () => {
      const response = await request(app).get('/timeSheets/1').send();
      expect(response.error).toBeTruthy();
    });
  });
});

describe('PUT /timeSheets/:id', () => {
  describe('time sheet is updated successfully with PUT', () => {
    test('response should return a 200 status', async () => {
      const response = await request(app).put(`/timeSheets/${timeSheetId1}`).send({
        workDescription: 'Created server correction',
      });
      expect(response.status).toBe(200);
    });

    test('response should return a successful message', async () => {
      const response = await request(app).put(`/timeSheets/${timeSheetId2}`).send({
        workDescription: 'Created server correction',
      });
      expect(response.body.message).toBe('The time-sheet updated successfully');
    });

    test('response should return the updated time sheet', async () => {
      const response = await request(app).put(`/timeSheets/${timeSheetId3}`).send({
        workDescription: 'Created server correction',
      });
      expect(response.body.data).toBeDefined();
    });

    test('response should return false error', async () => {
      const response = await request(app).put(`/timeSheets/${timeSheetId4}`).send({
        workDescription: 'Created server correction',
      });
      expect(response.error).toBe(false);
    });
  });

  describe('time sheet is not found with PUT', () => {
    test('response should return a 404 status', async () => {
      const response = await request(app).put('/timeSheets/62897cab226713c9db1bfc50').send({
        workDescription: 'Created server correction',
      });
      expect(response.status).toBe(404);
    });

    test('response should return a not found message', async () => {
      const response = await request(app).put('/timeSheets/62897cab226713c9db1bfc50').send({
        workDescription: 'Created server correction',
      });
      expect(response.body.message).toBe('Id 62897cab226713c9db1bfc50 does not exist');
    });

    test('response should return undefined', async () => {
      const response = await request(app).put('/timeSheets/62897cab226713c9db1bfc50').send({
        workDescription: 'Created server correction',
      });
      expect(response.body.data).toBeUndefined();
    });

    test('response should return true error', async () => {
      const response = await request(app).put('/timeSheets/62897cab226713c9db1bfc50').send({
        workDescription: 'Created server correction',
      });
      expect(response.error).toBeTruthy();
    });
  });

  describe('id is not valid with PUT', () => {
    test('response should return a 400 status', async () => {
      const response = await request(app).put('/timeSheets/62897cab226713c9db1bfc').send({
        workDescription: 'Created server correction',
      });
      expect(response.status).toBe(400);
    });

    test('response should return undefined', async () => {
      const response = await request(app).put('/timeSheets/62897cab226713c9db1bfc').send({
        workDescription: 'Created server correction',
      });
      expect(response.body.data).toBeUndefined();
    });

    test('response should return true error', async () => {
      const response = await request(app).put('/timeSheets/62897cab226713c9db1bfc').send({
        workDescription: 'Created server correction',
      });
      expect(response.error).toBeTruthy();
    });
  });

  describe('time sheet does not pass validations with PUT', () => {
    test('response should return a 400 status', async () => {
      const response = await request(app).put('/timeSheets/628ba8924413b59d3cfa99b7').send({
        workDescription: 5,
      });
      expect(response.status).toBe(400);
    });

    test('response should return undefined', async () => {
      const response = await request(app).put('/timeSheets/628ba8924413b59d3cfa99b7').send({
        workDescription: 5,
      });
      expect(response.body.data).toBeUndefined();
    });

    test('response should return true error', async () => {
      const response = await request(app).put('/timeSheets/628ba8924413b59d3cfa99b7').send({
        workDescription: 5,
      });
      expect(response.error).toBeTruthy();
    });
  });
});

describe('DELETE /timeSheets/:id', () => {
  describe('time sheet is deleted successfully with DELETE', () => {
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

  describe('time sheet is not found with DELETE', () => {
    test('response should return a 404 status', async () => {
      const response = await request(app).delete('/timeSheets/62897cab226713c9db1bfc50').send();
      expect(response.status).toBe(404);
    });

    test('response should return a not found message', async () => {
      const response = await request(app).delete('/timeSheets/62897cab226713c9db1bfc50').send();
      expect(response.body.message).toBe('The time sheet with id 62897cab226713c9db1bfc50 has not been found');
    });

    test('response should return undefined', async () => {
      const response = await request(app).delete('/timeSheets/62897cab226713c9db1bfc50').send();
      expect(response.body.data).toBeUndefined();
    });

    test('response should return true error', async () => {
      const response = await request(app).delete('/timeSheets/62897cab226713c9db1bfc50').send();
      expect(response.error).toBeTruthy();
    });
  });

  describe('id is not valid with DELETE', () => {
    test('response should return a 400 status', async () => {
      const response = await request(app).delete('/timeSheets/62897cab226713c9db1bfc').send();
      expect(response.status).toBe(400);
    });

    test('response should return undefined', async () => {
      const response = await request(app).delete('/timeSheets/62897cab226713c9db1bfc').send();
      expect(response.body.data).toBeUndefined();
    });

    test('response should return true error', async () => {
      const response = await request(app).delete('/timeSheets/62897cab226713c9db1bfc').send();
      expect(response.error).toBeTruthy();
    });
  });
});
