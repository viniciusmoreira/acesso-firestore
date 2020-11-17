const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-35de4.firebaseio.com"
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
