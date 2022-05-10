// use "import" to import libraries
import express from 'express';
import * as tasksController from './resources/tasks';
import * as timeSheetControllers from './resources/time-sheets';

// use "require" to import JSON files

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.post('/tasks/add', tasksController.createTask);
app.put('/tasks/edit/:id', tasksController.editTask);
app.get('/tasks/:id', tasksController.getTaskById);
app.delete('/delete/task/:id', tasksController.deleteTask);
app.get('/tasks/hours/:hours', tasksController.getTasksByHours);

// Time sheet controllers
app.post('/timeSheet', timeSheetControllers.createTimeSheet);
app.delete('/timeSheet/:id', timeSheetControllers.deleteTimeSheet);
app.get('/timeSheet/:employeeName', timeSheetControllers.filterTSByName);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
