/* eslint-disable no-console */
import app from './app'
import mongoose from 'mongoose';
import 'dotenv/config';

const port = process.env.PORT || 3000;
// eslint-disable-next-line max-len
const MONGO_URL = process.env.URL_MONGO;

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      console.log('Fail connection to database', error);
    } else {
      console.log('Connected to database');
      app.listen(port, () => {
        console.log(`Server ready on port ${port}`);
      });
    }
  },
);