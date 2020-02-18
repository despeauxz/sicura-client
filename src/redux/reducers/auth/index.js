export const AUTHENTICATED = 'auth/AUTHENTICATED';
export const AUTHENTICATING = 'auth/AUTHENTICATING';
export const UNAUTHENTICATED = 'auth/UNAUTHENTICATED';
export const CLEAR_AUTH_ERROR = 'auth/CLEAR_AUTH_ERROR';
export const AUTHENTICATION_SUCCESS = 'auth/AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'auth/AUTHENTICATION_ERROR';

const initialState = {
    authenticated: !!localStorage.getItem('token'),
    loading: false,
    user: JSON.parse(localStorage.getItem('user')) || undefined,
    errors: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATED:
            return {
                ...state,
                loading: false,
                errors: {},
                user: action.payload
            };
        case AUTHENTICATING:
            return {
                ...state,
                loading: true,
                errors: {},
                user: undefined
            };
        case UNAUTHENTICATED:
        case CLEAR_AUTH_ERROR:
            return {
                ...state,
                authenticated: false,
                loading: false,
                user: undefined
            };
        case AUTHENTICATION_ERROR:
            return {
                ...state,
                authenticated: false,
                loading: false,
                errors: action.payload,
                user: undefined
            };
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                authenticated: true,
                loading: false,
                errors: {},
                user: action.payload
            };
        default:
            return state;
    }
};
