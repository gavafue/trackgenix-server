/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import Tasks from '../models/Tasks';
import tasksSeed from '../seeds/tasks';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
  await Projects.collection.insertMany(projectsSeed);
});

let taskId;

describe('GET /tasks', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.status).toBe(200);
  });

  test('response should not return a 404 status', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.status).not.toBe(404);
  });

  test('response should not return error', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.error).toBeFalsy();
  });

  test('response should return message for succes', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.message).toEqual('Tasks lists fetched successfully');
  });

  test('response should not return message for error', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.message).not.toEqual('Tasks was not found');
  });

  test('response should not return data undefined', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.data).toBeDefined();
  });

  describe('in case of query params', () => {
    // for week
    test('response should return a 200 status (query params: week)', async () => {
      const response = await request(app).get('/tasks?week=45').send();
      expect(response.status).toBe(200);
    });

    test('response should not return a 404 status (query params: week)', async () => {
      const response = await request(app).get('/tasks?week=45').send();
      expect(response.status).not.toBe(404);
    });

    test('response should not return error (query params: week)', async () => {
      const response = await request(app).get('/tasks?week=45').send();
      expect(response.error).toBeFalsy();
    });

    test('response should return message for succes (query params: week)', async () => {
      const response = await request(app).get('/tasks?week=45').send();
      expect(response.body.message).toEqual('Tasks lists fetched successfully');
    });

    test('response should not return message for error (query params: week)', async () => {
      const response = await request(app).get('/tasks?week=45').send();
      expect(response.body.message).not.toEqual('Tasks was not found');
    });

    test('response should not return data undefined (query params: week)', async () => {
      const response = await request(app).get('/tasks?week=45').send();
      expect(response.body.data).toBeDefined();
    });

    // for day
    test('response should return a 200 status (query params: )', async () => {
      const response = await request(app).get('/tasks?day=4').send();
      expect(response.status).toBe(200);
    });

    test('response should not return a 404 status (query params: )', async () => {
      const response = await request(app).get('/tasks?day=4').send();
      expect(response.status).not.toBe(404);
    });

    test('response should not return error (query params: )', async () => {
      const response = await request(app).get('/tasks?day=4').send();
      expect(response.error).toBeFalsy();
    });

    test('response should return message for succes (query params: )', async () => {
      const response = await request(app).get('/tasks?day=4').send();
      expect(response.body.message).toEqual('Tasks lists fetched successfully');
    });

    test('response should not return message for error (query params: )', async () => {
      const response = await request(app).get('/tasks?day=4').send();
      expect(response.body.message).not.toEqual('Tasks was not found');
    });

    test('response should not return data undefined (query params: )', async () => {
      const response = await request(app).get('/tasks?day=4').send();
      expect(response.body.data).toBeDefined();
    });
  });
});

describe('DELETE /task:id', () => {
  describe('in case an id is valid', () => {
    test('response should return a 200 status', async () => {
      taskId = tasksSeed[0]._id;
      const response = await request(app).delete(`/tasks/${taskId}`).send();
      expect(response.status).toBe(200);
    });

    test('response should not return error', async () => {
      taskId = tasksSeed[1]._id;
      const response = await request(app).delete(`/tasks/${taskId}`).send();
      expect(response.error).toBeFalsy();
    });

    test('response should return message for succes', async () => {
      taskId = tasksSeed[2]._id;
      const response = await request(app).delete(`/tasks/${taskId}`).send();
      expect(response.body.message).toEqual(`Task with ID ${taskId} deleted.`);
    });

    test('response should not return message for error', async () => {
      taskId = tasksSeed[3]._id;
      const response = await request(app).delete(`/tasks/${taskId}`).send();
      expect(response.body.message).not.toEqual(`The task with ID ${taskId} can't be found.`);
    });

    test('response should not return a 404 status', async () => {
      taskId = tasksSeed[4]._id;
      const response = await request(app).delete(`/tasks/${taskId}`).send();
      expect(response.status).not.toBe(404);
    });

    test('response should not return data undefinded', async () => {
      taskId = tasksSeed[5]._id;
      const response = await request(app).delete(`/tasks/${taskId}`).send();
      expect(response.body.data).toBeDefined();
    });
  });
});

