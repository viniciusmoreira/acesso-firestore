const admin = require("firebase-admin");
require('dotenv').config()

const serviceAccount = require("../firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

const products = db.collection('products').get();
products.then(snapshot => {
  console.log('isEmpty', snapshot.empty);

  snapshot.forEach(product => {
    console.log(product.id, ' => ', product.data());

    const images = db.collection('products')
      .doc(product.id)
      .collection('images')
      .get()
      .then(imgSnapshot => {
        imgSnapshot.forEach(img => {
          console.log('img ==> ', img.id, ' => ', img.data());
        })
      })
  })
})