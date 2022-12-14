import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteUser, saveUser } from "../reducers/user-reducer";
import { signup } from "../services/auth-service";
import User from "../models/user";

/**
 * Responsible for registering a new user into the website.
 * Adds the new user details to the databse.
 */
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userCred, setUserCred] = useState({
    accountType: "NORMAL",
  });
  const setName = (e) => {
    setUserCred((userCred) => {
      return {
        ...userCred,
        name: e.target.value,
      };
    });
  };

  /**
   * Responsible for getting and saving the email of the new user into the system.
   */
  const setEmail = (e) => {
    setUserCred((userCred) => {
      return {
        ...userCred,
        email: e.target.value,
      };
    });
  };

  /**
   * Responsible for getting and saving the passowrd of the new user into the system.
   */
  const setPassword = (e) => {
    setUserCred((userCred) => {
      return {
        ...userCred,
        password: e.target.value,
      };
    });
  };

  /**
   * Responsible for checking if the password is re entered correctly.
   */
  const setConfirmPassword = (e) => {
    setUserCred((userCred) => {
      return {
        ...userCred,
        confirmPassword: e.target.value,
      };
    });
  };

  /**
   * Responsible for setting the account type for new users (ADMIN / CRITIC / NORMAL).
   */
  const setAccountType = (e) => {
    setUserCred((userCred) => {
      return {
        ...userCred,
        accountType: e.target.value,
      };
    });
  };

  /**
   * Responsible for Singing in the new user into the website.
   */
  const makeSignUp = async (e) => {
    e.preventDefault();
    //function to check if the credentials provided are valid and proceed with login
    if (userCred.password !== userCred.confirmPassword) {
      alert("Passwords don't match! Please try again!");
      return false;
    }
    try {
      const dbUser = await signup(userCred);
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
    <div className="registerPage p-5">
      <h4 className="text-white">Sign up Here!</h4>
      <form onSubmit={makeSignUp}>
        <div className="input-group mt-3">
          <div className="form-floating">
            <input
              required={true}
              onChange={setName}
              value={userCred.name}
              type="text"
              className="form-control rounded-pill"
              id="floatingName"
              placeholder="Enter your first and last name e.g., John Doe"
            />
            <label htmlFor="floatingInput" className="text-muted">
              <i className="fa fa-user p-2" />
              Name
            </label>
          </div>
        </div>
        <br />
        <div className="input-group mt-2">
          <div className="form-floating">
            <input
              required={true}
              onChange={setEmail}
              value={userCred.email}
              type="email"
              className="form-control rounded-pill"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput" className="text-muted">
              <i className="fa-solid fa-id-card p-2" />
              Email
            </label>
          </div>
        </div>
        <br />
        <div className="input-group mt-2">
          <div className="form-floating">
            <input
              required={true}
              onChange={setPassword}
              value={userCred.password}
              type="password"
              className="form-control rounded-pill"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword" className="text-muted">
              <i className="fa fa-lock p-2" />
              Password
            </label>
          </div>
        </div>
        <br />
        <div className="input-group mt-2">
          <div className="form-floating">
            <input
              required={true}
              onChange={setConfirmPassword}
              value={userCred.confirmPassword}
              type="password"
              className="form-control rounded-pill"
              id="floatingPassword2"
              placeholder="Re-enter Password"
            />
            <label htmlFor="floatingConfirmPassword" className="text-muted">
              <i className="fa fa-lock p-2" />
              Confirm Password
            </label>
          </div>
        </div>
        <div className="input-group mt-4 mb-4 align-items-center">
          <div className="m-0 text-white">User Type:</div>
          <div className="form-check">
            <div className="btn-group">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option1"
                onChange={setAccountType}
                value="NORMAL"
                checked={userCred.accountType === "NORMAL"}
              />
              <label htmlFor="option1" className="btn btn-secondary ">
                Normal
              </label>

              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option2"
                onChange={setAccountType}
                value="CRITIC"
                checked={userCred.accountType === "CRITIC"}
              />
              <label htmlFor="option2" className="btn btn-secondary">
                Critic
              </label>

              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option3"
                onChange={setAccountType}
                value="ADMIN"
                checked={userCred.accountType === "ADMIN"}
              />
              <label htmlFor="option3" className="btn btn-secondary">
                Admin
              </label>
            </div>
          </div>
        </div>
        <Button
          variant="primary"
          type="submit"
          size="lg"
          className="rounded-pill ps-5 pe-5"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};
export default Register;
