export const ADD_USER = "ADD_USER";
export const loginAction = (userObj) => {
  return async (dispatch) => {
    try {
      let response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let token = await response.json();
        localStorage.setItem("token", token.accesstoken);
        dispatch({ type: ADD_USER, payload: token.accesstoken });
      }
    } catch (response) {
      throw new Error(response.message);
    }
  };
};
