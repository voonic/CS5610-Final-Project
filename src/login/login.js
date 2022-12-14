import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteUser, saveUser } from "../reducers/user-reducer";
import { signin } from "../services/auth-service";
import User from "../models/user";

/**
 * Function to create the login page.
 * Responsible for loging in already existing users.
 */
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userCred, setUserCred] = useState({});
  const setEmail = (e) => {
    setUserCred((userCred) => {
      return {
        ...userCred,
        email: e.target.value,
      };
    });
  };
  const setPassword = (e) => {
    setUserCred((userCred) => {
      return {
        ...userCred,
        password: e.target.value,
      };
    });
  };

  /**
   * logs in the user to the website.
   */
  const makeLogin = async (e) => {
    e.preventDefault();
    try {
      const dbUser = await signin(userCred);
      const modelUser = User.getUserDetails(dbUser);
      dispatch(saveUser(modelUser));
      navigate("/");
    } catch (error) {
      dispatch(deleteUser());
      alert(error.message);
    }
    return false;
  };

  return (
    <div className="loginpage p-5">
      <h4 className="text-white">Login Here!</h4>
      <form onSubmit={makeLogin}>
        <div className="input-group mt-3">
          <div className="form-floating">
            <input
              required={true}
              onChange={setEmail}
              value={userCred.email}
              type="email"
              className="form-control rounded-pill"
              id="loginfloatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="loginfloatingInput" className="text-muted">
              <i className="fa fa-user p-2"></i>Email
            </label>
          </div>
        </div>
        <br />
        <div className="input-group mb-4 mt-2">
          <div className="form-floating">
            <input
              required={true}
              onChange={setPassword}
              value={userCred.password}
              type="password"
              className="form-control rounded-pill"
              id="loginfloatingPassword"
              placeholder="Password"
            />
            <label htmlFor="loginfloatingPassword" className="text-muted">
              <i className="fa fa-lock p-2"></i>Password
            </label>
          </div>
        </div>
        <Button
          variant="primary"
          type="submit"
          size="lg"
          className="rounded-pill ps-5 pe-5"
        >
          Sign In
        </Button>
        <div className="mt-3"></div>
      </form>
    </div>
  );
};
export default Login;
