import axios from 'axios';

const GET_CART = 'GET_CART';
const ADD_ITEM = 'ADD_ITEM';

export function getCart(cart) {
    return { type: GET_CART, cart };
}

export function addProductToCart(product, quantity) {
    return { type: ADD_ITEM, product, quantity };
}

export function loadCart() {
    return function thunk(dispatch) {
        return axios.get('/api/orders/getCart')
            .then(res => res.data)
            .then(cart => {
                console.log(cart);
                dispatch(getCart(cart));
            })
            .catch(err => console.log(err));
    };
}

export function updateLineItem(orderId, productId, quantity, increase) {
    return function thunk(dispatch) {
        if (!orderId) {
            return axios.get(`/api/products/${productId}`)
                .then(res => res.data)
                .then(product => {
                    dispatch(addProductToCart(product, quantity));
                })
                .catch(err => console.log(err));
        }

        return axios.post(`/api/orders/${orderId}/lineItems`, { productId })
            .then(dispatch(loadCart()))
            .catch(err => console.log(err));
    };
}

export default function reducer(state = { lineItems: [] }, action) {
    switch (action.type) {
        case GET_CART:
            console.log('updating cart');
            return action.cart || state;
        case ADD_ITEM:
            console.log(action)
            const newLineItems = state.lineItems;
            let lineItemIdx = newLineItems.findIndex(lineItem => lineItem.product.id === action.product.id);
            if (lineItemIdx !== -1) {
                newLineItems[lineItemIdx].quantity += action.quantity;
            }
            else {
                newLineItems.push({quantity: action.quantity, product: action.product})
            }
            
            return Object.assign({}, state, { lineItems: newLineItems })
        default:
            return state;
    }
}
