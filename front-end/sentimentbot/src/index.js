// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from '../src/Components/App';
import { makeMainRoutes } from './Components/routes';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = makeMainRoutes();

// const store = createStore(whatever, applyMiddleware(thunk, logger))

ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// import * as serviceWorker from './serviceWorker';// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
