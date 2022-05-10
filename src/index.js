// use "import" to import libraries
import express from 'express';
import * as tasksController from './resources/tasks';
// use "require" to import JSON files

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.post('/tasks/add', tasksController.createTask);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
