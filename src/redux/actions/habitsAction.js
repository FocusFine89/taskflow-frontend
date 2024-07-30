export const GET_HABITS = "GET_HABITS";
const token = localStorage.getItem("token");
export const getHabits = () => {
  return async (dispatch) => {
    try {
      let response = await fetch("http://localhost:3001/habits", {
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
    } catch (err) {}
  };
};
