/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import projectsSeeds from '../seeds/projects';

beforeAll (async () =>{
    await Projects.collection.insertMany(projectsSeeds)
});

describe ('GET ALL /projects', () => {
    test('Return correct status', async () => {
       const response = await request(app).get('/projects').send();
       expect (response.status).toBe(200);
    })
    test('Response error false by correct sentence ', async () => {
        const response = await request(app).get('/projects').send();
         expect (response.error).toBe(false);
    })
    test('Return bad request false', async () => {
        const response = await request(app).get('/projects').send();
         expect (response.error).not.toBe(true);
    })  
    test('Return data in projects', async () => {
        const response = await request(app).get('/projects').send();
         expect (response.body.data.length).toBeGreaterThan(0);
         })
    test('Return error in projects', async () => {
        const response = await request(app).get('/projects?client=').send();
        expect (response.status).toBe(404);
        }) 
    test('Return error in validations Names of projects', async () => {
         const response = await request(app).get('/projects?name=').send();
         expect (response.error).not.toBe(false);
        })         
    test('Return error in validations startDate of projects', async () => {
        const response = await request(app).get('/projects?startDate=').send();
        expect (response.error).not.toBe(false);
        })                               
});