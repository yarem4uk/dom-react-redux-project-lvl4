// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom/client';

import App from './components/App.jsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const mountNode = document.querySelector('#chat');
mountNode.classList.add('h-100');

const root = ReactDOM.createRoot(mountNode);

root.render(<App />);
