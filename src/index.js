// use "import" to import libraries
import express from 'express';
import * as superadminControllers from './resources/super-admins';
import * as adminsControllers from './resources/admins';
import * as timeSheetControllers from './resources/time-sheets';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

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

// Routes superadmins
app.get('/superadmins', superadminControllers.getAllSa);
app.get('/superadmins/getById/:id', superadminControllers.getSaById);
app.post('/superadmins/add', superadminControllers.putNewSa);
app.delete('/superadmins/delete/:id', superadminControllers.delSa);
app.get('/superadmins/getActive', superadminControllers.getActiveSa);
app.put('/superadmins/edit/:id', superadminControllers.editSa);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
