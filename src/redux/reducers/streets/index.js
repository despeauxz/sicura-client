export const GET_ALL_STREETS = 'GET_ALL_STREETS';
export const GET_STREET = 'GET_STREET';
export const STREET_ERROR = 'STATES_ERROR';
export const ADD_STREET_SUCCESS = 'ADD_STREET_SUCCESS';
export const DELETE_STREET_SUCCESS = 'DELETE_STREET_SUCCESS';
export const SORT_LIST = 'SORT_LIST';
export const LOADING = 'LOADING';

const initialState = {
    streets: [],
    street: {},
    errors: {},
    loading: false
};

const sortList = (type, state) => {
    const clone = [...state.areas];
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
        case GET_ALL_STREETS:
            return {
                ...state,
                loading: false,
                errors: {},
                streets: action.payload
            };
        case GET_STREET:
            return {
                ...state,
                loading: false,
                errors: {},
                street: action.payload
            };
        case ADD_STREET_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                streets: [...state.states, action.payload]
            };
        case DELETE_STREET_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                streets: [...state.states].filter(state => {
                    return state.id !== action.payload;
                })
            };
        case SORT_LIST:
            return {
                ...state,
                loading: false,
                errors: {},
                streets: sortList(action.payload, state)
            };
        case STREET_ERROR:
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
