import {
    LOADING,
    GET_ALL_STREETS,
    GET_STREET,
    ADD_STREET_SUCCESS,
    UPDATE_STREET_SUCCESS,
    DELETE_STREET_SUCCESS,
    SORT_LIST,
    STREET_ERROR
} from '../reducers/streets';
import errorHandler from '../../helpers/errorHandler';
import { toast } from 'react-toastify';
import instance from '../../config/axios';

export const loading = () => ({
    type: LOADING
});

export const getStreetsSuccess = data => ({
    type: GET_ALL_STREETS,
    payload: data
});

export const updateStreetSuccess = data => ({
    type: UPDATE_STREET_SUCCESS,
    payload: data
});

export const addStreetSuccess = data => ({
    type: ADD_STREET_SUCCESS,
    payload: data
});

export const deleteStreetSuccess = data => ({
    type: DELETE_STREET_SUCCESS,
    payload: data
});

export const streetsFailure = error => ({
    type: STREET_ERROR,
    payload: error
});

export const getStreetSuccess = data => ({
    type: GET_STREET,
    payload: data
});

export const sortList = type => ({
    type: SORT_LIST,
    payload: type
});

export const addStreet = data => async dispatch => {
    try {
        dispatch(loading());

        const response = await instance.post('/street_reports', data);

        dispatch(addStreetSuccess(response.data.data));
        toast.success('Street added successfully');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(streetsFailure(errorResponse.response));
    }
};

export const updateStreet = (id, data) => async dispatch => {
    try {
        const response = await instance.patch(`/street_reports/${id}`, data);

        dispatch(updateStreetSuccess(response.data.data));
        toast.success('Street updated successfully');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(streetsFailure(errorResponse.response));
    }
};

export const deleteStreet = id => async dispatch => {
    try {
        await instance.delete(`/street_reports/${id}`);

        dispatch(deleteStreetSuccess(id));
        toast.success('Street delete successfully');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(streetsFailure(errorResponse.response));
    }
};

export const getStreets = () => async dispatch => {
    try {
        dispatch(loading());

        const data = await instance.get('/street_reports');
        dispatch(getStreetsSuccess(data.data.data));
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(streetsFailure(errorResponse.response));
    }
};

export const getStreet = id => async dispatch => {
    try {
        dispatch(loading());

        const data = await instance.get(`/street_reports/${id}`);
        dispatch(getStreetSuccess(data.data.data));
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(streetsFailure(errorResponse.response));
    }
};
