export const GET_TASKS = "GET_TASKS";

export const getTasks = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      let response = await fetch("http://localhost:3001/tasks", {
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
      let response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getTasks());
      }
    } catch (error) {}
  };
};

export const addTasks = (taskObj) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      let response = await fetch("http://localhost:3001/tasks/create", {
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
      let response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "POST",
        body: JSON.stringify(doneObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getTasks());
      }
    } catch (error) {}
  };
};

export const updateTask = (taskObj, id) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      let response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "POST",
        body: JSON.stringify(taskObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getTasks());
      }
    } catch (error) {}
  };
};
