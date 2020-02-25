export const GET_ALL_STATES = "GET_ALL_STATES";
export const GET_STATE = "GET_STATE";
export const GET_INCIDENCES = "GET_INCIDENCES";
export const ADD_INCIDENCE = "ADD_INCIDENCE";
export const UPDATE_INCIDENCE = "UPDATE_INCIDENCE";
export const DELETE_INCIDENCE = "DELETE_INCIDENCE";
export const STATES_ERROR = "STATES_ERROR";
export const ADD_STATE_SUCCESS = "ADD_STATE_SUCCESS";
export const UPDATE_STATE_SUCCESS = "UPDATE_STATE_SUCCESS";
export const DELETE_STATE_SUCCESS = "DELETE_STATE_SUCCESS";
export const STATE_SORT_LIST = "STATE_SORT_LIST";
export const LOADING = "LOADING";

const initialState = {
    states: [],
    state: {},
    errors: {},
    incidence: [],
    loading: false
};

const sortList = (payload, state) => {
    const { type, sort } = payload;
    const clone = [...state.states];
    if (type === "asc") {
        if (!sort) {
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
            return clone.sort((a, b) => a.rating - b.rating);
        }
    } else {
        if (!sort) {
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
        } else {
            return clone.sort((a, b) => a.rating - b.rating).reverse();
        }
    }
};

export default (state = initialState, action) => {
    const editIncidence = payload => {
        const array = state.incidence.slice();
        const index = array.findIndex(incidence => incidence.id === payload.id);
        array[index] = payload;
        console.log(array);

        return array;
    };

    const editState = payload => {
        const array = state.states.slice();
        const index = array.findIndex(state => state.id === payload.id);
        array[index] = payload;

        return array;
    };
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
        case ADD_INCIDENCE:
            return {
                ...state,
                loading: false,
                errors: {},
                incidence: [...state.incidence, action.payload]
            };
        case UPDATE_STATE_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                states: editState(action.payload)
            };
        case UPDATE_INCIDENCE:
            return {
                ...state,
                loading: false,
                errors: {},
                incidence: editIncidence(action.payload)
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
        case DELETE_INCIDENCE:
            return {
                ...state,
                loading: false,
                errors: {},
                incidence: [...state.incidence].filter(incidence => {
                    return incidence.id !== action.payload;
                })
            };
        case STATE_SORT_LIST:
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
