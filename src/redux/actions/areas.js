import {
    LOADING,
    GET_ALL_AREAS,
    GET_AREA,
    ADD_AREA_SUCCESS,
    DELETE_AREA_SUCCESS,
    SORT_LIST,
    AREAS_ERROR,
    GET_LGA_IN_AREA
} from '../reducers/areas';
import errorHandler from '../../helpers/errorHandler';
import { toast } from 'react-toastify';
import instance from '../../config/axios';

export const loading = () => ({
    type: LOADING
});

export const getAreasSuccess = data => ({
    type: GET_ALL_AREAS,
    payload: data
});

export const areasFailure = error => ({
    type: AREAS_ERROR,
    payload: error
});

export const getAreaSuccess = data => ({
    type: GET_AREA,
    payload: data
});

export const addAreaSuccess = data => ({
    type: ADD_AREA_SUCCESS,
    payload: data
});

export const deleteAreaSuccess = data => ({
    type: DELETE_AREA_SUCCESS,
    payload: data
});

export const getSubSuccess = data => ({
    type: GET_LGA_IN_AREA,
    payload: data
});

export const sortList = type => ({
    type: SORT_LIST,
    payload: type
});

export const getSubItems = id => async dispatch => {
    try {
        const data = await instance.get(`/lga_area/${id}`);
        dispatch(getSubSuccess(data.data.data));
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(areasFailure(errorResponse.response));
    }
};

export const addArea = data => async dispatch => {
    try {
        dispatch(loading());

        const response = await instance.post('/area_reports', data);

        dispatch(addAreaSuccess(response.data.data));
        toast.success('Area added successfully');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(areasFailure(errorResponse.response));
    }
};

export const deleteArea = id => async dispatch => {
    try {
        await instance.delete(`/area_reports/${id}`);

        dispatch(deleteAreaSuccess(id));
        toast.success('Area delete successfully');
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(areasFailure(errorResponse.response));
    }
};

export const getAreas = () => async dispatch => {
    try {
        dispatch(loading());

        const data = await instance.get('/area_reports');
        dispatch(getAreasSuccess(data.data.data));
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(areasFailure(errorResponse.response));
    }
};

export const getArea = id => async dispatch => {
    try {
        dispatch(loading());

        const data = await instance.get(`/area_reports/${id}`);
        dispatch(getAreaSuccess(data.data.data));
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(areasFailure(errorResponse.response));
    }
};
