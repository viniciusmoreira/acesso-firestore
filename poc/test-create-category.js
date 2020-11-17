const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-35de4.firebaseio.com"
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