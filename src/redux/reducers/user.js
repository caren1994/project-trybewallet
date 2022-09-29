import { GET_EMAIL } from '../actions';

const initialState = {
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case GET_EMAIL:
    return {
      ...state,
      email: action.payload, // olhar sempre o nome da chave quee coloquei em action
    };
  default:
    return state;
  }
}
export default user;
