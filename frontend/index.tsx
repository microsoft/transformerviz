import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'
import MainContainer from "./MainContainer";
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import "./app.css";
import "./tailwind.css";

const loggerMiddleware = createLogger()
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
initializeIcons();

ReactDOM.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>,
  document.getElementById('app')
);
