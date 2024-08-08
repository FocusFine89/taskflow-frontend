import { GET_ERROR } from "./errorAction";

export const GET_PROJECTS = "GET_PROJECTS";

export const getProjects = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let response = await fetch("http://localhost:3001/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token},`,
        },
      });
      if (response.ok) {
        let projects = await response.json();
        dispatch({ type: GET_PROJECTS, payload: projects });
      }
    } catch (err) {}
  };
};

export const deleteProjects = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let response = await fetch(`http://localhost:3001/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getProjects());
      } else {
        let error = await response.json();
        dispatch({ type: GET_ERROR, payload: error.message });
      }
    } catch (err) {}
  };
};

export const addTaskProject = (taskProjectObj, id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let response = await fetch(`http://localhost:3001/projects/${id}`, {
        method: "POST",
        body: JSON.stringify(taskProjectObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getProjects());
      } else {
        throw new Error((await response.json()).message);
      }
    } catch (err) {}
  };
};

export const createProject = (projectObj) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let response = await fetch("http://localhost:3001/projects", {
        method: "POST",
        body: JSON.stringify(projectObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getProjects());
      } else {
        let error = await response.json();
        dispatch({ type: GET_ERROR, payload: error.message });
        throw new Error((await response.json()).message);
      }
    } catch (err) {}
  };
};
