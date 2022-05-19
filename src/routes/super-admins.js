import express from 'express';
import saControllers from '../controllers/super-admins';
import saValidations from '../validations/super-admins';

const router = express.Router();

router
  .get('/', saControllers.getAllSAdmins)
  .get('/:id', saValidations.validateId, saControllers.getSAdminsById)
  .post('/', saValidations.validateCreation, saControllers.createSAdmin)
  .delete('/:id', saValidations.validateId, saControllers.deleteSa)
  .put('/:id', saValidations.validateId, saValidations.validateUpdate, saControllers.updateSa);

export default router;
