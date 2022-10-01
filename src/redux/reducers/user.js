import { GET_EMAIL, GET_TOTAL } from '../actions';

const initialState = {
  email: '',
  total: 0,
};

function user(state = initialState, action) {
  switch (action.type) {
  case GET_EMAIL:
    return {
      ...state,
      email: action.payload, // olhar sempre o nome da chave quee coloquei em action
    };
  case GET_TOTAL: {
    console.log(state);
    const soma = (Number(state.total) + Number(action.total)).toFixed(2);
    return {
      ...state,
      total: soma,
    };
  }

  default:
    return state;
  }
}
export default user;
