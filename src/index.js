import express from 'express';

import * as projectsControllers from './resources/projects';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Routes for projects
app.post('/project/add', projectsControllers.createProject);
app.put('/project/edit/:id', projectsControllers.editProject);
app.get('/project/:id', projectsControllers.getProjectById);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
