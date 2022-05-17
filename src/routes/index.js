import express from 'express';
import timeSheetRoutes from './time-sheets';

const router = express.Router();

router
  .use('/timeSheets', timeSheetRoutes);

export default router;
