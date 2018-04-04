import {createStore, applyMiddleware, combineReducers,compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reduxModules/authModule';

const reducers = combineReducers({
    authReducer,
})

export default function configureStore(initialState) {
    return createStore(
		reducers,
		initialState,
		compose(
			applyMiddleware(thunk),
			window.devToolsExtension? window.devToolsExtension():f=>f
		)
    )
}
