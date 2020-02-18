export const GET_ALL_LGAS = 'GET_ALL_LGAS';
export const GET_LGA = 'GET_LGA';
export const SORT_LIST = 'SORT_LIST';
export const GET_LGA_IN_STATE = 'GET_LGA_IN_STATE';
export const ADD_LGA_SUCCESS = 'ADD_LGA_SUCCESS';
export const DELETE_LGA_SUCCESS = 'DELETE_LGA_SUCCESS';
export const LGAS_ERROR = 'LGAS_ERROR';
export const LOADING = 'LOADING';

const initialState = {
    lgas: [],
    lga_state: [],
    lga: {},
    errors: {},
    loading: false
};

const sortList = (type, state) => {
    const clone = [...state.lgas];
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
        case GET_ALL_LGAS:
            return {
                ...state,
                loading: false,
                errors: {},
                lgas: action.payload
            };
        case GET_LGA:
            return {
                ...state,
                loading: false,
                errors: {},
                lga: action.payload
            };
        case ADD_LGA_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                lgas: [...state.lgas, action.payload]
            };
        case DELETE_LGA_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                lgas: [...state.lgas].filter(lga => {
                    return lga.id !== action.payload;
                })
            };
        case SORT_LIST:
            return {
                ...state,
                loading: false,
                errors: {},
                lgas: sortList(action.payload, state)
            };
        case LGAS_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case GET_LGA_IN_STATE:
            return {
                ...state,
                loading: false,
                lga_state: action.payload
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
