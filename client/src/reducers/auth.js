import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";
import axios from 'axios'
import {BASE_URL} from '../constants'
const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: (localStorage.getItem("userdata") ? true : false),
  user: JSON.parse(localStorage.getItem("userdata")) || {},
  loading: false,
  integration:{
    monday:''
  }
};
export default function(state = initialState, action) {
  switch (action.type) {
    case "INTEGRATE_MONDAY":
      
      return{
        ...state
      }
    case "LOGOUT":
      return {
        initialState
      }
    case SET_CURRENT_USER:
      console.log("setCurrentUserReducer")
      axios.post(BASE_URL+'/api/login',{data:action.payload})
      .then(res=>console.log(res))
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
