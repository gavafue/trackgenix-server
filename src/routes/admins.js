import express from 'express';
import adminsControllers from '../controllers/admins';
import adminsValidation from '../validations/admins';

const router = express.Router();

router
  .post('/', adminsValidation.validateCreation, adminsControllers.addAdmin)
  .get('/', adminsControllers.getAllAdmins)
  .get('/:id', adminsValidation.validateID, adminsControllers.getAdminById)
  .delete('/:id', adminsValidation.validateID, adminsControllers.deleteAdmin)
  .delete('/lowlogic/:id', adminsValidation.validateID, adminsValidation.validateUpdate, adminsControllers.updateAdmin)
  .put('/:id', adminsValidation.validateID, adminsValidation.validateUpdate, adminsControllers.updateAdmin);

export default router;
