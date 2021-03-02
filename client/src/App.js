import "./App.css";
import Login from "./components/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Register from "./components/Register";
import { Switch, Route } from "react-router-dom";
import Profile from "./components/Profile";
import { getProfile } from "./JS/actions";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  // useEffect(() => {
  //   dispatch(getProfile());
  // }, [isAuth]);

  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <Register />} />
        <Route exact path="/login" render={() => <Login />} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
