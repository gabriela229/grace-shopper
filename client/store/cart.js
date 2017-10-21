import axios from 'axios';

const GET_CART = 'GET_CART';
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

export function getCart(cart) {
    return { type: GET_CART, cart };
}

export function addProductToCart(product, quantity, increase) {
    return { type: ADD_ITEM, product, quantity, increase };
}

export function removeProductFromCart(productId) {
    return { type: DELETE_ITEM, productId };
}

export function loadCart(cart) {
    return function thunk(dispatch, getState) {
        const state = getState();
        if (!cart && !state.cart.id && state.cart.lineItems.length > 0 ){
            return dispatch(getCart(state.cart));
        }
            return axios.get('/api/orders/getCart')
            .then(res => res.data)
            .then(newCart => {
                if (cart && cart.lineItems.length > 0) {
                    cart.lineItems.map( item => {
                       dispatch(updateLineItem(newCart.id, item.product.id, item.quantity));
                    });
                }
                else {
                    dispatch(getCart(newCart));
            }
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
                    dispatch(addProductToCart(product, quantity, increase));
                })
                .catch(err => console.log(err));
        }

        return axios.post(`/api/orders/${orderId}/lineItems`, { productId, quantity, increase  })
            .then(dispatch(loadCart()))
            .catch(err => console.log(err));
    };
}


export function removeLineItem(orderId, productId) {
    return function thunk(dispatch) {
        if (!orderId) {
            dispatch(removeProductFromCart(productId));
        }

        return axios.post(`/api/orders/${orderId}/lineItems`, { productId, quantity: 0, increase: false })
            .then(dispatch(loadCart()))
            .catch(err => console.log(err));
    };
}

export default function reducer(state = { lineItems: [] }, action) {
    let newLineItems = [...state.lineItems];
    let lineItemIdx = 0;

    switch (action.type) {
        case GET_CART:
            return action.cart;
        case ADD_ITEM:
            lineItemIdx = newLineItems.findIndex(lineItem => lineItem.product.id === action.product.id);
            if (lineItemIdx !== -1) {
                if (action.increase) {
                    newLineItems[lineItemIdx].quantity += action.quantity;
                }
                else {
                    newLineItems[lineItemIdx].quantity = action.quantity;
                }
            }
            else {
                 newLineItems = [...state.lineItems, {quantity: action.quantity, product: action.product}];
            }

            return Object.assign({}, state, { lineItems: newLineItems })
        case DELETE_ITEM:
            lineItemIdx = newLineItems.findIndex(lineItem => lineItem.product.id === action.productId);
            newLineItems.splice(lineItemIdx, 1);

            return Object.assign({}, state, { lineItems: newLineItems });
        default:
            return state;
    }
}
