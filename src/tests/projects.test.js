import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import projectsSeeds from '../seeds/projects';

let projectsId;

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

describe('POST /projects', () => {
  test('Create a project', async () => {
    const response = await request(app)
      .post('/projects/')
      .send({
        firebaseUid: '6282ca7cf9ae0f95595c6a68',
        members: [
          {
            name: '60d4a32f257e066e8495ce12',
            role: 'DEV',
            rate: '1500',
          },
        ],
        name: 'Trackgenix',
        startDate: '2021-06-04T03:00:00.000+00:00',
        endDate: '2022-06-05T03:00:00.000+00:00',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        active: true,
        client: 'Diego Armando',
      });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    projectsId = response.body.data._id;
  });
  test('message in correct sentence', async () => {
    const response = await request(app)
      .post('/projects/')
      .send({
        firebaseUid: '6282ca7cf9ae0f95595c6a68',
        members: [
          {
            name: '60d4a32f257e066e8495ce12',
            role: 'DEV',
            rate: '1500',
          },
        ],
        name: 'Trackgenix',
        startDate: '2021-06-04T03:00:00.000+00:00',
        endDate: '2022-06-05T03:00:00.000+00:00',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        active: true,
        client: 'Diego Armando',
      });
    expect(response.body.message).toEqual('Project created successfully.');
  });
  test('Error in creation of project', async () => {
    const response = await request(app).post('/projects/').send();
    expect(response.status).toBe(400);
  });
  test('Return false in project create', async () => {
    const response = await request(app).post('/projects').send();
    expect(response.error).not.toBe(true);
  });
});

describe('GET by ID /projects', () => {
  test('Get project by ID', async () => {
    const response = await request(app).get(`/projects/${projectsId}`).send();
    expect(response.status).toBe(200);
  });
  test('Get error in a body project by ID', async () => {
    const response = await request(app).get(`/projects/${projectsId}`).send();
    expect(response.error).toBe(false);
  });

  test('Get message project by ID', async () => {
    const response = await request(app).get(`/projects/${projectsId}`).send();
    expect(response.body.message).toEqual('Project found succesfull');
  });
  test('Get error missing id parameter project by ID', async () => {
    const response = await request(app).get('/projects/123123').send();
    expect(response.status).toBe(400);
  });
  test('Get error in body project by ID', async () => {
    const response = await request(app).get('/projects/123123').send();
    expect(response.body.error).toBe(true);
  });
});
describe('PUT /projects', () => {
  test('Edit the project', async () => {
    const response = await request(app)
      .put(`/projects/${projectsId}`)
      .send({
        members: [
          {
            name: '60d4a32f257e066e8495ce12',
            role: 'DEV',
            rate: '1500',
          },
        ],
        name: 'Trackgenix',
        startDate: '2021-06-04T03:00:00.000+00:00',
        endDate: '2022-06-05T03:00:00.000+00:00',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        active: true,
        client: 'Diego Armando',
      });
    expect(response.status).toBe(200);
  });
  test('Edit the project get error by controller', async () => {
    const response = await request(app)
      .put(`/projects/${projectsId}`)
      .send({
        members: [
          {
            name: '60d4a32f257e066e8495ce12',
            role: 'DEV',
            rate: '1500',
          },
        ],
        name: 'Trackgenix',
        startDate: '2021-06-04T03:00:00.000+00:00',
        endDate: '2022-06-05T03:00:00.000+00:00',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        active: true,
        client: 'Diego Armando',
      });
    expect(response.error).toBe(false);
  });
  test('Return message in edit project', async () => {
    const response = await request(app)
      .put(`/projects/${projectsId}`)
      .send({
        members: [
          {
            name: '60d4a32f257e066e8495ce12',
            role: 'DEV',
            rate: '1500',
          },
        ],
        name: 'Trackgenix',
        startDate: '2021-06-04T03:00:00.000+00:00',
        endDate: '2022-06-05T03:00:00.000+00:00',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        active: true,
        client: 'Diego Armando',
      });
    expect(response.body.message).toEqual(
      `Project with id ${projectsId} edited.`,
    );
  });
  test('Edit projects with some fields', async () => {
    const response = await request(app)
      .put(`/projects/${projectsId}`)
      .send({
        members: [
          {
            name: '60d4a32f257e066e8495ce12',
            role: 'DEV',
            rate: '1500',
          },
        ],
        name: 'Trackgenix',
        startDate: '2021-06-04T03:00:00.000+00:00',
        endDate: '2022-06-05T03:00:00.000+00:00',
      });
    expect(response.status).toBe(200);
  });
  test('Edit projects with some fields getting error parameter', async () => {
    const response = await request(app)
      .put(`/projects/${projectsId}`)
      .send({
        members: [
          {
            name: '60d4a32f257e066e8495ce12',
            role: 'DEV',
            rate: '1500',
          },
        ],
        name: 'Trackgenix',
        startDate: '2021-06-04T03:00:00.000+00:00',
        endDate: '2022-06-05T03:00:00.000+00:00',
      });
    expect(response.error).toBe(false);
  });
  test('Error in missing id parameter', async () => {
    const response = await request(app).put('/projects/123654').send();
    expect(response.status).toBe(400);
  });
  test('response error in missing id parameter', async () => {
    const response = await request(app).put('/projects/123654').send();
    expect(response.body.error).toBe(true);
  });
});
describe('DELETE /projects', () => {
  test('Delete user', async () => {
    const response = await request(app).delete(`/projects/${projectsId}`).send();
    expect(response.status).toEqual(200);
  });
  test('Return bad request false', async () => {
    const response = await request(app).delete(`/projects/${projectsId}`).send();
    expect(response.body.error).toBeTruthy();
  });
  test('Return error in a delete user', async () => {
    const response = await request(app).delete(`/projects/${projectsId}`).send();
    expect(response.status).toEqual(404);
  });
});
