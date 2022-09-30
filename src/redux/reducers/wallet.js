import { GET_CURRENCY } from '../actions';

const initialState = {
  currencies: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
}
export default wallet;
