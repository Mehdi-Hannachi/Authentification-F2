import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../JS/actions";

const Profile = () => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return <div>{JSON.stringify(user)}</div>;
};

export default Profile;
