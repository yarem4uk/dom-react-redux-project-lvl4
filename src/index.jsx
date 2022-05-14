// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import store from './slices/index.js';
import App from './components/App.jsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const mountNode = document.querySelector('#chat');
mountNode.classList.add('h-100');

const root = ReactDOM.createRoot(mountNode);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
