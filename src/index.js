// use "import" to import libraries
import express from 'express';
import * as adminsControllers from './resources/admins';

// use "require" to import JSON files
// const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Routes admins

app.get('/admins', adminsControllers.getAllAdmins);
app.post('/admins/add', adminsControllers.addAdmin);
app.put('/admins/update/:id', adminsControllers.updateAdmin);
app.get('/admins/getById/:id', adminsControllers.getAdminById);
app.delete('/admins/deleteById/:id', adminsControllers.deleteAdminById);
app.get('/admins/getByGender', adminsControllers.getAdminByGender);
app.get('/admins/getByName', adminsControllers.getAdminByName);

// app.get('/admins', (req, res) => {
//   res.status(200).json({
//     data: admins,
//   });
// });

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
