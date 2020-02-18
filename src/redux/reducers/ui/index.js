import { TOGGLING } from '../../actions/ui';

const initialState = {
    toggle: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLING:
            return {
                ...state,
                toggle: action.payload
            };
        default:
            return state;
    }
};
