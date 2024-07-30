import { combineReducers, configureStore } from "@reduxjs/toolkit";
import addUser from "../reducers/loginReducer";
import getTasksReducer from "../reducers/tasksReducer";
import habitsReducer from "../reducers/habitsReducer";

const rootReducer = combineReducers({
  user: addUser,
  tasks: getTasksReducer,
  habits: habitsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
