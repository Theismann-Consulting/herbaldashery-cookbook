import tokenService from './tokenService';

const BASE_URL = '/api/categories/';

function create(category) {
  return fetch(BASE_URL + '', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    body: JSON.stringify(category)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Unable to Create Category!');
  })
}

function update(category, categoryId) {
  return fetch(BASE_URL + `${categoryId}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    body: JSON.stringify(category)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Unable to Update!');
  })
}

function getCategories(){
  return fetch(BASE_URL + '', {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Not Authorized');
  });
}

function getCategory(categoryId){
  return fetch(BASE_URL + `${categoryId}`, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Not Authorized');
  });
}

function deleteCategory(categoryId){
  return fetch(BASE_URL + `${categoryId}`, {
    method: 'delete',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Not Authorized');
  });
}

const categoryService = {
  create, 
  getCategories,
  getCategory,
  update,
  delete: deleteCategory,
};

export default categoryService;