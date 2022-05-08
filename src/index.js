// use "import" to import libraries
import express from 'express';
import * as adminsControllers from './resources/admins';

// console.log(adminsControllers);

// use "require" to import JSON files
// const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Routes admins

app.get('/admins', adminsControllers.getAllAdmins);
app.get('/admins/:id', adminsControllers.getAdminById);
// app.post('/admins', adminsControllers.createAdmin);
// app.delete('/admins/:id', adminsControllers.deleteAdminById);

// app.post('/admins', postAdmin);
// app.put('/admins', updateAdmin);
// app.delete('/admins', deleteAdmin);

// Filters
// app.get('/admins/getAdminsByName/:name', getAdminByName);
// app.get('/admins/getAdminsByGender/:gender', getAdminByGender);

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
