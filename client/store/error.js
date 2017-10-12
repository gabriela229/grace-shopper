const SET_ERROR = 'SET_ERROR';

export function setError(msg){

  return {type: SET_ERROR, msg};
}


export default function reducer(state = '', action){
  switch (action.type){
    case SET_ERROR:
      return action.msg;
    default:
      return state;
  }
}
