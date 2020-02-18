import { connect } from 'react-redux';
import Authenticator from '../../HOC/Authenticator';

/**
 * Authenticates User
 * @function Authenticator
 * @param {JSX} MyComponent - Dynamic
 * @return {JSX} ConnectedComponent
 */
export default MyComponent => {
    const mapStateToProps = state => ({
        isAuthenticated: state.auth.authenticated,
        authenticating: state.auth.loading,
        user: state.auth.user,
        MyComponent
    });

    return connect(mapStateToProps)(Authenticator);
};
