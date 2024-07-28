export const registerAction = (userObj) => {
  return async (dispatch) => {
    try {
      let response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (response) {
      throw new Error(response.message);
    }
  };
};
