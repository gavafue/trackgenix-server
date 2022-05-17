import express from 'express';
// eslint-disable-next-line import/no-named-as-default
import timeSheetRoutes from './time-sheets';

const router = express.Router();

router
  .use('/timeSheets', timeSheetRoutes);

export default router;
