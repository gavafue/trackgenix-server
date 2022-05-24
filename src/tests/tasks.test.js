/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import Tasks from '../models/Tasks';
import taskSeed from '../seeds/tasks';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await Tasks.collection.insertMany(taskSeed);
  await Projects.collection.insertMany(projectsSeed);
});

let taskId;

describe('POST /tasks', () => {
  test('Should create a task', async () => {
    const response = await request(app).post('/tasks/').send({
      nameProject: mongoose.Types.ObjectId('628bb53a8667fb09f64dd9fd'),
      week: 33,
      day: 7,
      description: 'ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo',
      hours: 77,
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
    const response = await request(app).put('/tasks/').send();
    expect(response.status).toBe(404);
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
