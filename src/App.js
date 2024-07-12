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
          <Route path='/view' element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
