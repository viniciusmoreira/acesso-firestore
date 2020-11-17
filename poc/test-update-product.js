const admin = require("firebase-admin");
require('dotenv').config()

const serviceAccount = require("../firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

const cat1 = '0URz0xmY9Ip5rcsciURq';
const catRef = db.collection('categories').doc(cat1);

const doc = db.collection('products').doc('N9zss70KYQn4tfyTMcW6');

doc
  // O update atualiza apenas o campo informado, já a função set, realiza a 
  // substituição de todo o objeto anterior pelo novo.
  .update({
    price: 4500
  })
  .then(snap => {
    console.log('Product updated with success!', snap);
  })