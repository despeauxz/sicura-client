import {
    LOADING,
    GET_ALL_STREETS,
    GET_STREET,
    ADD_STREET_SUCCESS,
    UPDATE_STREET_SUCCESS,
    DELETE_STREET_SUCCESS,
    SORT_LIST,
    STREET_ERROR
} from "../reducers/streets";
import errorHandler from "../../helpers/errorHandler";
import { toast } from "react-toastify";
import instance from "../../config/axios";

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

        const response = await instance.post("/street_reports", data);
        const streets = await instance.get(
            `/area_street/${response.data.data.areaId}`
        );

        const report = streets.data.data
            .map(street => {
                return JSON.parse(street.report);
            })
            .reduce((prev, cur) => {
                const murder = Math.round(
                    (Number(prev.murder) + Number(cur.murder)) /
                        streets.data.data.length
                );
                const kidnap = Math.round(
                    (Number(prev.kidnap) + Number(cur.kidnap)) /
                        streets.data.data.length
                );
                const armed_robbery = Math.round(
                    (Number(prev.armed_robbery) + Number(cur.armed_robbery)) /
                        streets.data.data.length
                );

                return { murder, kidnap, armed_robbery };
            });

        const rating = streets.data.data
            .map(street => {
                return street.rating;
            })
            .reduce((prev, cur) => prev + cur);

        await instance.patch(`/area_reports/${response.data.data.areaId}`, {
            report: JSON.stringify(report),
            rating: Math.round(rating / streets.data.data.length)
        });

        dispatch(addStreetSuccess(response.data.data));
        toast.success("Street added successfully");
    } catch (error) {
        console.log(error);
        const errorResponse = errorHandler(error);
        dispatch(streetsFailure(errorResponse.response));
    }
};

export const updateStreet = (id, data) => async dispatch => {
    try {
        dispatch(loading());
        const response = await instance.patch(`/street_reports/${id}`, data);
        const streets = await instance.get(
            `/area_street/${response.data.data.areaId}`
        );

        const report = streets.data.data
            .map(street => {
                return JSON.parse(street.report);
            })
            .reduce((prev, cur) => {
                const murder = Math.round(
                    (Number(prev.murder) + Number(cur.murder)) /
                        streets.data.data.length
                );
                const kidnap = Math.round(
                    (Number(prev.kidnap) + Number(cur.kidnap)) /
                        streets.data.data.length
                );
                const armed_robbery = Math.round(
                    (Number(prev.armed_robbery) + Number(cur.armed_robbery)) /
                        streets.data.data.length
                );

                return { murder, kidnap, armed_robbery };
            });

        const rating = streets.data.data
            .map(street => {
                return street.rating;
            })
            .reduce((prev, cur) => prev + cur);

        await instance.patch(`/area_reports/${response.data.data.areaId}`, {
            report: JSON.stringify(report),
            rating: Math.round(rating / streets.data.data.length)
        });

        dispatch(updateStreetSuccess(response.data.data));
        toast.success("Street updated successfully");
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(streetsFailure(errorResponse.response));
    }
};

export const deleteStreet = id => async dispatch => {
    try {
        dispatch(deleteStreetSuccess(id));
        await instance.delete(`/street_reports/${id}`);
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(streetsFailure(errorResponse.response));
    }
};

export const getStreets = () => async dispatch => {
    try {
        dispatch(loading());

        const data = await instance.get("/street_reports");
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
