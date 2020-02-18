import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';

const initialState = {};
const enhancers = [];
const middlewares = [thunk];
export const history = createBrowserHistory();

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        ...middlewares
    ),
    ...enhancers
);

const store = createStore(
    rootReducer(history), // root reducer with router state
    initialState,
    composedEnhancers
);

export default store;
