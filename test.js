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








Headers, js
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
          <span>{user ? user.displayName : "Login"}</span>
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
│   │   ├── olx - logo.svg
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
├── package - lock.json
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
│   ├── olx - logo.png
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   └── store
│       └── Context.js
└── test.js























































import React, { useEffect, useContext, useState } from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/FirebaseContext";
import { PostContext } from "./../../App";



function Posts(props) {
  const { searchResult } = props
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore(firebase);
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const data = querySnapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      setProducts(data);
    };
    fetchData();
  }, [firebase]);



  useEffect(() => {
    if (searchResult) {
      const updatedProducts = products.filter(product => {
        const lowerCaseMovieName = product.name.toLowerCase()
        const lowerCaseMovieSearch = searchResult
        return lowerCaseMovieName.includes(lowerCaseMovieSearch)
      });

      setFilteredProducts(updatedProducts);
    } else {
      setFilteredProducts([]);
    }

  }, [searchResult, products]);




  return (
    <div className="postParentDiv">


      {filteredProducts.length > 0 ?
        <div className="moreView">

          <div className="heading">
            <span>Search Result</span>
            <span>View more</span>
          </div>

          <div className="cards">
            {filteredProducts.map((product) => {
              return (
                <div className="card" onClick={() => {
                  setPostDetails(product)
                  navigate("/view")
                }}>
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.imageURL} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name">{product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        : <div>
          {searchResult.length > 0 && filteredProducts.length === 0 ?
            <div className="heading">
              <span>No result found</span>
              <span>View more</span>
            </div>
            :
            <div className="heading">

            </div>

          }
        </div>
      }









      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div className="card" onClick={() => {
                setPostDetails(product)
                navigate("/view")
              }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.imageURL} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="recommendations">
                        <div className="heading">
                        <span>Fresh recommendations</span>
                        </div>
                        <div className="cards">
                        <div className="card">
                            <div className="favorite">
                            <Heart></Heart>
                            </div>
                            <div className="image">
                            <img src="../../../Images/R15V3.jpg" alt="" />
                            </div>
                            <div className="content">
                            <p className="rate">&#x20B9; 250000</p>
                            <span className="kilometer">Two Wheeler</span>
                            <p className="name"> YAMAHA R15V3</p>
                            </div>
                            <div className="date">
                            <span>10/5/2021</span>
                            </div>
                        </div>
                        </div>
                    </div> */}
    </div>
  );
}

export default Posts;












