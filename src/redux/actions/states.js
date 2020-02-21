import {
    LOADING,
    GET_ALL_STATES,
    GET_INCIDENCES,
    ADD_INCIDENCE,
    UPDATE_INCIDENCE,
    UPDATE_STATE_SUCCESS,
    DELETE_INCIDENCE,
    GET_STATE,
    ADD_STATE_SUCCESS,
    DELETE_STATE_SUCCESS,
    STATE_SORT_LIST,
    STATES_ERROR
} from '../reducers/states';
import errorHandler from '../../helpers/errorHandler';
import { toast } from 'react-toastify';
import instance from '../../config/axios';

export const loading = () => ({
    type: LOADING
});

export const getStatesSuccess = data => ({
    type: GET_ALL_STATES,
    payload: data
});

export const getIncidentSuccess = data => ({
    type: GET_INCIDENCES,
    payload: data
});

export const addStateSuccess = data => ({
    type: ADD_STATE_SUCCESS,
    payload: data
});

export const deleteStateSuccess = data => ({
    type: DELETE_STATE_SUCCESS,
    payload: data
});

export const statesFailure = error => ({
    type: STATES_ERROR,
    payload: error
});

export const getStateSuccess = data => ({
    type: GET_STATE,
    payload: data
});

export const sortList = type => ({
    type: STATE_SORT_LIST,
    payload: type
});

export const addIncidenceSuccess = data => ({
    type: ADD_INCIDENCE,
    payload: data
});

export const deleteIncidenceSuccess = data => ({
    type: DELETE_INCIDENCE,
    payload: data
});

export const updateIncidenceSuccess = data => ({
    type: UPDATE_INCIDENCE,
    payload: data
});

export const updateStateSuccess = data => ({
    type: UPDATE_STATE_SUCCESS,
    payload: data
});

export const getIncidences = () => async dispatch => {
    try {
        const data = await instance.get('/incidences');
        dispatch(getIncidentSuccess(data.data.data));
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(statesFailure(errorResponse.response));
    }
};

export const addState = data => async dispatch => {
    try {
        dispatch(loading());

        const response = await instance.post('/state_reports', data);

        dispatch(addStateSuccess(response.data.data));
        toast.success('State added successfully');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(statesFailure(errorResponse.response));
    }
};

export const addIncidence = data => async dispatch => {
    try {
        dispatch(loading());

        const response = await instance.post('/incidences', data);

        dispatch(addIncidenceSuccess(response.data.data));
        toast.success('Incidence added successfully');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(statesFailure(errorResponse.response));
    }
};

export const updateState = (id, data) => async dispatch => {
    try {
        dispatch(loading());
        const response = await instance.patch(`/state_reports/${id}`, data);

        dispatch(updateStateSuccess(response.data.data));
        toast.success('State updated successfully');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(statesFailure(errorResponse.response));
    }
};

export const updateIncidence = (id, data) => async dispatch => {
    try {
        const response = await instance.patch(`/incidences/${id}`, data);

        dispatch(updateIncidenceSuccess(response.data.data));
        toast.success('Incidence updated successfully');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(statesFailure(errorResponse.response));
    }
};

export const deleteState = id => async dispatch => {
    try {
        await instance.delete(`/state_reports/${id}`);

        dispatch(deleteStateSuccess(id));
        toast.success('State deleted successfully');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(statesFailure(errorResponse.response));
    }
};

export const deleteIncidence = id => async dispatch => {
    try {
        await instance.delete(`/incidences/${id}`);

        dispatch(deleteIncidenceSuccess(id));
        toast.success('Incidence deleted successfully');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(statesFailure(errorResponse.response));
    }
};

export const getStates = () => async dispatch => {
    try {
        dispatch(loading());

        const data = await instance.get('/state_reports');
        dispatch(getStatesSuccess(data.data.data));
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(statesFailure(errorResponse.response));
    }
};

export const getState = id => async dispatch => {
    try {
        dispatch(loading());

        const data = await instance.get(`/state_reports/${id}`);
        dispatch(getStateSuccess(data.data.data));
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(statesFailure(errorResponse.response));
    }
};
