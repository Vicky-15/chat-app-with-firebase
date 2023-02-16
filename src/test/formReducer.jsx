export const FORM_INITIAL_STATE = {
  title: "",
  desc: "",
  price: 0,
  category: "",
  tags: [],
  quantity: 0,
  images: {
    sm: "",
    md: "",
    lg: "",
  },
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_TAG":
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };
    case "REMOVE_TAG":
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        quantity: state.quantity + 1,
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        quantity: state.quantity - 1,
      };

    default:
      return state;
  }
};
