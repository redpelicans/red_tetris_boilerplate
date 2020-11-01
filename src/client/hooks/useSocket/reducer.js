export const initialState = {
  action: "",
  payload: null,
  error: "",
};

const RESPONSE_SUCCESS = "success";
const RESPONSE_ERROR = "error";

export default (state = initialState, response) => {
  switch (response.type) {
    case RESPONSE_SUCCESS:
      return {
        ...state,
        action: response.action,
        payload: response.payload,
        error: "",
      };
    case RESPONSE_ERROR:
      return {
        ...state,
        action: response.action,
        error: response.reason,
        payload: null,
      };
    default:
      return state;
  }
};
