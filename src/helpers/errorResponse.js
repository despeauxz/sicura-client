const errorResponse = err => {
    switch (err.response.data.status) {
        case 400:
            return err.response.data.errors || err.response.data.error;
        case 401:
        case 403:
        case 404:
        case 409:
            return err.response.data.error;
        case 500:
            return 'Something happened, please check your connection and try again';
        default:
            return err.response.statusText;
    }
};

export default errorResponse;
