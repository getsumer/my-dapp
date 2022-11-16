import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Web3ReactProvider } from "@web3-react/core";
import { SumerObserver, Client } from "sumer-sdk";

// this is a temporary key, once sumer is realized you will be able
// to create your own key for your dapp
const key = '04a23d9f-1c7a-414e-b400-847658ef5cd6'

//configure web3-react
const getLibrary = (provider) => {
  const client = new Client(provider, key)
  const library = new SumerObserver(client, key);
  return library;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>
);