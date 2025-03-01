import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import Context from '../src/context' 

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>,
// );


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Context>
   <Router>
      <App />
    </Router>
   </Context>
  </React.StrictMode>,
);
