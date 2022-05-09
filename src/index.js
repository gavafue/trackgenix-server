// use "import" to import libraries
import express from 'express';
import * as projectsControllers from './resources/projects';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.delete('/delete/project/:id', projectsControllers.deleteProjects);
// app.get('/projects/', projectsControllers.getProjects);
// app.put(), projectsControllers.function);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
