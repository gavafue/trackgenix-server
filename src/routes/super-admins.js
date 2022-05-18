import express from 'express';
import superAdminsControllers from '../controllers/super-admins';
import superAdminsValidations from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdminsControllers.getAllSa)
  .get('/:id', superAdminsValidations.validateId, superAdminsControllers.getSaById)
  .post('/', superAdminsValidations.validateCreation, superAdminsControllers.createSa)
  .delete('/:id', superAdminsValidations.validateId, superAdminsControllers.deleteSa)
  .put('/:id', superAdminsValidations.validateUpdate, superAdminsControllers.updateSa);

export default router;
