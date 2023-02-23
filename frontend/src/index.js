import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Web3ReactProvider } from "@web3-react/core";
import { Sumer } from "sumer-sdk";

// this is a temporary key, once sumer is realized you will be able
// to create your own key for your dapp
const dappKey = '019ac0ff-6638-4d3d-9c69-908cb7d834b7'

//configure web3-react
const getLibrary = (provider) => {

    const library = Sumer.init({ provider, dappKey })
    
    return library
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>
);