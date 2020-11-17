const db = require('./firestore');
const admin = require('firebase-admin');

const findAll = async () => {
  const productsDB = await db.collection('products').orderBy('name').get();

  const products = [];

  for(product of productsDB.docs){
    const imagesDoc = await product.ref.collection('images').get();
    const images = [];

    imagesDoc.forEach(img => {
      images.push( img.data() )
    })

    products.push({
      ...product.data(),
      images,
      id: product.id
    })
  };

  return products
}

const findAllPaginated = async ({ pageSize = 10, startAfter = null } = {}) => {
  // Realizando a consulta inicial
  const productsDB = await db.collection('products')
    .orderBy('name')
    .limit(pageSize+1)
    .startAfter(startAfter)
    .get()
    
  const products = [];
  let total = 0;

  for(product of productsDB.docs){
    if(total < pageSize){
      const imagesDoc = await product.ref.collection('images').get();
      const images = [];

      imagesDoc.forEach(img => {
        images.push( img.data() )
      })
      
      products.push({
        ...product.data(),
        images,
        id: product.id
      })
    }
    total++;
  };

  return {
    data: products,
    hasNext: total > pageSize
  }
}

const create = async ({categories, ...data}) => {
  const doc = db.collection('products').doc();

  const categoriesRef = categories.map(cat => db.collection('categories').doc(cat));

  await doc.set({
    ...data,
    categories_with_id_only: categories,
    categories_with_reference: categoriesRef
  });
}

const update = async(id, {categories, ...data}) => {
  const doc = db.collection('products').doc(id);

  const categoriesRef = categories.map(cat => db.collection('categories').doc(cat));

  await doc.update({
    ...data,
    categories_with_id_only: admin.firestore.FieldValue.arrayUnion(...categories),
    categories_with_reference: admin.firestore.FieldValue.arrayUnion(...categoriesRef),
  })
}

const remove = async (id) => {
  const productRef = db.collection('products').doc(id);
  
  const imgsRef = await productRef.collection('images').get();

  imgsRef.forEach( async (img) => {
    await img.delete()
  } )

  await productRef.delete();  
}

const addImage = async (id, data) => {
  const productRef = db.collection('products').doc(id);
  const imageRef = productRef.collection('images');

  const doc = imageRef.doc();

  await doc.set(data);
}

module.exports = {
  findAll,
  findAllPaginated,
  remove,
  create,
  addImage,
  update 
}