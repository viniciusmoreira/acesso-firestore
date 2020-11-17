const admin = require("firebase-admin");
require('dotenv').config()

const serviceAccount = require("../firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

// const doc = db.collection('categories').doc();

for(i = 1; i <= 20; i++){
  db.collection('categories').doc()
    .set({
      category: 'Categoria ' + i.toString().padStart(3, "0")
    })
    .then(snap => {
      console.log('Categoria criada com sucesso!', snap);
    })

}