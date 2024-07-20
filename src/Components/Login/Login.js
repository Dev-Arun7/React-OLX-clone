
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const auth = getAuth();

  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    // Redirecting to home if user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Handle submission
  const onSubmit = async (data) => {
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo' />
        <form onSubmit={handleSubmit(onSubmit)} >
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
            type="text"
            id="fname"
            name="email"
          />
          <br />
          <error>
            {errors.email?.type === "required" && "Email is required"}
            {errors.email?.type === "pattern" && "Wrong format"}
          </error>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            {...register("password", { minLength: 4 })}
            id="lname"
            name="password"
          />
          <br />
          <error>
            {errors.password?.type === "minLength" && "Password is should be more than 4 letters"}
          </error>
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={() => navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
