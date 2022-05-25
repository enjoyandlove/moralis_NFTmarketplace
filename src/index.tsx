import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './Signup';
import reportWebVitals from './reportWebVitals';
import {MoralisProvider} from "react-moralis";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl="https://0nh2fddrxdfe.usemoralis.com:2053/server" appId="8CKJKtdwd4xcg28TqohJi6SAI75e2wVrjwgbB7Xq">
    {/* <App /> */}
    <Signup />
    </MoralisProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
