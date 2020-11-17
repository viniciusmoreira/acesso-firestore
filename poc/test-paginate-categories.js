const admin = require("firebase-admin");

const serviceAccount = require("./firestore.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://acesso-bd-35de4.firebaseio.com"
});

const db = admin.firestore();
let lastCategory  = null;

// Realizando a consulta inicial
db.collection('categories')
  .orderBy('category')
  .limit(10)
  .get()
  .then(snapshot => {
    snapshot.forEach(category => {
      console.log(category.data().category);
      lastCategory = category.data().category;
    })
  })
  // Apenas para fins didaticos criei outra consulta pra pegar os demais 
  // registros, mas poderia ser tudo acionando a mesma e informando os parâmetros
  // especificos.
  .then(() => {
    db.collection('categories')
    // Importante ordenar antes de executar as duas próximas funções
      .orderBy('category')
      .startAfter(lastCategory)
      .limit(10)
      .get()
      .then(snapshot => {
        console.log('Nova leva!!!')
        snapshot.forEach(category => {
          console.log(category.data().category);
          lastCategory = category.id;
        })
      })    
  })

