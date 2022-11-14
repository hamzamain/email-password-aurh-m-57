import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.init";

const auth = getAuth(app);

const Login = () => {
  const [passError, setPassError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    setSuccess(false);
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const upperCase = /(?=.*[A-Z].*[A-Z])/;
    const specialChar = /(?=.*[!@#$&*])/;
    // const regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!upperCase.test(password)) {
      setPassError("please provide at lest two upperCase");
      return;
    }

    if (!specialChar.test(password)) {
      setPassError("please provide at least 1 spatiol characters");
      return;
    }

    if (password.length < 6) {
      setPassError("please should be at lest 6 characters");
      return;
    }
    setPassError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        form.reset();
        passwordReset(email);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("error: ", error);
      });
  };

  const handleEmailBlur = (event) => {
    const email = event.target.value;
    setEmail(email);
  };

  const passwordReset = () => {
    if (!email) {
      alert("please enter your email address");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("password reset email send !!");
      })
      .catch((error) => {
        const errorMassege = error.message;
        setPassError(errorMassege);
      });
  };

  return (
    <div>
      <div className="w-50 mx-auto shadow-lg rounded p-4 mb-5">
        <h3 className="text-danger  ">Please Login !!!</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <p className="text-danger">{passError}</p>
          {success && <p className="text-success">Login Successfully</p>}

          <Button variant="danger" type="submit">
            Login
          </Button>

          <p>
            New to this website? Please <Link to={"/register"}>Register</Link>
          </p>
          <p>
            Forget password{" "}
            <button
              onClick={() => passwordReset()}
              className="btn btn-link fw-semibold"
            >
              Reset Password
            </button>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
