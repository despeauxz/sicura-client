import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { auth } from '../../redux/actions/auth';
import { Spinner } from '../../components';
import './index.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.errors !== nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;

        const user = { email, password };
        this.props.auth(user);
    };

    render() {
        const { email, password, errors } = this.state;
        const { loading, authenticated } = this.props;

        if (authenticated) {
            return <Redirect to="/admin" />;
        }

        return (
            <div className="flex font-sans antialiased justify-center items-center h-screen w-screen bg-gray-200">
                <div className="auth__wrapper mx-auto text-gray-700">
                    <div>
                        <div className="w-8 h-2 rounded-full bg-teal-400" />
                        <h3 className="text-2xl text-gray-800 font-semibold mb-4">
                            Login to Admin Portal
                        </h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-2">
                                <label className="block">
                                    <span className="text-gray-700">
                                        Email Address
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        className={classnames(
                                            'form-input mt-1 block w-full',
                                            {
                                                'border-red-500': errors.email
                                            }
                                        )}
                                        placeholder="example@email.com"
                                        onChange={this.handleChange}
                                    />
                                </label>
                                {errors.email && (
                                    <span className="text-xs text-red-500">
                                        {errors.email.msg}
                                    </span>
                                )}
                            </div>
                            <div className="mb-2">
                                <label className="block">
                                    <span className="text-gray-700">
                                        Password
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        className={classnames(
                                            'form-input mt-1 block w-full',
                                            {
                                                'border-red-500':
                                                    errors.password
                                            }
                                        )}
                                        placeholder="***********"
                                        onChange={this.handleChange}
                                    />
                                </label>
                                {errors.password && (
                                    <span className="text-xs text-red-500">
                                        {errors.password.msg}
                                    </span>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="bg-teal-400 rounded-full py-2 text-center text-white w-full mt-2 font-medium outline-none">
                                {loading ? (
                                    <Spinner type="circle" />
                                ) : (
                                    <span>Login</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.auth.errors,
    loading: state.auth.loading,
    authenticated: state.auth.authenticated
});

export default connect(
    mapStateToProps,
    { auth }
)(Login);
