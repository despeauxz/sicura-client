import {
    LOADING,
    GET_ALL_AREAS,
    GET_AREA,
    ADD_AREA_SUCCESS,
    UPDATE_AREA_SUCCESS,
    DELETE_AREA_SUCCESS,
    AREA_SORT_LIST,
    AREAS_ERROR,
    GET_LGA_IN_AREA
} from "../reducers/areas";
import errorHandler from "../../helpers/errorHandler";
import { toast } from "react-toastify";
import instance from "../../config/axios";

export const loading = () => ({
    type: LOADING
});

export const getAreasSuccess = data => ({
    type: GET_ALL_AREAS,
    payload: data
});

export const updateAreasSuccess = data => ({
    type: UPDATE_AREA_SUCCESS,
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
    type: AREA_SORT_LIST,
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

        const response = await instance.post("/area_reports", data);
        const areas = await instance.get(
            `/lga_area/${response.data.data.lgaId}`
        );

        const report = areas.data.data
            .map(area => {
                return JSON.parse(area.report);
            })
            .reduce((prev, cur) => {
                const murder = Math.round(
                    (Number(prev.murder) + Number(cur.murder)) /
                        areas.data.data.length
                );
                const kidnap = Math.round(
                    (Number(prev.kidnap) + Number(cur.kidnap)) /
                        areas.data.data.length
                );
                const armed_robbery = Math.round(
                    (Number(prev.armed_robbery) + Number(cur.armed_robbery)) /
                        areas.data.data.length
                );

                return { murder, kidnap, armed_robbery };
            });

        const rating = areas.data.data
            .map(area => {
                return area.rating;
            })
            .reduce((prev, cur) => prev + cur);

        await instance.patch(`/lga_reports/${response.data.data.lgaId}`, {
            rating: Math.round(rating / areas.data.data.length),
            report: JSON.stringify(report)
        });

        dispatch(addAreaSuccess(response.data.data));
        toast.success("Area added successfully");
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(areasFailure(errorResponse.response));
    }
};

export const updateArea = (id, data) => async dispatch => {
    try {
        dispatch(loading());
        const response = await instance.patch(`/area_reports/${id}`, data);
        const areas = await instance.get(
            `/lga_area/${response.data.data.lgaId}`
        );

        const report = areas.data.data
            .map(area => {
                return JSON.parse(area.report);
            })
            .reduce((prev, cur) => {
                const murder = Math.round(
                    (Number(prev.murder) + Number(cur.murder)) /
                        areas.data.data.length
                );
                const kidnap = Math.round(
                    (Number(prev.kidnap) + Number(cur.kidnap)) /
                        areas.data.data.length
                );
                const armed_robbery = Math.round(
                    (Number(prev.armed_robbery) + Number(cur.armed_robbery)) /
                        areas.data.data.length
                );

                return { murder, kidnap, armed_robbery };
            });

        const rating = areas.data.data
            .map(area => {
                return area.rating;
            })
            .reduce((prev, cur) => prev + cur);

        await instance.patch(`/lga_reports/${response.data.data.lgaId}`, {
            rating: Math.round(rating / areas.data.data.length),
            report: JSON.stringify(report)
        });

        dispatch(updateAreasSuccess(response.data.data));
        toast.success("Area updated successfully");
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(areasFailure(errorResponse.response));
    }
};

export const deleteArea = id => async dispatch => {
    try {
        dispatch(deleteAreaSuccess(id));
        await instance.delete(`/area_reports/${id}`);
    } catch (error) {
        const errorResponse = errorHandler(error);
        dispatch(areasFailure(errorResponse.response));
    }
};

export const getAreas = () => async dispatch => {
    try {
        dispatch(loading());

        const data = await instance.get("/area_reports");
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
