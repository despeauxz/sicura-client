export const GET_ALL_STATES = 'GET_ALL_STATES';
export const GET_STATE = 'GET_STATE';
export const GET_INCIDENCES = 'GET_INCIDENCES';
export const STATES_ERROR = 'STATES_ERROR';
export const ADD_STATE_SUCCESS = 'ADD_STATE_SUCCESS';
export const DELETE_STATE_SUCCESS = 'DELETE_STATE_SUCCESS';
export const SORT_LIST = 'SORT_LIST';
export const LOADING = 'LOADING';

const initialState = {
    states: [],
    state: {},
    errors: {},
    incidence: [],
    loading: false
};

const sortList = (type, state) => {
    const clone = [...state.states];
    if (type === 'asc') {
        return clone.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }

            return 0;
        });
    } else {
        return clone
            .sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }

                return 0;
            })
            .reverse();
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_STATES:
            return {
                ...state,
                loading: false,
                errors: {},
                states: action.payload
            };
        case GET_STATE:
            return {
                ...state,
                loading: false,
                errors: {},
                state: action.payload
            };
        case GET_INCIDENCES:
            return {
                ...state,
                loading: false,
                errors: {},
                incidence: action.payload
            };
        case ADD_STATE_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                states: [...state.states, action.payload]
            };
        case DELETE_STATE_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                states: [...state.states].filter(state => {
                    return state.id !== action.payload;
                })
            };
        case SORT_LIST:
            return {
                ...state,
                loading: false,
                errors: {},
                states: sortList(action.payload, state)
            };
        case STATES_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return {
                ...state
            };
    }
};
