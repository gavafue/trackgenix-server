import express from 'express';
// import all the functions for projects
import * as projectsControllers from './resources/projects';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// define the route to create a project
app.post('/project/add', projectsControllers.createProject);

// define the route to get a project by id
app.get('/project/:id', projectsControllers.getProjectById);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
