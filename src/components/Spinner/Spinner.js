import React from 'react';
import './index.scss';

const Spinner = ({ type }) => {
    switch (type) {
        case 'circle':
            return <div className="sp sp-circle"></div>;
        case '3balls':
            return <div className="sp sp-3balls"></div>;
        case 'volume':
            return <div className="sp sp-volume"></div>;
        case 'vortex':
            return <div className="sp sp-vortex"></div>;
        case 'slices':
            return <div className="sp sp-slices"></div>;
        case 'sphere':
            return <div className="sp sp-sphere"></div>;
        case 'bars':
            return <div className="sp sp-bars"></div>;
        case 'clock':
            return <div className="sp sp-clock"></div>;
        case 'wave':
            return <div className="sp sp-wave"></div>;
        case 'texture':
            return <div className="sp sp-texture"></div>;
        case 'loadbar':
            return <div className="sp sp-loadbar"></div>;
        case 'hydrogen':
            return <div className="sp sp-hydrogen"></div>;
        default:
            return null;
    }
};

export default Spinner;
