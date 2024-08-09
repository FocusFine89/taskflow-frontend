import { GET_ERROR } from "./errorAction";
import { BASE_URL } from "./getAllTasksAction";

export const GET_HABITS = "GET_HABITS";

export const getHabits = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let response = await fetch(`${BASE_URL}habits`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let habits = await response.json();
        dispatch({ type: GET_HABITS, payload: habits });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const checkHabits = (habitObj, id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let response = await fetch(`${BASE_URL}habits/days/${id}`, {
        method: "PATCH",
        body: JSON.stringify(habitObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getHabits());
      }
    } catch (err) {}
  };
};

export const deleteHabit = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let response = await fetch(`${BASE_URL}habits/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getHabits());
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

export const addHabit = (habitObj) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let response = await fetch(`${BASE_URL}habits`, {
        method: "POST",
        body: JSON.stringify(habitObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getHabits());
      } else {
        let error = await response.json();
        dispatch({ type: GET_ERROR, payload: error.message });
        throw new Error((await response.json()).message);
      }
    } catch (err) {}
  };
};

export const updateHabit = (habitObj, id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let response = await fetch(`${BASE_URL}habits/${id}`, {
        method: "PATCH",
        body: JSON.stringify(habitObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch(getHabits());
      }
    } catch (err) {}
  };
};
