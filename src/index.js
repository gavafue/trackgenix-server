import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
// import * as tasksController from './controllers/tasks';
// import * as timeSheetControllers from './controllers/time-sheets';
// import * as projectsControllers from './controllers/projects';
// import * as employeesControllers from './controllers/employees';
// import * as superadminControllers from './controllers/super-admins';
// import * as adminsControllers from './controllers/admins';

const app = express();
const port = process.env.PORT || 3000;
// eslint-disable-next-line max-len
const MONGO_URL = 'mongodb+srv://radiumRocket:8dll6U2hMKSETFAK@trackgenix.0a7hs.mongodb.net/Trackgenix?retryWrites=true&w=majority';

app.use(express.json());
app.use(router);

// // Routes employees
// app.get('/employees', employeesControllers.getAllEmployee);
// app.get('/employees/:id', employeesControllers.getOnlyId);
// app.get('/employees/country/:country', employeesControllers.filterByCountry);
// app.post('/employees', employeesControllers.createMember);
// app.put('/employee/:id', employeesControllers.editEmployeeById);
// app.delete('/employee/:id', employeesControllers.deleteEmployeeById);
// app.get('/employee/:lastName', employeesControllers.filterByLastName);

// // Routes time sheet
// app.post('/timeSheet', timeSheetControllers.createTimeSheet);
// app.delete('/timeSheet/:id', timeSheetControllers.deleteTimeSheet);
// app.get('/timeSheet/:employeeName', timeSheetControllers.filterTSByName);
// app.get('/timeSheet/:id', timeSheetControllers.gettimeSheetById);
// app.put('/timeSheet/:id', timeSheetControllers.editTimeSheet);
// app.get('/timeSheetByProject/:project', timeSheetControllers.filterTSheetProject);

// // Routes admins
// app.get('/admins', adminsControllers.getAllAdmins);
// app.post('/admins/add', adminsControllers.addAdmin);
// app.put('/admins/update/:id', adminsControllers.updateAdmin);
// app.get('/admins/getById/:id', adminsControllers.getAdminById);
// app.delete('/admins/deleteById/:id', adminsControllers.deleteAdminById);
// app.get('/admins/getByGender', adminsControllers.getAdminByGender);
// app.get('/admins/getByName', adminsControllers.getAdminByName);

// // Routes projects
// app.post('/project/add', projectsControllers.createProject);
// app.put('/project/edit/:id', projectsControllers.editProject);
// app.get('/project/:id', projectsControllers.getProjectById);
// app.delete('/delete/project/:id', projectsControllers.deleteProjects);
// app.get('/projects/', projectsControllers.getProjects);
// app.post('/:projectId/addMember', projectsControllers.assignRP);

// // Routes superadmins
// app.get('/superadmins', superadminControllers.getAllSa);
// app.get('/superadmins/getById/:id', superadminControllers.getSaById);
// app.post('/superadmins/add', superadminControllers.createSa);
// app.delete('/superadmins/delete/:id', superadminControllers.deleteSa);
// app.get('/superadmins/getActive', superadminControllers.getActiveSa);
// app.put('/superadmins/edit/:id', superadminControllers.editSa);

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      console.log('Fail connection to database', error);
    } else {
      console.log('Connected to database');
      app.listen(port, () => {
        console.log(`Server ready on port ${port}`);
      });
    }
  },
);
