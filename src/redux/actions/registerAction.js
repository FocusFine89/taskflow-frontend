import { BASE_URL } from "./getAllTasksAction";

export const registerAction = (userObj) => {
  return async (dispatch) => {
    try {
      // eslint-disable-next-line no-unused-vars
      let response = await fetch(`${BASE_URL}auth/register`, {
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
