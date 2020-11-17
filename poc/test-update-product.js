const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-35de4.firebaseio.com"
});

const db = admin.firestore();

const cat1 = 'blSU29H3r1y7wEDc0eGb';
const catRef = db.collection('categories').doc(cat1);

const doc = db.collection('products').doc('69FgiB20szh6CZL2Bjzo');

doc
  // O update atualiza apenas o campo informado, já a função set, realiza a 
  // substituição de todo o objeto anterior pelo novo.
  .update({
    price: 4500
  })
  .then(snap => {
    console.log('Product updated with success!', snap);
  })