import {
    LOADING,
    GET_ALL_LGAS,
    GET_LGA,
    ADD_LGA_SUCCESS,
    UPDATE_LGA_SUCCESS,
    DELETE_LGA_SUCCESS,
    LGA_SORT_LIST,
    LGAS_ERROR,
    GET_LGA_IN_STATE
} from "../reducers/lgas";
import errorHandler from "../../helpers/errorHandler";
import { toast } from "react-toastify";
import instance from "../../config/axios";

export const loading = () => ({
    type: LOADING
});

export const getLgasSuccess = data => ({
    type: GET_ALL_LGAS,
    payload: data
});

export const updateLgasSuccess = data => ({
    type: UPDATE_LGA_SUCCESS,
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

export const sortList = (type, sort) => ({
    type: LGA_SORT_LIST,
    payload: { type, sort }
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

        const response = await instance.post("/lga_reports", data);
        const lgas = await instance.get(
            `/state_lga/${response.data.data.stateId}`
        );

        const report = lgas.data.data
            .map(lga => {
                return JSON.parse(lga.report);
            })
            .reduce((prev, cur) => {
                const murder = Math.round(
                    (Number(prev.murder) + Number(cur.murder)) /
                        lgas.data.data.length
                );
                const kidnap = Math.round(
                    (Number(prev.kidnap) + Number(cur.kidnap)) /
                        lgas.data.data.length
                );
                const armed_robbery = Math.round(
                    (Number(prev.armed_robbery) + Number(cur.armed_robbery)) /
                        lgas.data.data.length
                );

                return { murder, kidnap, armed_robbery };
            });

        const rating = lgas.data.data
            .map(lga => {
                return lga.rating;
            })
            .reduce((prev, cur) => prev + cur);

        await instance.patch(`/state_reports/${response.data.data.stateId}`, {
            rating: Math.round(rating / lgas.data.data.length),
            report: JSON.stringify(report)
        });

        dispatch(addLgaSuccess(response.data.data));
        toast.success("LGA added successfully");
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(lgasFailure(errorResponse.response));
    }
};

export const updateLga = (id, data) => async dispatch => {
    try {
        dispatch(loading());
        const response = await instance.patch(`/lga_reports/${id}`, data);
        const lgas = await instance.get(
            `/state_lga/${response.data.data.stateId}`
        );

        const report = lgas.data.data
            .map(lga => {
                return JSON.parse(lga.report);
            })
            .reduce((prev, cur) => {
                const murder = Math.round(
                    (Number(prev.murder) + Number(cur.murder)) /
                        lgas.data.data.length
                );
                const kidnap = Math.round(
                    (Number(prev.kidnap) + Number(cur.kidnap)) /
                        lgas.data.data.length
                );
                const armed_robbery = Math.round(
                    (Number(prev.armed_robbery) + Number(cur.armed_robbery)) /
                        lgas.data.data.length
                );

                return { murder, kidnap, armed_robbery };
            });

        const rating = lgas.data.data
            .map(lga => {
                return lga.rating;
            })
            .reduce((prev, cur) => prev + cur);

        await instance.patch(`/state_reports/${response.data.data.stateId}`, {
            rating: Math.round(rating / lgas.data.data.length),
            report: JSON.stringify(report)
        });

        dispatch(updateLgasSuccess(response.data.data));
        toast.success("LGA updated successfully");
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(lgasFailure(errorResponse.response));
    }
};

export const deleteLga = id => async dispatch => {
    try {
        dispatch(deleteLgaSuccess(id));
        await instance.delete(`/lga_reports/${id}`);
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(lgasFailure(errorResponse.response));
    }
};

export const getLgas = () => async dispatch => {
    try {
        dispatch(loading());

        const data = await instance.get("/lga_reports");
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
