import React, { Fragment } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './Routes';

/**
 * Represents the App Component
 * @returns {component} App
 */
const App = () => {
    return (
        <Fragment>
            <ToastContainer transition={Slide} hideProgressBar />
            <Routes />
        </Fragment>
    );
};

export default App;
