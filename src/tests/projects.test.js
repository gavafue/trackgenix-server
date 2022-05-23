/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import projectsSeeds from '../seeds/projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeeds);
});

describe('GET ALL /projects', () => {
  test('Return correct status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });
  test('Response error false by correct sentence ', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.error).toBe(false);
  });
  test('Return bad request false', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.error).not.toBe(true);
  });
  test('Return data in projects', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('Return error in projects', async () => {
    const response = await request(app).get('/projects?client=').send();
    expect(response.status).toBe(404);
  });
  test('Return error in validations Names of projects', async () => {
    const response = await request(app).get('/projects?name=').send();
    expect(response.error).not.toBe(false);
  });
  test('Return error in validations startDate of projects', async () => {
    const response = await request(app).get('/projects?startDate=').send();
    expect(response.error).not.toBe(false);
  });
});

describe ('POST /projects', () => {
    test ('Create a project', async () => {
        const response = await request(app).post('/projects/').send({
        members:[{
         name:'60d4a32f257e066e8495ce12',
         role: 'DEV',
         rate:'1500'
        }],
        name:"Trackgenix",
        startDate:'2021-06-04T03:00:00.000+00:00',
        endDate:'2022-06-05T03:00:00.000+00:00',
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        active:true,
        client:"Diego Armando",
        })
        expect (response.status).toBe(201);
    })
    test ('message in correct sentence', async () => {
        const response = await request(app).post('/projects/').send({
        members:[{
         name:'60d4a32f257e066e8495ce12',
         role: 'DEV',
         rate:'1500'
        }],
        name:"Trackgenix",
        startDate:'2021-06-04T03:00:00.000+00:00',
        endDate:'2022-06-05T03:00:00.000+00:00',
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit",
        active:true,
        client:"Diego Armando",
        })
        expect (response.body.message).toEqual('Project created successfully.');
    })
    test ('Error in creation of project', async () => {
        const response = await request(app).post('/projects/').send();
        expect (response.status).toBe(400);
    })
    test('Return false in project create', async () => {
        const response = await request(app).post('/projects').send();
        expect(response.error).not.toBe(true);
    });
});