describe('in case an id does not exist', () => {
  test('response should return data undefinded', async () => {
    const response = await request(app).delete('/tasks/6289ab61fc13ae770a100000').send();
    expect(response.body.data).toBeUndefined();
  });

  test('response should not return a 200 status', async () => {
    const response = await request(app).delete('/tasks/6289ab61fc13ae770a100000').send();
    expect(response.status).not.toBe(200);
  });

  test('response should return error', async () => {
    const response = await request(app).delete('/tasks/6289ab61fc13ae770a100000').send();
    expect(response.error).toBeTruthy();
  });

  test('response should not return message for succes', async () => {
    const response = await request(app).delete('/tasks/6289ab61fc13ae770a100000').send();
    expect(response.body.message).not.toEqual('Task with ID 6289ab61fc13ae770a100000 deleted.');
  });

  test('response should return message for error', async () => {
    const response = await request(app).delete('/tasks/6289ab61fc13ae770a100000').send();
    expect(response.body.message).toEqual('The task with ID 6289ab61fc13ae770a100000 can\'t be found.');
  });

  test('response should return a 404 status', async () => {
    const response = await request(app).delete('/tasks/6289ab61fc13ae770a100000').send();
    expect(response.status).toBe(404);
  });

  test('response should return data undefinded', async () => {
    const response = await request(app).delete('/tasks/6289ab61fc13ae770a100000').send();
    expect(response.body.data).toBeUndefined();
  });
});

describe('POST /tasks', () => {
  test('Should create a task', async () => {
    const response = await request(app).post('/tasks/').send({
      nameProject: mongoose.Types.ObjectId('628bb53a8667fb09f64dd9fd'),
      week: 33,
      day: 7,
      description: 'ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo',
      hours: 77,
      firebaseUid: '6282ca7cf9ae0f95595c6a68',
    });
    expect(response.status).toBe(201);
    taskId = response.body.data._id;
  });

  test('Message should indicate the creation of the task', async () => {
    const response = await request(app).post('/tasks/').send({
      nameProject: mongoose.Types.ObjectId('628bb53a8667fb09f64dd9fd'),
      week: 33,
      day: 7,
      description: 'ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo',
      hours: 77,
      firebaseUid: '6282ca7cf9ae0f95595c6a68',
    });
    expect(response.body.message).toEqual('The task has been created successfully');
  });

  test('It should show that the project with the id was not found', async () => {
    const response = await request(app).post('/tasks/').send({
      nameProject: mongoose.Types.ObjectId('628bb52bc5505d956f41a109'),
      week: 33,
      day: 7,
      description: 'ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo',
      hours: 77,
      firebaseUid: '6282ca7cf9ae0f95595c6a68',
    });
    expect(response.status).toBe(404);
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.error).toBe(false);
  });
});

describe('GET by ID /tasks/:id', () => {
  test('A success message should be displayed', async () => {
    const response = await request(app).get(`/tasks/${taskId}`).send();
    expect(response.status).toBe(200);
  });
  test('It should show that the task with the id was not found', async () => {
    const response = await request(app).get('/tasks/628bb52bc5505d956f41a109').send();
    expect(response.status).toBe(404);
  });
  test('Return at least one task', async () => {
    const response = await request(app).get(`/tasks/${taskId}`).send();
    expect(response.body.data).toBeDefined();
  });
  test('response should return false error', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.error).toBe(false);
  });
});

describe('PUT /tasks', () => {
  test('It should return a message that it has been edited successfully', async () => {
    const response = await request(app).put(`/tasks/${taskId}`).send({
      nameProject: mongoose.Types.ObjectId(),
      week: 3,
      day: 6,
      description: 'edited edited edited',
      hours: 11,
    });
    expect(response.status).toBe(200);
  });
  test('The added value is not a valid id.', async () => {
    const response = await request(app).put(`/tasks/${null}`).send();
    expect(response.status).toBe(400);
  });
  test('The added value is not a valid id.', async () => {
    const response = await request(app).put('/tasks/628bb52bc5505d956f41a109').send();
    expect(response.status).toBe(404);
  });
  test('response should return false error', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.error).toBe(false);
  });
});
