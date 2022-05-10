// use "import" to import libraries
import express from 'express';
import * as employeesControllers from './resources/employees';

// use "require" to import JSON files
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.put('/employee/:id', employeesControllers.editEmployeeById);
app.delete('/employee/:id', employeesControllers.deleteEmployeeById);
app.get('/employee/:lastName', employeesControllers.filterByLastName);

app.get('/', async (req, res) => {
  res.send('Hello !');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
