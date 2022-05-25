/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import tasksSeed from '../seeds/tasks';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
  await Tasks.collection.insertMany(projectsSeed);
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
      const response = await request(app).get('/tasks?week=').send();
      expect(response.status).toBe(200);
    });

    test('response should not return a 404 status (query params: week)', async () => {
      const response = await request(app).get('/tasks?week=').send();
      expect(response.status).not.toBe(404);
    });

    test('response should not return error (query params: week)', async () => {
      const response = await request(app).get('/tasks?week=').send();
      expect(response.error).toBeFalsy();
    });

    test('response should return message for succes (query params: week)', async () => {
      const response = await request(app).get('/tasks?week=').send();
      expect(response.body.message).toEqual('Tasks lists fetched successfully');
    });

    test('response should not return message for error (query params: week)', async () => {
      const response = await request(app).get('/tasks?week=').send();
      expect(response.body.message).not.toEqual('Tasks was not found');
    });

    test('response should not return data undefined (query params: week)', async () => {
      const response = await request(app).get('/tasks?week=').send();
      expect(response.body.data).toBeDefined();
    });

    // for day
    test('response should return a 200 status (query params: )', async () => {
      const response = await request(app).get('/tasks?day=').send();
      expect(response.status).toBe(200);
    });

    test('response should not return a 404 status (query params: )', async () => {
      const response = await request(app).get('/tasks?day=').send();
      expect(response.status).not.toBe(404);
    });

    test('response should not return error (query params: )', async () => {
      const response = await request(app).get('/tasks?day=').send();
      expect(response.error).toBeFalsy();
    });

    test('response should return message for succes (query params: )', async () => {
      const response = await request(app).get('/tasks?day=').send();
      expect(response.body.message).toEqual('Tasks lists fetched successfully');
    });

    test('response should not return message for error (query params: )', async () => {
      const response = await request(app).get('/tasks?day=').send();
      expect(response.body.message).not.toEqual('Tasks was not found');
    });

    test('response should not return data undefined (query params: )', async () => {
      const response = await request(app).get('/tasks?day=').send();
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
});
