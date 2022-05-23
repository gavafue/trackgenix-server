import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import tasksSeed from '../seeds/tasks';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
  await Tasks.collection.insertMany(projectsSeed);
});

// let taskId;

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
    // taskId = response.body.data.id;
  });
});

// describe('DELETE /task:id', () => {
//   test('response should return a 200 status', async () => {
//     const response = await request(app).delete(`/tasks/${taskId}`).send();
//     expect(response.status).toBe(200);
//   });

//   test('response should return false error', async () => {
//     const response = await request(app).delete(`/tasks/${taskId}`).send();
//     expect(response.error).toBe(false);
//   });

//   test('response should return message for succes', async () => {
//     const response = await request(app).delete(`/tasks/${taskId}`).send();
//     expect(response.body.message).toEqual(`Task with ID ${taskId} deleted.`);
//   });

//   test('response should return message for succes', async () => {
//     const response = await request(app).delete(`/tasks/${taskId}`).send();
//     expect(response.body.message).not.toEqual(`The task with ID ${taskId} can't be found.`);
//   });
// });
