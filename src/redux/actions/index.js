export const GET_EMAIL = 'GET_EMAIL';
export const GET_CURRENCY = 'GET_CURRENCY';
export const REQUIRE_API = 'REQUEST_API';
export const FAILED_REQUEST = 'FAILED_REQUEST';

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
