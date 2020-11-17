const categories = require('./categories');

const test = async () => {
  const newCategoryId = await categories.create({
    category: 'Categoria 021'
  })

  const listCreate = await categories.findAll();
  // console.log('Depois do CREATE\n', listCreate);
  //--
  const updatedCategory = await categories.update(newCategoryId, {
    category: 'Categoria atualizada'
  });

  const listUpdate = await categories.findAll();
  // console.log('Depois do UPDATE\n', listUpdate);
  //--
  await categories.remove(newCategoryId)

  const listRemove = await categories.findAll();
  // console.log('Depois do REMOVE\n', listRemove);
}

// testes();

const testPagination = async () => {
  let listPagination = await categories.findAllPaginated({
    pageSize: 15
  });

  // console.log('Listando primeira pagination', listPagination);

  const lastCategory = listPagination.data[listPagination.data.length-1].category;

  listPagination = await categories.findAllPaginated({
    pageSize: 15,
    startAfter:lastCategory    
  });

  // console.log('Listando segunda pagination', listPagination);
}

// testPagination();

