const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-35de4.firebaseio.com"
});

const db = admin.firestore();

const categoryId = 'zRm8tpW3RFOv7psxYakC';
const categoryRef = db.collection('categories').doc(categoryId);

categoryRef.delete()
  .then(snapshot => {
    console.log('Category deleted with success.', snapshot)
  });