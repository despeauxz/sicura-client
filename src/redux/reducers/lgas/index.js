export const GET_ALL_LGAS = "GET_ALL_LGAS";
export const GET_LGA = "GET_LGA";
export const SORT_LIST = "SORT_LIST";
export const GET_LGA_IN_STATE = "GET_LGA_IN_STATE";
export const ADD_LGA_SUCCESS = "ADD_LGA_SUCCESS";
export const UPDATE_LGA_SUCCESS = "UPDATE_LGA_SUCCESS";
export const DELETE_LGA_SUCCESS = "DELETE_LGA_SUCCESS";
export const LGAS_ERROR = "LGAS_ERROR";
export const LGA_SORT_LIST = "LGA_SORT_LIST";
export const LOADING = "LOADING";

const initialState = {
    lgas: [],
    lga_state: [],
    lga: {},
    errors: {},
    loading: false
};

const sortList = (payload, state) => {
    const { type, sort } = payload;
    const clone = [...state.lgas];
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
    const editLga = payload => {
        const array = state.lgas.slice();
        const index = array.findIndex(lga => lga.id === payload.id);
        array[index] = payload;

        return array;
    };

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
        case UPDATE_LGA_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                lgas: editLga(action.payload)
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
        case LGA_SORT_LIST:
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
