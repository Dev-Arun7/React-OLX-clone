import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Ensure BrowserRouter is imported correctly

import Home from './Pages/Home';
import Create from './Pages/Create';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ViewPost from './Pages/ViewPost';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter> {/* Wrap your Routes with BrowserRouter */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} /> {/* Add '/' before login */}
          <Route path='/create' element={<Create />} /> {/* Add '/' before create */}
          <Route path='/view' element={<ViewPost />} /> {/* Add '/' before view */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
