// actions
const makeAccount = '/redux/regModule/REGISTER';
const updateRegInput = '/redux/regModule/REG_INPUT';
const updateLogInput = '/redux/regModule/LOG_INPUT';


// action creaters
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
export function updateLI(name, value) {
    return {
        type: updateLogInput,
        name,
        value
    {
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
    }
    status: {}
}
// reducer
const authReducer = (state= initialState, action) => {
    const { status } = action;
    switch (action.type) {
        case makeAccount:
            return {
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











export default authReducer;






