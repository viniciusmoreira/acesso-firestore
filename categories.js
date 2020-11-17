const db = require('./firestore');

const findAll = async () => {
  const categoriesDB = await db.collection('categories').orderBy('category').get();

  const categories = [];

  categoriesDB.forEach(category => {
    categories.push({
      ...category.data(),
      id: category.id
    })
  });

  return categories
}

const findAllPaginated = async ({ pageSize = 10, startAfter = null } = {}) => {
  // Realizando a consulta inicial
  const categoriesDB = await db.collection('categories')
    .orderBy('category')
    .limit(pageSize+1)
    .startAfter(startAfter)
    .get()
    
  const categories = [];
  let total = 0;

  categoriesDB.forEach(category => {
    if(total < pageSize){
      categories.push({
        ...category.data(),
        id: category.id
      })
    }
    total++;
  });

  return {
    data: categories,
    hasNext: total > pageSize
  }
}

const remove = async (id) => {
  const category = db.collection('categories').doc(id)
  await category.delete();
}

const create = async (data) => {
  const docCategory = db.collection('categories').doc()
  await docCategory.set(data);
  const category = await docCategory.get();
  
  return category.id;
}

const update = async (id, data) => {
  const docCategory = db.collection('categories').doc(id);
  await docCategory.update(data);
  const category = await docCategory.get();
  
  return category;
}

module.exports = {
  findAll,
  remove,
  create,
  update,
  findAllPaginated
}