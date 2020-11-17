const admin = require("firebase-admin");

const serviceAccount = require("../firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-35de4.firebaseio.com"
});

const db = admin.firestore();

const productId = '3mKjsUDHRQDugvSeuoUs';
const productRef = db.collection('products').doc(productId);
const imageRef = productRef.collection('images');

const doc = imageRef.doc();

doc
  .set({
    description: 'Description of product',
    url: 'my-image-url'
  })
  .then(snap => {
    console.log('Product image created with success!', snap);
  })