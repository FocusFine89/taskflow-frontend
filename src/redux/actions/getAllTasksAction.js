import { GET_ERROR } from "./errorAction";
import { getProjects } from "./projectsAction";
export const GET_TASKS = "GET_TASKS";
export const BASE_URL =
  "https://equivalent-tobey-focusfine89-ac280773.koyeb.app/";
export const getTasks = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      let response = await fetch(`${BASE_URL}tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let tasks = await response.json();
        dispatch({ type: GET_TASKS, payload: tasks });
      }
    } catch (err) {}
  };
};

export const deleteTasks = (id) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      let response = await fetch(`${BASE_URL}tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getTasks());
        dispatch(getProjects());
      } else {
        let error = await response.json();
        dispatch({ type: GET_ERROR, payload: error.message });
      }
    } catch (error) {}
  };
};

export const addTasks = (taskObj) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      let response = await fetch(`${BASE_URL}tasks/create`, {
        method: "POST",
        body: JSON.stringify(taskObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getTasks());
      } else {
        let error = await response.json();
        dispatch({ type: GET_ERROR, payload: error.message });
        throw new Error((await response.json()).message);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const completeTask = (doneObj, id) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      let response = await fetch(`${BASE_URL}tasks/${id}`, {
        method: "POST",
        body: JSON.stringify(doneObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getTasks());
        dispatch(getProjects());
      }
    } catch (error) {}
  };
};

export const updateTask = (taskObj, id) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      let response = await fetch(`${BASE_URL}tasks/${id}`, {
        method: "POST",
        body: JSON.stringify(taskObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getTasks());
        dispatch(getProjects());
      } else {
        let error = await response.json();
        dispatch({ type: GET_ERROR, payload: error.message });
      }
    } catch (error) {}
  };
};
