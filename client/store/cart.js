import axios from 'axios';

const GET_CART = 'GET_CART';
const ADD_ITEM = 'ADD_ITEM';

export function getCart(cart) {
    return { type: GET_CART, cart };
}

export function addProductToCart(product) {
    return { type: ADD_ITEM, product };
}

export function loadCart() {
    return function thunk(dispatch) {
        return axios.get('/api/orders/getCart')
            .then(res => res.data)
            .then(cart => {
                dispatch(getCart(cart));
            })
            .catch(err => console.log(err));
    };
}

export function addToCart(productId, orderId) {
    return function thunk(dispatch) {
        if (!orderId) {
            return dispatch(addProductToCart({ productId, quantity: 1 }))
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
            const newLineItems = state.lineItems;
            let lineItemIdx = newLineItems.findIndex(lineItem => lineItem.productId === action.product.productId)
            if (lineItemIdx !== -1) {
                newLineItems[lineItemIdx].quantity += action.product.quantity;
            }
            else {
                newLineItems.push(action.product)
            }

            return Object.assign({}, state, { lineItems: newLineItems })
        default:
            return state;
    }
}
