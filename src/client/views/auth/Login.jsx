import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, postData } from '../../reduxModules/fetchThunk';
import { registerAction, updateRI } from '../../reduxModules/authModule';


class Login extends Component {
    login = (e) => {
        e.preventDefault();
        const { postData, loginAction, auth } = this.props;
        const data = auth.login;
        postData('/api/auth/log', 'POST', data, loginAction); 
    }
    handleChange = (e) => {
        const { updateRI } = this.props;
        updateLI(e.target.name, e.target.value);
    }

    render() {
        return (
            <form className='auth'>
                <h2> Login </h2>
                <input type='text' name='username' placeholder='username'/>
                <input type='password' name='password' placeholder='password'/>
                <input type='submit' value='Login'/>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, cb) => dispatch(fetchData(url, cb)),
        postData: (url, method, data, cb) => dispatch(postData(url, method,
            data, cb)),
        loginAction: (status) => dispatch(loginAction(status)),
        updateLI: (value,data) => dispatch(updateLI(value,data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
