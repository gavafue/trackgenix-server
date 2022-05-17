import express from 'express';
import mongoose from 'mongoose';
<<<<<<< HEAD
import router from './routes';
=======
import routes from './routes';
>>>>>>> origin/master

const app = express();
const port = process.env.PORT || 3000;
// eslint-disable-next-line max-len
const MONGO_URL = 'mongodb+srv://radiumRocket:8dll6U2hMKSETFAK@trackgenix.0a7hs.mongodb.net/Trackgenix?retryWrites=true&w=majority';

app.use(express.json());
<<<<<<< HEAD
app.use(router);
=======

app.use(routes);
>>>>>>> origin/master

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
