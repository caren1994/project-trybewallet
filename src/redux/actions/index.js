export const GET_EMAIL = 'GET_EMAIL';
export const GET_CURRENCY = 'GET_CURRENCY';
export const REQUIRE_API = 'REQUEST_API';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const GET_WALLET_FORM = 'GET_WALLET_FORM';
export const GET_TOTAL = 'GET_TOTAL';

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
export const getTotal = (total) => ({
  type: GET_TOTAL,
  total,
});
export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  error,
});

export const getWalletForm = (expenses) => ({
  type: GET_WALLET_FORM,
  payload: expenses,
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
      const total = data[param.currency].ask * param.value;
      console.log(total);
      dispatch(getWalletForm({ ...param, exchangeRates: data }));
      dispatch(getTotal(total));
    } catch (error) {
      dispatch(failedRequest(error.message));
    }
  };
}
