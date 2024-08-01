import { GET_PROJECTS } from "../actions/projectsAction";

const initialState = {
  content: [],
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};
