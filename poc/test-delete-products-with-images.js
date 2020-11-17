const admin = require("firebase-admin");
require('dotenv').config()

const serviceAccount = require("../firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

const productId = 'W7aE6DAWutfGWJXDZisH';
const productRef = db.collection('products').doc(productId);

productRef.collection('images')
  .get()
  .then(snapshot => {
    const imgPromises = [];

    snapshot.forEach(img => {
      imgPromises.push(img.ref.delete());
    })

    return imgPromises;
  })
  .then(() => {
    productRef.delete();
  })
  .then(() => {
    console.log('Product with images deleted with success!');
  })
