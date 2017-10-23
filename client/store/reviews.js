import axios from 'axios';

// ACTION TYPE(s)
const GET_REVIEWS = 'GET_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';
// const UPDATE_REVIEW = 'UPDATE_REVIEW';
// const DELETE_REVIEW = 'DELETE_REVIEW';

// ACTION CREATOR(s)
export function loadReviews(reviews) {
  return {type: GET_REVIEWS, reviews};
}

export function addReview(review) {
  return {type: ADD_REVIEW, review};
}

// export function editReview(review) {
//   return {type: UPDATE_REVIEW, review};
// }

// export function removeReview(id) {
//   return {type: DELETE_REVIEW, id};
// }

// THUNK CREATOR(s)
export function getReviews() {
  return function thunk(dispatch) {
    return axios.get('/api/reviews')
      .then(res => res.data)
      .then(reviews => {
        dispatch(loadReviews(reviews));
      })
      .catch(err => console.log(err));
  };
}

// export function getReviewsByProductId(productId) {
//   return function thunk(dispatch) {
//     return axios.get(`/api/reviews/${productId}`)
//       .then(res => res.data)
//       .then(reviews => {
//         dispatch(loadReviews(reviews));
//       })
//       .catch(err => console.log(err));
//   };
// }

export function postReview(review) {
  // console.log("postReview: review = ", review);
  return function thunk(dispatch) {
    return axios.post('/api/reviews', review)
      .then(res => res.data)
      .then(newReview => {
        dispatch(addReview(newReview));
      })
      .catch(err => console.log(err));
  };
}

// export function updateReview(id) {
//   return function thunk(dispatch) {
//     return axios.put(`/api/reviews/${id}`)
//       .then(res => res.data)
//       .then(review => {
//         dispatch(editReview(review));
//       })
//       .catch(err => console.log(err));
//   };
// }

// export function deleteReview(id){
//   return function thunk(dispatch){
//     return axios.delete(`/api/reviews/${id}`)
//       .then(res => res.data)
//       .then(() => {
//         dispatch(removeReview(id));
//       })
//       .catch(err => console.log(err));
//   };
// }

// REDUCER(s)
export default function reducer(state = [], action) {
  switch (action.type) {

    case GET_REVIEWS:
      return action.reviews;

    case ADD_REVIEW:
      return [...state, action.review];

    // case UPDATE_REVIEW:
    //   return state.map(review => {
    //     return review.id === action.review.id ? action.review : review;
    //   });

    // case DELETE_REVIEW:
    //   return state.filter(review => {
    //     return review.id !== action.id;
    //   });

    default:
      return state;
  }
}

