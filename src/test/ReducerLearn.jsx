// setting initial state values and passing it to useReducer()
export const INITIAL_STATE = {
  error: false,
  loading: false,
  post: {},
};
// setting actual reducer() and passing it to useReducer(),
// whatever it returns, updated into initial state
// state arg will be passed by useReducer(), action obj will be passed by dispatcher({action, payload,etc....}) by us,
export const postReducer = (state, action) => {
  // we could done this with if else(action.type==="FETCH_START"), but using switch is better
  switch (action.type) {
    case "FETCH_START":
      return {
        error: false,
        loading: true,
        post: {},
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case "FETCH_ERROR":
      return {
        error: true,
        loading: false,
        post: {},
      };
    default:
      return state;
  }
};
