import express from 'express';

import * as projectsControllers from './resources/projects';
import * as adminsControllers from './resources/admins';
import * as timeSheetControllers from './resources/time-sheets';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Routes for projects
app.post('/project/add', projectsControllers.createProject);
app.put('/project/edit/:id', projectsControllers.editProject);
app.get('/project/:id', projectsControllers.getProjectById);
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

// Time sheet controllers
app.post('/timeSheet', timeSheetControllers.createTimeSheet);
app.delete('/timeSheet/:id', timeSheetControllers.deleteTimeSheet);
app.get('/timeSheet/:employeeName', timeSheetControllers.filterTSByName);

// Routes admins
app.get('/admins', adminsControllers.getAllAdmins);
app.post('/admins/add', adminsControllers.addAdmin);
app.put('/admins/update/:id', adminsControllers.updateAdmin);
app.get('/admins/getById/:id', adminsControllers.getAdminById);
app.delete('/admins/deleteById/:id', adminsControllers.deleteAdminById);
app.get('/admins/getByGender', adminsControllers.getAdminByGender);
app.get('/admins/getByName', adminsControllers.getAdminByName);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
