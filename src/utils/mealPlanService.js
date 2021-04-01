import tokenService from './tokenService';

const BASE_URL = '/api/mealPlans/';

function create(mealPlan) {
  return fetch(BASE_URL + '', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    body: JSON.stringify(mealPlan)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Unable to Create Meal Plan!');
  })
}

function update(mealPlan, mealPlanId) {
  return fetch(BASE_URL + `${mealPlanId}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    body: JSON.stringify(mealPlan)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Unable to Update!');
  })
}

function getMealPlans(){
  return fetch(BASE_URL + '', {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Not Authorized');
  });
}

function getMealPlan(mealPlanId){
  return fetch(BASE_URL + `${mealPlanId}`, {
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

function deleteMealPlan(mealPlanId){
  return fetch(BASE_URL + `${mealPlanId}`, {
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

const mealPlanService = {
  create, 
  getMealPlans,
  getMealPlan,
  update,
  delete: deleteMealPlan,
};

export default mealPlanService;