import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Signup from './Signup';
import reportWebVitals from './reportWebVitals';
import {MoralisProvider} from "react-moralis";

const APP_ID: any = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL: any = process.env.REACT_APP_MORALIS_SERVER_URL;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={SERVER_URL} appId={APP_ID}>
     <Signup />
    </MoralisProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
