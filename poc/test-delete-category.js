const admin = require("firebase-admin");
require('dotenv').config()

const serviceAccount = require("../firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

const categoryId = 'zRm8tpW3RFOv7psxYakC';
const categoryRef = db.collection('categories').doc(categoryId);

categoryRef.delete()
  .then(snapshot => {
    console.log('Category deleted with success.', snapshot)
  });