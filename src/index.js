import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FirebaseContext } from './store/Context';
import Context from './store/Context'
import { app, auth, storage } from './firebase/config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseContext.Provider value={{ app, auth, storage }}>
    <React.StrictMode>
      <Context>
        <App />
      </Context>
    </React.StrictMode>
  </FirebaseContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
