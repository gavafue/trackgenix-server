// use "import" to import libraries
import express from 'express';
import { urlencoded } from 'express';
import * as employeesControllers from './resources/employees';
// use "require" to import JSON files

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.get('/employees', employeesControllers.getAllEmployee);
app.get('/employees/:id', employeesControllers.getOnlyId);
app.get('/employees/:phone', employeesControllers.getOnlyId);
app.post('/employees', employeesControllers.createMember);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
