// use "import" to import libraries
import express from 'express';
import * as superadminControllers from './resources/super-admins';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/superadmins', superadminControllers.getAllSa);
app.get('/superadmins/getById/:id', superadminControllers.getSaById);
app.put('/superadmins/add', superadminControllers.putNewSa);
app.delete('/superadmins/delete/:id', superadminControllers.delSa);
app.get('/superadmins/getActive', superadminControllers.getActiveSa);
app.put('/superadmins/edit/:id', superadminControllers.editSa);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
