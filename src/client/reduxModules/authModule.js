// actions
const makeAccount = '/redux/authModule/REGISTER';
const updateRegInput = '/redux/authModule/REG_INPUT';
const updateLogInput = '/redux/authModule/LOG_INPUT';
const login = '/redux/authModule/LOGIN';


// action creaters

// register actions
export function registerAction(status) {
    return {
        type: makeAccount,
        status
    }
}

export function updateRI(name, value) {
    return {
        type: updateRegInput,
        name,
        value
    }
}
// login actions
export function updateLI(name, value) {
    return {
        type: updateLogInput,
        name,
        value
    }
}

export function loginAction(status) {
    return {
        type: login,
        status
    }
}
// initial state
let initialState = {
    register: {
        username:'',
        password:'',
        email:'',
        question:'',
        answer:''
    },
    login: {
        username: '',
        password:''
    },
    status: {}
}
// reducer
const authReducer = (state= initialState, action) => {
    const { status } = action;
    switch (action.type) {
        case makeAccount:
            return {
                ...state,
                register: {
                    ...success(status, state)
                },
                status
            }
        case updateRegInput: 
            return {
                ...state,
                register: {
                    ...state.register,
                    [action.name]:action.value,
                }
            }
        case updateLogInput:
            return {
                ...state,
                login: {
                    ...state.login,
                    [action.name]:action.value,
                }
            }
        case login: {
            return {
                ...state,
                login: {
                    ...loginSuccess(status, state)
                },
                status
            }
        }
        default:
            return state;
    }
}

// support functions
function success(status, state) {
    if (status.success)
        return initialState.register
    else
        return state.register
}
function loginSuccess(status, state) {
    if (status.user)
        return initialState.login
    else
        return state.login
}










export default authReducer;
