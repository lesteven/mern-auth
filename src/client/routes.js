import Home from './views/home/Home.jsx';
import Register from './views/auth/Register.jsx';
import Login from './views/auth/Login.jsx';


const routes = {
    routes: [
        { path: '/', component: Home, exact: true, title: 'Home' },
        { path: '/register', component: Register, exact: true, 
            title: 'Register' },
        { path: '/login', component: Login, exact: true, title: 'Login' },

    ]
}

export default routes;
