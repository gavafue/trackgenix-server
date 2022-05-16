import express from 'express';
import timeSheetsController from '../controllers/time-sheets';
import timeSheetsValidation from '../validations/time-sheets';

const router = express.Router();

router
  .get('/:id', timeSheetsValidation.idValidation, timeSheetsController.getTimeSheetById)
  .delete('/:id', timeSheetsValidation.idValidation, timeSheetsController.deleteTimeSheet);

export default router;
