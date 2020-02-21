export const GET_ALL_AREAS = 'GET_ALL_AREAS';
export const GET_AREA = 'GET_AREA';
export const GET_LGA_IN_AREA = 'GET_LGA_IN_AREA';
export const ADD_AREA_SUCCESS = 'ADD_AREA_SUCCESS';
export const UPDATE_AREA_SUCCESS = 'UPDATE_AREA_SUCCESS';
export const DELETE_AREA_SUCCESS = 'DELETE_AREA_SUCCESS';
export const AREAS_ERROR = 'AREAS_ERROR';
export const AREA_SORT_LIST = 'AREA_SORT_LIST';
export const LOADING = 'LOADING';

const initialState = {
    areas: [],
    area_lga: [],
    area: {},
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
    const editArea = payload => {
        const array = state.areas.slice();
        const index = array.findIndex(area => area.id === payload.id);
        array[index] = payload;
        console.log(array);

        return array;
    };

    switch (action.type) {
        case GET_ALL_AREAS:
            return {
                ...state,
                loading: false,
                errors: {},
                areas: action.payload
            };
        case GET_AREA:
            return {
                ...state,
                loading: false,
                errors: {},
                area: action.payload
            };
        case ADD_AREA_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                areas: [...state.areas, action.payload]
            };
        case UPDATE_AREA_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                areas: editArea(action.payload)
            };
        case DELETE_AREA_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: {},
                areas: [...state.areas].filter(area => {
                    return area.id !== action.payload;
                })
            };
        case AREA_SORT_LIST:
            return {
                ...state,
                loading: false,
                errors: {},
                areas: sortList(action.payload, state)
            };
        case AREAS_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case GET_LGA_IN_AREA:
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
