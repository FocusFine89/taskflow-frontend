import { combineReducers, configureStore } from "@reduxjs/toolkit";
import addUser from "../reducers/loginReducer";

const rootReducer = combineReducers({
  user: addUser,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
