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
                console.log(cart);
                dispatch(getCart(cart));
            })
            .catch(err => console.log(err));
    };
}

export function addToCart(productId, orderId, orderQuantity) {
    return function thunk(dispatch) {
        if (!orderId) {
            return axios.get(`/api/products/${productId}`)
                .then(res => res.data)
                .then(product => {
                    // product has inventory quantity
                    // buying is for customer selecting quantity
                    const _product = Object.assign({}, product, {buying: orderQuantity});
                    dispatch(addProductToCart(_product));
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
            const newLineItems = state.lineItems;
            let lineItemIdx = newLineItems.findIndex(lineItem => lineItem.product.id === action.product.id);
            if (lineItemIdx !== -1) {
                newLineItems[lineItemIdx].quantity += action.product.buying;
            }
            else {
                newLineItems.push({quantity: action.product.buying, product: action.product});
            }

            return Object.assign({}, state, { lineItems: newLineItems })
        default:
            return state;
    }
}
