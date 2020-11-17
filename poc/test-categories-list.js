const admin = require("firebase-admin");
require('dotenv').config()

const serviceAccount = require("../firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

const categories = db.collection('categories').get();
categories.then(snapshot => {
  console.log('isEmpty', snapshot.empty);

  snapshot.forEach(doc => {
    console.log(doc.id, ' => ', doc.data());
  })
})