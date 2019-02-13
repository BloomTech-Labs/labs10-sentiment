import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/Components/App';
import thunk from 'redux-think';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(whatever, applyMiddleware(thunk, logger));

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// import * as serviceWorker from './serviceWorker';// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
