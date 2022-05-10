// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import React from 'react';
import { render } from 'react-dom';

import App from './components/App.jsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.querySelector('#chat');
container.classList.add('h-100');

render(<App />, container);
