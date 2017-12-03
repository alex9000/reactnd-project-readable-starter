import React from 'react';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root'
import registerServiceWorker from './registerServiceWorker';

const loggerMiddleware = createLogger()
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(
  reducer,
  applyMiddleware(
    loggerMiddleware, // neat middleware that logs actions
    thunkMiddleware // lets us dispatch() functions
  )
);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)
registerServiceWorker();
