import {
    LOADING,
    GET_ALL_LGAS,
    GET_LGA,
    ADD_LGA_SUCCESS,
    DELETE_LGA_SUCCESS,
    SORT_LIST,
    LGAS_ERROR,
    GET_LGA_IN_STATE
} from '../reducers/lgas';
import errorHandler from '../../helpers/errorHandler';
import { toast } from 'react-toastify';
import instance from '../../config/axios';

export const loading = () => ({
    type: LOADING
});

export const getLgasSuccess = data => ({
    type: GET_ALL_LGAS,
    payload: data
});

export const lgasFailure = error => ({
    type: LGAS_ERROR,
    payload: error
});

export const getLgaSuccess = data => ({
    type: GET_LGA,
    payload: data
});

export const addLgaSuccess = data => ({
    type: ADD_LGA_SUCCESS,
    payload: data
});

export const deleteLgaSuccess = data => ({
    type: DELETE_LGA_SUCCESS,
    payload: data
});

export const getSubSuccess = data => ({
    type: GET_LGA_IN_STATE,
    payload: data
});

export const sortList = type => ({
    type: SORT_LIST,
    payload: type
});

export const getSubItems = id => async dispatch => {
    try {
        const data = await instance.get(`/state_lga/${id}`);
        dispatch(getSubSuccess(data.data.data));
    } catch (error) {
        dispatch(lgasFailure(error));
    }
};

export const addLga = data => async dispatch => {
    try {
        dispatch(loading());

        const response = await instance.post('/lga_reports', data);

        dispatch(addLgaSuccess(response.data.data));
        toast.success('LGA added successfully');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(lgasFailure(errorResponse.response));
    }
};

export const deleteLga = id => async dispatch => {
    try {
        await instance.delete(`/lga_reports/${id}`);

        dispatch(deleteLgaSuccess(id));
        toast.success('LGA delete successfully');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(lgasFailure(errorResponse.response));
    }
};

export const getLgas = () => async dispatch => {
    try {
        dispatch(loading());

        const data = await instance.get('/lga_reports');
        dispatch(getLgasSuccess(data.data.data));
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(lgasFailure(errorResponse.response));
    }
};

export const getLga = id => async dispatch => {
    try {
        dispatch(loading());

        const data = await instance.get(`/lga_reports/${id}`);
        dispatch(getLgaSuccess(data.data.data));
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(lgasFailure(errorResponse.response));
    }
};
