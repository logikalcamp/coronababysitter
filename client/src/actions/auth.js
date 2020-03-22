
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";


export const loginUser = userData => dispatch => {
  
    // localStorage.setItem("users",JSON.stringify(userData))
    // localStorage.setItem("jwtToken", token);
    dispatch(setCurrentUser(userData))
}
export const setCurrentUser = (decoded) => {
    console.log("setCurrentUser")
    
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };

  export const logout = () =>({
    type:"LOGOUT"
  })
