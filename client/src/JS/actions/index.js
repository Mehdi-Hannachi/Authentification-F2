import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_REGISTER,
  USER_LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE,
} from "../constants/actionsTypes";
import axios from "axios";

export const userRegister = (newUser) => async (dispatch) => {
  dispatch({ type: USER_REGISTER });

  try {
    const addResult = await axios.post("/user/register", newUser);

    dispatch({ type: REGISTER_SUCCESS, payload: addResult.data });
  } catch (error) {
    console.log(error);

    error.response.data.errors.map((el) => alert(el.msg));

    dispatch({ type: REGISTER_FAIL, payload: error.response.data });
  }
};

export const userLogin = (userLog) => async (dispatch) => {
  dispatch({ type: USER_LOGIN });

  try {
    const loginResult = await axios.post("/user/login", userLog);

    console.log(loginResult);

    localStorage.setItem("token", loginResult.data.token);

    dispatch({ type: LOGIN_SUCCESS, payload: loginResult.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
  }
};

export const getProfile = () => async (dispatch) => {
  dispatch({ type: GET_PROFILE });

  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    const user = await axios.get("/user/currentPage", config);

    dispatch({ type: GET_PROFILE_SUCCESS, payload: user.data });
  } catch (error) {
    dispatch({ type: GET_PROFILE_FAIL, payload: error.response.data });
  }
};
