import axios from 'axios';

const GET_CART = 'GET_CART';

export function loadCart(cart) {
    return { type: GET_CART, cart };
}

export function getCart() {
    return function thunk(dispatch) {
        return axios.get('/api/cart')
            .then(res => res.data)
            .then(cart => {
                dispatch(loadCart(cart));
            })
            .catch(err => console.log(err));
    };
}

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_CART:
            return action.cart;
        default:
            return state;
    }
}
