import express from 'express';
import * as projectsControllers from './resources/projects';
import * as employeesControllers from './resources/employees';
import * as superadminControllers from './resources/super-admins';
import * as adminsControllers from './resources/admins';
import * as timeSheetControllers from './resources/time-sheets';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes employees
app.get('/employees', employeesControllers.getAllEmployee);
app.get('/employees/:id', employeesControllers.getOnlyId);
app.get('/employees/country/:country', employeesControllers.filterByCountry);
app.post('/employees', employeesControllers.createMember);
app.put('/employee/:id', employeesControllers.editEmployeeById);
app.delete('/employee/:id', employeesControllers.deleteEmployeeById);
app.get('/employee/:lastName', employeesControllers.filterByLastName);

// Routes time sheet
app.post('/timeSheet', timeSheetControllers.createTimeSheet);
app.delete('/timeSheet/:id', timeSheetControllers.deleteTimeSheet);
app.get('/timeSheet/:employeeName', timeSheetControllers.filterTSByName);
app.get('/timeSheet/:id', timeSheetsControllers.gettimeSheetById);
app.put('/timeSheet/:id', timeSheetsControllers.editTimeSheet);
app.get('/timeSheetByProject/:project', timeSheetsControllers.filterTSheetProject);

// Routes admins
app.get('/admins', adminsControllers.getAllAdmins);
app.post('/admins/add', adminsControllers.addAdmin);
app.put('/admins/update/:id', adminsControllers.updateAdmin);
app.get('/admins/getById/:id', adminsControllers.getAdminById);
app.delete('/admins/deleteById/:id', adminsControllers.deleteAdminById);
app.get('/admins/getByGender', adminsControllers.getAdminByGender);
app.get('/admins/getByName', adminsControllers.getAdminByName);

// Routes projects
app.post('/project/add', projectsControllers.createProject);
app.put('/project/edit/:id', projectsControllers.editProject);
app.get('/project/:id', projectsControllers.getProjectById);
app.delete('/delete/project/:id', projectsControllers.deleteProjects);
app.get('/projects/', projectsControllers.getProjects);
app.post('/:projectId/addMember', projectsControllers.assignRP);

// Routes superadmins
app.get('/superadmins', superadminControllers.getAllSa);
app.get('/superadmins/getById/:id', superadminControllers.getSaById);
app.post('/superadmins/add', superadminControllers.createSa);
app.delete('/superadmins/delete/:id', superadminControllers.deleteSa);
app.get('/superadmins/getActive', superadminControllers.getActiveSa);
app.put('/superadmins/edit/:id', superadminControllers.editSa);

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening on port ${port}`);
});
