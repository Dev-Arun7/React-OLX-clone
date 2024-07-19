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
            {...register("username", { required: true })}
            type="text"
            id="username"
            name="username"
          />
          <br />
          <error>
            {errors.username?.type === "required" && "Name is required"}
          </error>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
            type="text"
            id="email"
            name="email"
          />
          <br />
          <error>
            {errors.email?.type === "required" && "Email is required"}
            {errors.email?.type === "pattern" && "Wrong format"}
          </error>
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            {...register("phone", {
              required: true,
              pattern: /^[0-9]+$/,
              minLength: 6,
              maxLength: 12,
            })}
            type="text"
            id="phone"
            name="phone"
          />
          <br />
          <error>
            {errors.phone?.type === "required" && "Phone number is required"}
            {errors.phone?.type === "pattern" && "Enter numbers only"}
            {errors.phone?.type === "minLength" && "Entered number is less than 6 digits"}
            {errors.phone?.type === "maxLength" && "Entered number is more than 12 digits"}
          </error>
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            {...register("password", {
              minLength: 4,
            })}
            type="text"
            id="password"
            name="password"
          />
          <br />
          <error>
            {errors.password?.type === "minLength" && "Entered password is less than 4 digits"}
          </error>
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}




