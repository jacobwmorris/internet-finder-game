import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import StartupScreen from './FinderGame';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StartupScreen/>
  </React.StrictMode>
);
