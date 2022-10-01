import { GET_CURRENCY, GET_WALLET_FORM } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case GET_CURRENCY: {
    return {
      ...state,
      currencies: action.currencies,
    };
  }
  case GET_WALLET_FORM: {
    console.log(GET_WALLET_FORM, 'estado', state, 'form', action.payload);
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  }
  default:
    return state;
  }
}
export default wallet;
