import React, { useContext } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';

function Header() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={()=> navigate('/')} className="brandName">
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
          <span onClick={() => navigate('/login')} >{user ? user.displayName : "Login"}</span>
          <hr />
        </div>
        {user && <span onClick={() => {
          const auth = getAuth();
          signOut(auth);
          navigate("/login")
        }} > Logout </span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div onClick={() => navigate('/create')} className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
