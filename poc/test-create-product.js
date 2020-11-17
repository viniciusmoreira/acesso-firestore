const admin = require("firebase-admin");
require('dotenv').config()

const serviceAccount = require("../firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

const cat1 = 'blSU29H3r1y7wEDc0eGb';
const catRef = db.collection('categories').doc(cat1);

const doc = db.collection('products').doc();

doc
  .set({
    name: 'Product name',
    price: 2000,
    categories_with_reference: [catRef],
    categories_with_id_only: [cat1]
  })
  .then(snap => {
    console.log('Product created with success!', snap);
  })