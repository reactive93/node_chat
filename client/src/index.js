import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Router, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/reducer';

const Main = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(Main, document.getElementById('root'));

serviceWorker.unregister();
