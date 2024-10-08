import { combineReducers, configureStore } from "@reduxjs/toolkit";
import addUser from "../reducers/loginReducer";
import getTasksReducer from "../reducers/tasksReducer";
import habitsReducer from "../reducers/habitsReducer";
import { projectReducer } from "../reducers/projectsReducer";
import errorReducer from "../reducers/errorReducer";

const rootReducer = combineReducers({
  user: addUser,
  tasks: getTasksReducer,
  habits: habitsReducer,
  projects: projectReducer,
  error: errorReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
