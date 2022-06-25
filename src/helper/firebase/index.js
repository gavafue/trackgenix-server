const admin = require('firebase-admin');

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: process.env.API_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL,
    projectId: process.env.PROJECT_ID,
  }),
});

module.exports = firebaseApp;
