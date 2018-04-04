import React, { Component, Fragment }  from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import routes from '../../routes.js';
import styles from './navBar.css';


class NavBar extends Component {
    
    render() {
    const links = routes.routes.map( e => 
        <Link to = {e.path} key = {e.path} > {e.title} </Link>

    )
        return (
            <div className = 'nav-wrapper'>
                <nav className = 'nav-bar max-width'>
                    <span className = 'links'>
                        { links }
                    </span>
                </nav>
            </div>
        )
    }
}

export default NavBar;
