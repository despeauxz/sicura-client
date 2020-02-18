import React from 'react';
import { Header, Sidebar } from '../components';

const ApplicationLayout = props => {
    return (
        <>
            <Header />
            <div className="flex-1 flex overflow-hidden">
                <Sidebar />
                {props.children}
            </div>
        </>
    );
};

export default ApplicationLayout;
