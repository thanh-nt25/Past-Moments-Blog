import React from 'react';
import  ReactDOM  from 'react-dom';
// keep track of store => access state from anywhere
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import App from './App';


const store = createStore(reducers, compose(applyMiddleware(thunk)));
// connect react app to html
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);