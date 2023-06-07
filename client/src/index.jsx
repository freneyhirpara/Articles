import React from 'react';
import ReactDOM from 'react-dom';
import GlobalState from './context/GlobalState';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <GlobalState>
      <App />
    </GlobalState>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
