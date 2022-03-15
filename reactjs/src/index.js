import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MoralisProvider } from "react-moralis";
import dotenv from 'dotenv';
dotenv.config();

ReactDOM.render(
  <MoralisProvider appId={process.env.REACT_APP_APPLICATIONID} serverUrl={process.env.REACT_APP_SERVERURL}>
    <App />
  </MoralisProvider>,
  document.getElementById('root')
);