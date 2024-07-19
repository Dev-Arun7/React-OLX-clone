useEffect(() => {
  // Block the back button
  const preventBack = () => {
    window.history.pushState(null, null, window.location.href);
  };

  window.history.pushState(null, null, window.location.href);
  window.addEventListener('popstate', preventBack);

  return () => {
    window.removeEventListener('popstate', preventBack);
  };
}, []);






//////////////////////////////////////////////////////////
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { firebase } = useContext(FirebaseContext);
  const auth = getAuth();

  useEffect(() => {
    // Block the back button
    const preventBack = () => {
      window.history.pushState(null, null, window.location.href);
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', preventBack);

    return () => {
      window.removeEventListener('popstate', preventBack);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
