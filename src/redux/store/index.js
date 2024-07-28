import { combineReducers, configureStore } from "@reduxjs/toolkit";
import addUser from "../reducers/loginReducer";
import getTasksReducer from "../reducers/tasksReducer";

const rootReducer = combineReducers({
  user: addUser,
  tasks: getTasksReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
