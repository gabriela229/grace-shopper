import axios from 'axios';
const WRITE_FIRST_NAME = 'WRITE_FIRST_NAME';
const WRITE_LAST_NAME = 'WRITE_LAST_NAME';
const WRITE_ADDRESS = 'WRITE_ADDRESS';
const WRITE_CITY = 'WRITE_CITY';
const WRITE_STATE = 'WRITE_STATE';
const WRITE_EMAIL = 'WRITE_EMAIL';
const WRITE_POSTAL_CDOE = 'WRITE_POSTAL_CDOE';
const SUBMIT = "SUBMIT";
const CARD_SELECT = "CARD_SELECT";
const WRITE_CARD_NUMBERS = 'WRITE_CARD_NUMBERS';
const WRITE_CVV = "WRITE_CVV";
const EXPIRATION_DAY_SELECT = "EXPIRATION_DAY_SELECT";
const EXPIRATION_YEAR_SELECT = "EXPIRATION_YEAR_SELECT";

export const getFirstName = firstName => {
    return { type: WRITE_FIRST_NAME, firstName }
}

export const getLastName = lastName => {
    return { type: WRITE_LAST_NAME, lastName }
}

export const getAddress = address => {
    return { type: WRITE_ADDRESS, address }
}

export const getCity = city => {
    return { type: WRITE_CITY, city }
}

export const getState = state => {
    return { type: WRITE_STATE, state }
}

export const getEmail = email => {
    return { type: WRITE_EMAIL, email }
}

export const getPostalCode = postalCode => {
    return { type: WRITE_POSTAL_CDOE, postalCode }
}

export const cardSelect = (cardName) => {
    return { type: CARD_SELECT, cardName }
}

export const writeCardNumbers = (cardNumbers) => {
    return { type: WRITE_CARD_NUMBERS, cardNumbers };
}

export const writeCardCvv = (cardCvv) => {
    return { type: WRITE_CVV, cardCvv };
}

export const cardExpirationDateSelect = (date) => {
    return { type: EXPIRATION_DAY_SELECT, date };
}

export const cardExpirationYearSelect = (year) => {
    return { type: EXPIRATION_YEAR_SELECT, year };
}

export const submit = () => {
    return { type: SUBMIT };
}

// a thunk when submit
export function submitThunk(customerInfo, lineItems, authUser) {
    return function thunk(dispatch) {
        // add this customer and lineItmes to the db
        return axios.post('/api/orders', { customerInfo, lineItems, authUser })
            .then(res => res.data)
            .then(result => {
                console.log("Result", result);      // console.log  // created
                dispatch(submit());                 // emptify the controlled form
            })
            .catch(err => console.log(err));
    };
}

const initialState = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    email: '',
    postalCode: '',
    cardName: 'Visa',
    cardNumbers: '',
    cardCvv: '',
    year: '',
    date: ''
}


// const fakeState = {
//     sd: {
//         firstName: '',
//         lastName: '',
//         address: '',
//         city: '',
//         state: '',
//         email: '',
//         postalCode: '',
//     },
//     payments: {
//         cardName: '',
//         cardNumbers: '',
//         cardCvv: '',
//         year: '',
//         date: ''
//     }
// }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case WRITE_FIRST_NAME:
            return Object.assign({}, state, { firstName : action.firstName })
        case WRITE_LAST_NAME:
            return Object.assign({}, state, { lastName: action.lastName })
        case WRITE_ADDRESS:
            return Object.assign({}, state, { address: action.address })
        case WRITE_CITY:
            return Object.assign({}, state, { city: action.city })
        case WRITE_STATE:
            return Object.assign({}, state, { state: action.state })
        case WRITE_EMAIL:
            return Object.assign({}, state, { email: action.email })
        case WRITE_POSTAL_CDOE:
            return Object.assign({}, state, { postalCode: action.postalCode })

        // payments
        case CARD_SELECT:
            return Object.assign({}, state, { cardName: action.cardName });
        case WRITE_CARD_NUMBERS:
            return Object.assign({}, state, { cardNumbers: action.cardNumbers });
        case WRITE_CVV:
            return Object.assign({}, state, { cardCvv: action.cardCvv });
        case EXPIRATION_DAY_SELECT:
            return Object.assign({}, state, { date: action.date });
        case EXPIRATION_YEAR_SELECT:
            return Object.assign({}, state, { year: action.year });
         case SUBMIT:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}
