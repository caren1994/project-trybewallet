import { GET_CURRENCY, GET_WALLET_FORM, GET_EXCLUI,
  ALTERA_STATE_EDITOR, NEW_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
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
      expenses: [...state.expenses, action.payload], // aqui eu só envio 1 objeto e quero apenas adc por isso envio o state.expenses para mostrar os que ja tinha antes tbm
    };
  }
  case GET_EXCLUI: {
    return {
      ...state,
      expenses: action.expenses, // nao preciso por o [] pois já enviei em formato de array com objetos
    };
  }
  case ALTERA_STATE_EDITOR: {
    return {
      ...state,
      editor: true,
      idToEdit: action.payload, // altera o editor para mudar o botao que aparece
    };
  }
  case NEW_EXPENSE: {
    return {
      ...state,
      expenses: [...action.payload], // coloco pois só enviei em formato de obj
      editor: false,
    };
  }
  default:
    return state;
  }
}
export default wallet;
