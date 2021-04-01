import tokenService from './tokenService';

const BASE_URL = '/api/ingredients/';

function create(ingredient) {
  return fetch(BASE_URL + '', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
      }),
    body: JSON.stringify(ingredient)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Unable to Create Ingredient!');
  })
}

function update(ingredient, ingredientId) {
  return fetch(BASE_URL + `${ingredientId}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    body: JSON.stringify(ingredient)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Unable to Update!');
  })
}

function getIngredients(){
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

function getIngredient(ingredientId){
  return fetch(BASE_URL + `${ingredientId}`, {
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

function deleteIngredient(ingredientId){
  return fetch(BASE_URL + `${ingredientId}`, {
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

const ingredientService = {
 create, 
 getIngredients,
 getIngredient,
 update,
 delete: deleteIngredient,
};

export default ingredientService;