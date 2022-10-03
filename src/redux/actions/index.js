export const GET_EMAIL = 'GET_EMAIL';
export const GET_CURRENCY = 'GET_CURRENCY';
export const REQUIRE_API = 'REQUEST_API';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const GET_WALLET_FORM = 'GET_WALLET_FORM';
export const GET_EXCLUI = 'GET_EXCLUI';
export const ALTERA_STATE_EDITOR = 'ALTERA_STATE_EDITOR';
export const NEW_EXPENSE = 'NEW_EXPENSE';

export const getEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});

export const requireApi = () => ({
  type: REQUIRE_API,
});
export const getCurrency = (currencies) => ({
  type: GET_CURRENCY,
  currencies,
});

export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  error,
});

export const getWalletForm = (expenses) => ({
  type: GET_WALLET_FORM,
  payload: expenses,
});

export const getExclui = (expenses) => ({
  type: GET_EXCLUI,
  expenses,
});
export const alteraStateEditor = (payload) => ({
  type: ALTERA_STATE_EDITOR,
  payload,
});

export const newExpense = (payload) => ({
  type: NEW_EXPENSE,
  payload,
});

export function fetchApi() {
  return async (dispatch) => {
    dispatch(requireApi());
    try {
      await fetch('https://economia.awesomeapi.com.br/json/all')
        .then((response) => response.json())
        .then((json) => dispatch(
          getCurrency(Object.keys(json).filter((element) => element !== 'USDT')),
        ));
    } catch (error) {
      dispatch(failedRequest(error.message));
    }
  };
}
export function fetchApiCotacao(param) {
  return async (dispatch) => {
    dispatch(requireApi());
    try {
      const url = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(url);
      const data = await response.json();
      dispatch(getWalletForm({ ...param, exchangeRates: data }));
    } catch (error) {
      dispatch(failedRequest(error.message));
    }
  };
}
