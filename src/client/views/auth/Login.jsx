import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchData, postData } from '../../reduxModules/fetchThunk';
import { registerAction, 
         updateLI, loginAction } from '../../reduxModules/authModule';


class Login extends Component {
    login = (e) => {
        e.preventDefault();
        const { postData, loginAction, auth } = this.props;
        const data = auth.login;
        postData('/api/auth/log', 'POST', data, loginAction); 
    }
    handleChange = (e) => {
        const { updateLI } = this.props;
        updateLI(e.target.name, e.target.value);
    }

    render() {
    let { auth } = this.props;
        return (
            <Fragment>
            {auth.status.err ? 
                <h3 className='err'> {auth.status.err}</h3>
                : null }
            {auth.status.success ? 
                <h3 className='success'> {auth.status.success}</h3>
                : null }
            <form className='auth' onSubmit={this.login} >
                <h2> Login </h2>
                <input type='text' name='username' placeholder='username'
                    value={auth.login.username}  
                    onChange={this.handleChange}/>
                <input type='password' name='password' placeholder='password'
                    value={auth.login.password}  
                    onChange={this.handleChange}/>
                <input type='submit' value='Login'/>
            </form>
            </Fragment>
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
