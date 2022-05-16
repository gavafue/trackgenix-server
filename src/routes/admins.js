import express from 'express';
import adminsControllers from '../controllers/admins';
import adminsValidation from '../validations/admins';

const router = express.Router();

router
  .post('/', adminsValidation.validateCreation, adminsControllers.addAdmin)
  .get('/', adminsControllers.getAllAdmins)
  .get('/:id', adminsValidation.validateID, adminsControllers.getAdminById)
  .delete('/:id', adminsValidation.validateID, adminsControllers.deleteAdmin);

export default router;
