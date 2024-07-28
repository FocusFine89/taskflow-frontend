import { GET_TASKS } from "../actions/getAllTasksAction";

const initialState = {
  content: [],
};

const getTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default getTasksReducer;
