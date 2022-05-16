import express from 'express';
import adminsControllers from '../controllers/admins';
import adminsValidation from '../validations/admins';

const router = express.Router();

router
  .post('/', adminsValidation.validateCreation, adminsControllers.addAdmin)
  .get('/', adminsControllers.getAllAdmins)
  .get('/:id', adminsControllers.getAdminById);

export default router;
