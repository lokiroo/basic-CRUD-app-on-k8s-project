import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Your component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Matches <div id="root"> in public/index.html
);
