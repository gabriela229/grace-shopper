import axios from 'axios';

const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_CATEGORY = 'GET_CATEGORY';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';

export function loadCategories(categories){
  return {type: GET_CATEGORIES, categories};
}
export function addCategory(category){
  return {type: GET_CATEGORY, category};
}
export function editCategory(category){
  return {type: UPDATE_CATEGORY, category};
}
export function removeCategory(id){
  return {type: DELETE_CATEGORY, id};
}

export function getCategories(){
  return function thunk(dispatch){
    //make sure to update this get request url so that it matches route
    return axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        dispatch(loadCategories(categories))
      })
      //update error handling to do something with this error
      .catch(err => console.log(err));
  };
}

export function postCategory(category){
  return function thunk(dispatch){
    //make sure to update this get request url so that it matches route
    return axios.post('/api/categories', category)
      .then(res => res.data)
      .then(newCategory => {
        dispatch(addCategory(newCategory));
      })
      //update error handling to do something with this error
      .catch(err => console.log(err));
  };
}

export function updateCategory(id){
  return function thunk(dispatch){
    //make sure to update this get request url so that it matches route
    return axios.put(`/api/categories/${id}`)
      .then(res => res.data)
      .then(category => {
        dispatch(editCategory(category));
      })
      //update error handling to do something with this error
      .catch(err => console.log(err));
  };
}

export function deleteCategory(id){
  return function thunk(dispatch){
    //make sure to update this get request url so that it matches route
    return axios.delete(`/api/categories/${id}`)
      .then(res => res.data)
      .then(() => {
        dispatch(removeCategory(id));
      })
      //update error handling to do something with this error
      .catch(err => console.log(err));
  };
}

export default function reducer(state = [], action){
  switch (action.type){
    case GET_CATEGORIES:
      return action.categories;
    case GET_CATEGORY:
      return [...state, action.category];
    case UPDATE_CATEGORY:
      return state.map(category => {
        return category.id === action.category.id ? action.category : category;
      });
    case DELETE_CATEGORY:
      return state.filter(category => {
        return category.id !== action.id;
      });
    default:
      return state;
  }
}
