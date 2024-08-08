import { DELETE_ERROR, GET_ERROR } from "../actions/errorAction";

const initialState = {
  content: "",
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERROR:
      return {
        ...state,
        content: action.payload,
      };
    case DELETE_ERROR:
      return {
        content: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
