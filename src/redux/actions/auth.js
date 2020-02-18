import errorHandler from '../../helpers/errorHandler';
import instance from '../../config/axios';
import { toast } from 'react-toastify';
import { history } from '../store';
import {
    AUTHENTICATED,
    AUTHENTICATING,
    UNAUTHENTICATED,
    CLEAR_AUTH_ERROR,
    AUTHENTICATION_ERROR,
    AUTHENTICATION_SUCCESS
} from '../reducers/auth';

export const authenticating = () => ({
    type: AUTHENTICATING
});

export const authenticated = () => ({
    type: AUTHENTICATED
});

export const authenticationSuccess = user => ({
    type: AUTHENTICATION_SUCCESS,
    payload: user
});

export const authenticationFailure = error => ({
    type: AUTHENTICATION_ERROR,
    payload: error
});

export const clearAuthError = () => ({
    type: CLEAR_AUTH_ERROR
});

export const resetUser = () => ({
    type: UNAUTHENTICATED
});

export const auth = user => async dispatch => {
    try {
        dispatch(authenticating());

        const response = await instance.post('/auth/login', user);

        if (!response.data.data.user.admin) {
            dispatch(authenticationFailure('⚠️ Admin Access Only!'));
            return;
        }
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        dispatch(authenticationSuccess(response.data.data.user));
        history.push('/admin');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(authenticationFailure(errorResponse.response));
        if (typeof error.response.data.error === 'string') {
            toast.error(`${error.response.data.error}`, {
                className: 'toast-container',
                bodyClassName: 'toast-body text-sm font-light'
            });
        }
    }
};

export const authenticateUser = () => async dispatch => {
    try {
        dispatch(authenticating());

        const response = JSON.parse(localStorage.getItem('token'));

        dispatch(authenticationSuccess(response));
    } catch (error) {
        const errorResponse = errorHandler(error);

        localStorage.removeItem('token');

        dispatch(authenticationFailure(errorResponse.response));
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(resetUser());
};
