import axios from 'axios';

const GET_CART = 'GET_CART';
const ADD_ITEM = 'ADD_ITEM';

export function cartLoaded(cart) {
    return { type: GET_CART, cart };
}

export function itemAdded(id) {
    return { type: ADD_ITEM, id };
}

export function loadCart() {
    return function thunk(dispatch) {
        return axios.get('/api/orders/0')
            .then(res => res.data)
            .then(cart => {
                dispatch(cartLoaded(cart));
            })
            .catch(err => console.log(err));
    };
}

export function addToCart(id) {
    return function thunk(dispatch) {
        dispatch(itemAdded(id))
    };
}


export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_CART:
            return action.cart;
        case ADD_ITEM:
            return [...state, action.id];
        default:
            return state;
    }
}
