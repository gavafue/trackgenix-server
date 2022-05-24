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
});
