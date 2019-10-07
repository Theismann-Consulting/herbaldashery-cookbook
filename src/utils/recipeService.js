import tokenService from './tokenService';

const BASE_URL = '/api/recipes/';

function create(recipe) {
  return fetch(BASE_URL + 'create', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(recipe)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Error Creating Recipe');
  })
}

function getAllRecipes() {
  return fetch(BASE_URL + '', {
    method: 'get',
    headers: new Headers({'Content-Type': 'application/json'}),
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Error Creating Recipe');
  })
}

function getRecipe() {
  return fetch(BASE_URL + '', {
    method: 'get',
    headers: new Headers({'Content-Type': 'application/json'}),
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Error Retreiving Recipe');
  })
};

export default {
  create,
  getAllRecipes,
  getRecipe
};