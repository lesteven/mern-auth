import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App.jsx';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import {BrowserRouter as Router} from 'react-router-dom';


const store = configureStore();

ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)

