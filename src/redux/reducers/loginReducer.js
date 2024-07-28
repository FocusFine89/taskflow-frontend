import { ADD_USER } from "../actions/loginAction";

const initialState = {
  token: "",
};

const addUser = (state = initialState, action) => {
  switch (action.payload) {
    case ADD_USER:
      return {
        token: action.payload,
      };
    default:
      return state;
  }
};

export default addUser;
