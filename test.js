config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwy-7X3lxl2aDP0FdTF7VgH7YvPKv6zU4",
    authDomain: "fir-4f1e4.firebaseapp.com",
    projectId: "fir-4f1e4",
    storageBucket: "fir-4f1e4.appspot.com",
    messagingSenderId: "957324014260",
    appId: "1:957324014260:web:e57fb08e9564a384c31de1",
    measurementId: "G-M1TBQB9814"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, auth, storage, firestore };


context.js
import { createContext, useState } from "react";

export const FirebaseContext = createContext(null)
export const AuthContext = createContext(null)

export default function Context({ children }) {
    const [user, setUser] = useState(null)
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}



signup.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseContext } from '../../store/Context';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../../firebase/config';


import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useContext(FirebaseContext);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to Firestore
      const firestore = getFirestore(app); // Initializie firestore instance
      const userDocRef = doc(firestore, 'users', user.uid);

      // Set document data with additional fields
      await setDoc(userDocRef, {
        username: username,
        email: email,
        phone: phone,
        createdAt: new Date()
      }).then(() => { navigate("/login") })
      console.log('User signed up:', user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Signup error: ', errorCode, errorMessage)
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}

App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useContext } from 'react';
import Home from './Pages/Home';
import Create from './Pages/Create';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ViewPost from './Pages/ViewPost';
import Footer from './Components/Footer/Footer';
import { AuthContext, FirebaseContext } from './store/Context'

function App() {
  const auth = getAuth();
  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const uid = user.uid;
        // ...
      } else {
        setUser(null);
      }
    });
  })
  return (
    <div className="App">
      <BrowserRouter> {/* Wrap your Routes with BrowserRouter */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/view' element={<ViewPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;








Headers,js
import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';

function Header() {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? user.displayName: "Login"}</span>
          <hr />
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;


.
├── .gitignore
├── README.md
├── assets
│   ├── images
│   │   ├── banner copy.png
│   │   ├── olx-logo.svg
│   │   └── svg
│   │       └── svg.js
│   └── styles
│       ├── components
│       │   ├── Banner.css
│       │   ├── Footer.css
│       │   ├── Header.css
│       │   ├── Post.css
│       │   └── View.css
│       └── pages
│           ├── Create.css
│           ├── Home.css
│           ├── Login.css
│           └── Signup.css
├── package-lock.json
├── package.json
├── public
│   ├── Images
│   │   ├── R15V3.jpg
│   │   ├── banner copy.png
│   │   └── banner.jpg
│   ├── global.css
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.js
│   ├── App.test.js
│   ├── Components
│   │   ├── Banner
│   │   │   ├── Banner.css
│   │   │   └── Banner.js
│   │   ├── Create
│   │   │   ├── Create.css
│   │   │   └── Create.js
│   │   ├── Footer
│   │   │   ├── Footer.css
│   │   │   └── Footer.js
│   │   ├── Header
│   │   │   ├── Header.css
│   │   │   └── Header.js
│   │   ├── Login
│   │   │   ├── Login.css
│   │   │   └── Login.js
│   │   ├── Posts
│   │   │   ├── Post.css
│   │   │   └── Posts.js
│   │   ├── Signup
│   │   │   ├── Signup.css
│   │   │   └── Signup.js
│   │   └── View
│   │       ├── View.css
│   │       └── View.js
│   ├── Pages
│   │   ├── Create.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   └── ViewPost.js
│   ├── assets
│   │   ├── Arrow.js
│   │   ├── Heart.js
│   │   ├── OlxLogo.js
│   │   ├── Search.js
│   │   ├── SellButton.js
│   │   └── SellButtonPlus.js
│   ├── firebase
│   │   └── config.js
│   ├── index.js
│   ├── olx-logo.png
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   └── store
│       └── Context.js
└── test.js































import React, { Fragment,useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { collection,getFirestore,doc,setDoc } from "firebase/firestore"; 
import {FirebaseContext,AuthContext} from './../../store/FirebaseContext'
import './Create.css';
import Header from '../Header/Header';
const Create = () => {
  
  const [name,setname] = useState('')

  
  const [category,setcategory] = useState('')

  const [price, setprice] = useState('')
  const [description,setDescription] = useState('')

  const [image, setimage] = useState(null)
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
 const firestore=getFirestore(firebase)
 const date = new Date().toDateString();
 const navigate = useNavigate()

  
 const handleSubmit= async()=>{
  if (!image) {
    alert("Please select an image");
    return;
  }
  try{
    const storage = getStorage();
    console.log(1, storage)
    const storageRef = ref(storage, `/images/${image.name}`);
    console.log(2 , storageRef)
    const snapshot=await uploadBytes(storageRef, image)
    console.log(3, snapshot)
    const imageURL = await getDownloadURL(snapshot.ref);
    const productsCollection = collection(firestore, "products");
    await setDoc(doc(productsCollection), {
     name,
     category,
     price,
     imageURL,
     description,
     createdAt:date.toString(),
     userId:user.uid
    });
    console.log("let going to navigate")
    navigate("/");
  }catch (error) {
    console.error("Error uploading image or saving product:", error);
  }

}

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
            value={name}
            onChange={(e)=>setname(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Description</label>
            <br />
            <input
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="des"
              defaultValue="John"
            />
            <br />

            <label htmlFor="fname">Category</label>
            <br />
            <input
            value={category}
            onChange={(e)=>setcategory(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />


            <label htmlFor="fname">Price</label>
            <br />
            <input value={price} onChange={(e)=>setprice(e.target.value)} className="input" type="number" id="fname" name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):null}></img>
       
            <br />
            <input onChange={(e)=>setimage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        
        </div>
      </card>
    </Fragment>
  );
};

export default Create;