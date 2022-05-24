import express from 'express';
import timeSheetsController from '../controllers/time-sheets';
import timeSheetsValidation from '../validations/time-sheets';

const router = express.Router();

router
  .post('/', timeSheetsValidation.validateAddTS, timeSheetsController.createTimeSheet)
  .get('/', timeSheetsController.getTimeSheets)
  .put('/:id', timeSheetsValidation.validateUpdate, timeSheetsController.updateTimesheet)
  .get('/:id', timeSheetsController.getTimeSheetById)
  .delete('/:id', timeSheetsController.deleteTimeSheet);

export default router;
