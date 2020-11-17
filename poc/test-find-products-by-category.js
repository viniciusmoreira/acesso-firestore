const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-35de4.firebaseio.com"
});

const db = admin.firestore();

const cat1 = 'pmZ0jFSqjYev4AG9Ccih';
const catRef = db.collection('categories').doc(cat1);

const products = db
  .collection('products')
  //Aqui definimos o filtro baseado na categoria acima
  .where('categories_with_reference', 'array-contains', catRef)
  .get();
products.then(snapshot => {
  console.log('isEmpty', snapshot.empty);
  console.log('Size', snapshot.size);

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