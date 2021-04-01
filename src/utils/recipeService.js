import tokenService from './tokenService';

const BASE_URL = '/api/recipes/';

function create(recipe) {
  return fetch(BASE_URL + '', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    body: JSON.stringify(recipe)
  })
  .then(res => {
    console.log(res);
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Unable to Create Recipe!');
  })
}

function update(recipe, recipeId) {
  return fetch(BASE_URL + `${recipeId}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    body: JSON.stringify(recipe)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Unable to Update!');
  })
}

function getRecipes(){
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

function getRecipe(recipeId){
  return fetch(BASE_URL + `${recipeId}`, {
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

function deleteRecipe(recipeId){
  return fetch(BASE_URL + `${recipeId}`, {
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

const recipeService = {
  create, 
  getRecipes,
  getRecipe,
  update,
  delete: deleteRecipe,
};

export default recipeService;