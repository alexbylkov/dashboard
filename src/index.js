import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ErrorBoundry from './components/errorBoundry';
import store from './store';
import Authorization from './components/authorization';

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <Router>
                <Route path='/' exact component={Authorization}/>
                <App/> 
            </Router> 
        </ErrorBoundry>
    </Provider>
, document.getElementById('root'));