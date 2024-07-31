export const GET_HABITS = "GET_HABITS";
export const getHabits = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
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
    } catch (err) {
      console.log(err.message);
    }
  };
};
