/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;
// eslint-disable-next-line max-len
const MONGO_URL = process.env.URL_MONGO;

app.use(express.json());
app.use(routes);

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
