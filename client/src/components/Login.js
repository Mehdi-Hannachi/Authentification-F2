import React, { useState } from "react";
import { userLogin } from "../JS/actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.userReducer.loading);
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = (e) => {
    e.preventDefault();

    dispatch(
      userLogin({
        email,
        password,
      })
    );
  };

  if (isAuth) return <Redirect to="/profile" />;

  return (
    <div className="container">
      {loading ? (
        <h1>Pleaase wait</h1>
      ) : (
        <div className="row">
          <div className="row-md-8 offset-md-4">
            <input
              type="text"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row-md-8 offset-md-4">
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="row-md-8 offset-md-4">
            <button type="submit" className="btn btn-primary" onClick={login}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
