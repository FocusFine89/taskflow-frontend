import { GET_HABITS } from "../actions/habitsAction";

const initialState = {
  content: [],
};

const habitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HABITS:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default habitsReducer;
