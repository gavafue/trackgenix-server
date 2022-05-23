import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import tasksSeed from '../seeds/tasks';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
  await Tasks.collection.insertMany(projectsSeed);
});

let taskId1;
let taskId2;
let taskId3;
let taskId4;

describe('GET /tasks', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.status).toBe(200);
  });

  test('response should return false error', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.error).toBe(false);
  });

  test('response should return message for succes', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.message).toEqual('Tasks lists fetched successfully');
  });

  test('response should return message for succes', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.message).not.toEqual('Tasks was not found');
  });
});

describe('DELETE /task:id', () => {
  test('response should return a 200 status', async () => {
    // eslint-disable-next-line no-underscore-dangle
    taskId1 = tasksSeed[0]._id;
    const response = await request(app).delete(`/tasks/${taskId1}`).send();
    expect(response.status).toBe(200);
  });

  test('response should return false error', async () => {
    // eslint-disable-next-line no-underscore-dangle
    taskId2 = tasksSeed[1]._id;
    const response = await request(app).delete(`/tasks/${taskId2}`).send();
    expect(response.error).toBe(false);
  });

  test('response should return message for succes', async () => {
    // eslint-disable-next-line no-underscore-dangle
    taskId3 = tasksSeed[2]._id;
    const response = await request(app).delete(`/tasks/${taskId3}`).send();
    expect(response.body.message).toEqual(`Task with ID ${taskId3} deleted.`);
  });

  test('response should return message for succes', async () => {
    // eslint-disable-next-line no-underscore-dangle
    taskId4 = tasksSeed[3]._id;
    const response = await request(app).delete(`/tasks/${taskId4}`).send();
    expect(response.body.message).not.toEqual(`The task with ID ${taskId4} can't be found.`);
  });
});
