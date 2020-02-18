import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Spinner } from '../components';

/**
 * @function Authenticator
 * @param {object} props
 * @return {JSX} - MyComponent|Preloader|Redirect
 */
const Authenticator = props => {
    const { MyComponent, authenticating, isAuthenticated, location } = props;

    return (
        <Fragment>
            {authenticating && (
                <div className="flex w-full h-screen items-center justify-center bg-gray-200">
                    <Spinner type="circle" />
                </div>
            )}
            {!authenticating && isAuthenticated && <MyComponent {...props} />}
            {!authenticating && !isAuthenticated && (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: location }
                    }}
                />
            )}
        </Fragment>
    );
};

Authenticator.propTypes = {
    authenticating: PropTypes.bool,
    isAuthenticated: PropTypes.bool
};

export default Authenticator;
