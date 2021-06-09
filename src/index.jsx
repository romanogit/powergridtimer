import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
