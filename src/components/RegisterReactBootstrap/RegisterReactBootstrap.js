import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const RegisterReactBootstrap = () => {
  const [passError, setPassError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();

    setSuccess(false);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;

    console.log(name, email, password);

    //validate  password
    const upperCase = /(?=.*[A-Z].*[A-Z])/;
    const specialChar = /(?=.*[!@#$&*])/;

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

    //creating new user account after password validation
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        form.reset();
        updateUserName(name);
        varyfyEmail();
      })
      .catch((error) => {
        const errorMessage = error.message;
        setPassError(error.message);
        console.error("error: ", errorMessage);
      });
  };

  //varifyEmail
  const varyfyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("Please check your email and varify");
    });
  };

  const updateUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("displayName updated");
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };

  return (
    <div className="w-50 mx-auto shadow-lg rounded p-4 mb-5">
      <h3 className="text-primary">Please Register !!!</h3>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
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

        {success && <p className="text-success">User Created Successfully</p>}

        <Button variant="primary" type="submit">
          Register
        </Button>
        <p>
          Already have a account? Please <Link to={"/login"}>Login</Link>
        </p>
      </Form>
    </div>
  );
};

export default RegisterReactBootstrap;
