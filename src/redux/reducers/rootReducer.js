import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import ui from './ui';
import states from './states';
import lgas from './lgas';
import areas from './areas';
import streets from './streets';

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        auth,
        ui,
        states,
        lgas,
        areas,
        streets
    });

export default createRootReducer;
