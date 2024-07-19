import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseContext } from '../../store/Context';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../../firebase/config';

import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);

  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    const { username, email, phone, password } = data;

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set displayName
      await updateProfile(user, {
        displayName: username,
      });

      // Save additional user data to Firestore
      const firestore = getFirestore(app);
      const userDocRef = doc(firestore, 'users', user.uid);

      // Set document data with additional fields
      await setDoc(userDocRef, {
        username: username,
        email: email,
        phone: phone,
        createdAt: new Date(),
      });

      // Redirect to login page
      navigate("/login");

      console.log('User signed up:', user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Signup error: ', errorCode, errorMessage);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            {...register("username", { required: "Username is required" })}
            type="text"
            id="username"
            name="username"
          />
          {errors.username && <span>{errors.username.message}</span>}
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            {...register("email", { required: "Email is required" })}
            type="email"
            id="email"
            name="email"
          />
          {errors.email && <span>{errors.email.message}</span>}
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            {...register("phone", { required: "Phone number is required" })}
            type="text"
            id="phone"
            name="phone"
          />
          {errors.phone && <span>{errors.phone.message}</span>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            {...register("password", { required: "Password is required" })}
            type="password"
            id="password"
            name="password"
          />
          {errors.password && <span>{errors.password.message}</span>}
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}














import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../../firebase/config';
import { FirebaseContext } from '../../store/Context';

import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const { auth } = React.useContext(FirebaseContext);

  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    const { username, email, phone, password } = data;

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set displayName
      await updateProfile(user, { displayName: username });

      // Save additional user data to Firestore
      const firestore = getFirestore(app); // Initialize firestore instance
      const userDocRef = doc(firestore, 'users', user.uid);

      // Set document data with additional fields
      await setDoc(userDocRef, {
        username: username,
        email: email,
        phone: phone,
        createdAt: new Date(),
      });

      navigate("/login");

      console.log('User signed up:', user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Signup error: ', errorCode, errorMessage);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            {...register("username", { required: "Username is required" })}
            type="text"
            id="username"
            name="username"
          />
          {errors.username && <p>{errors.username.message}</p>}
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            {...register("email", { required: "Email is required", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email is not valid" } })}
            type="email"
            id="email"
            name="email"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            {...register("phone", { required: "Phone number is required", pattern: { value: /^[0-9]+$/, message: "Phone number must be numeric" } })}
            type="text"
            id="phone"
            name="phone"
          />
          {errors.phone && <p>{errors.phone.message}</p>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
            type="password"
            id="password"
            name="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
