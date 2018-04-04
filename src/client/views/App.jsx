import React, { Component, Fragment } from 'react';
import NavBar from './navBar/NavBar.jsx';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes.js';
import styles from './sharedCss/sharedCss.css';

class App extends Component {

    render() {
    const reactRoutes = routes.routes.map (e =>
        <Route exact = {e.exact } path = {e.path} component = {e.component}
            key = {e.path} />
        )
        return (
            <Fragment>
                <NavBar />
                <div className = 'max-width top-pad views'>
                    <Switch>
                        { reactRoutes }
                    </Switch>
                </div>
            </Fragment>
        )
    }
}

export default App;
