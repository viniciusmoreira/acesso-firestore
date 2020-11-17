const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-35de4.firebaseio.com"
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