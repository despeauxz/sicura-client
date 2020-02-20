import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { toggleSidebar } from '../../redux/actions/ui';
import { logout } from '../../redux/actions/auth';
import './index.scss';

class Sidebar extends Component {
    toggleSidebar = () => {
        const { toggle, toggleSidebar } = this.props;
        toggleSidebar(!toggle);
    };

    logoutUser = () => {
        this.props.logout();
    };

    render() {
        const {
            toggle,
            user,
            location: { pathname }
        } = this.props;

        return (
            <div
                className={classnames(
                    'z-30 fixed sidebar inset-y-0 left-0 overflow-y-fixed bg-gray-100 border-r sm:static sm:block ease-in sm:translate-x-0 sm:transition-none',
                    {
                        'translate-x-30 ease-out transition-slow': toggle,
                        '-translate-x-full ease-in transition-medium': !toggle
                    }
                )}>
                <div className="absolute top-0 left-0 pl-4 pt-3 sm:hidden">
                    <button
                        className="block text-gray-600 hover:text-gray-800 outline-none"
                        onClick={this.toggleSidebar}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6">
                            <path d="M17.293 18.707a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 00-1.414-1.414L12 10.586 6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 101.414 1.414L12 13.414l5.293 5.293z"></path>
                        </svg>
                    </button>
                </div>
                <nav className="mt-16 sm:mt-0">
                    <div className="px-6 sm:hidden">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="w-24 h-10 mx-auto"
                        />
                    </div>
                    <div className="mt-8 px-6">
                        <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Actions
                        </h2>
                        <div className="mt-3">
                            <Link
                                to="/admin"
                                className={classnames(
                                    '-mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium rounded-lg',
                                    {
                                        'bg-gray-200': pathname === '/admin'
                                    }
                                )}>
                                <span className="inline-flex">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6 fill-current text-gray-700">
                                        <path d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm3-1a1 1 0 00-1 1v6h1.586A2 2 0 018 12.586L10.414 15h3.172L16 12.586A2 2 0 0117.414 12H19V6a1 1 0 00-1-1H6zm13 9h-1.586L15 16.414a2 2 0 01-1.414.586h-3.172A2 2 0 019 16.414L6.586 14H5v4a1 1 0 001 1h12a1 1 0 001-1v-4z"></path>
                                    </svg>
                                    <span className="ml-2 text-gray-900">
                                        Home
                                    </span>
                                </span>
                            </Link>
                            <Link
                                to="/states"
                                className={classnames(
                                    'mt-2 -mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium rounded-lg',
                                    {
                                        'bg-gray-200': pathname === '/states'
                                    }
                                )}>
                                <span className="inline-flex">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6 fill-current text-gray-500">
                                        <path d="M19.707 4.293a1 1 0 00-1.414 0L10 12.586V14h1.414l8.293-8.293a1 1 0 000-1.414zM16.88 2.879A3 3 0 1121.12 7.12l-8.585 8.586a1 1 0 01-.708.293H9a1 1 0 01-1-1v-2.828a1 1 0 01.293-.708l8.586-8.585zM6 6a1 1 0 00-1 1v11a1 1 0 001 1h11a1 1 0 001-1v-5a1 1 0 112 0v5a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h5a1 1 0 110 2H6z"></path>
                                    </svg>
                                    <span className="ml-2 text-gray-700">
                                        States
                                    </span>
                                </span>
                            </Link>
                            <Link
                                to="/lgas"
                                className={classnames(
                                    'mt-2 -mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium rounded-lg',
                                    {
                                        'bg-gray-200': pathname === '/lgas'
                                    }
                                )}>
                                <span className="inline-flex">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6 fill-current text-gray-500">
                                        <path d="M12 4a8 8 0 00-6.598 12.526A14.943 14.943 0 0112 15c2.366 0 4.606.548 6.598 1.526A8 8 0 0012 4zm5.199 14.08A12.954 12.954 0 0012 17c-1.85 0-3.607.386-5.199 1.08A7.968 7.968 0 0012 20c1.985 0 3.8-.723 5.199-1.92zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-4a2 2 0 100 4 2 2 0 000-4zm-4 2a4 4 0 118 0 4 4 0 01-8 0z"></path>
                                    </svg>
                                    <span className="ml-2 text-gray-700">
                                        LGA
                                    </span>
                                </span>
                            </Link>
                            <Link
                                to="/areas"
                                className={classnames(
                                    'mt-2 -mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium rounded-lg',
                                    {
                                        'bg-gray-200': pathname === '/areas'
                                    }
                                )}>
                                <span className="inline-flex">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6 fill-current text-gray-500">
                                        <path d="M5 4a1 1 0 00-1 1v9.17c.313-.11.65-.17 1-.17h6.5a1 1 0 01.707.293l.707.707h6.468l-2.276-4.553a1 1 0 010-.894L19.382 5H13v4a1 1 0 11-2 0V4H5zm7.914-1H21a1 1 0 01.894 1.447L19.118 10l2.776 5.553A1 1 0 0121 17h-8.5a1 1 0 01-.707-.293L11.086 16H5a1 1 0 00-1 1v4a1 1 0 11-2 0V5a3 3 0 013-3h6.5a1 1 0 01.707.293l.707.707z"></path>
                                    </svg>
                                    <span className="ml-2 text-gray-700">
                                        Areas
                                    </span>
                                </span>
                            </Link>
                            <Link
                                to="/streets"
                                className={classnames(
                                    'mt-2 -mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium rounded-lg',
                                    {
                                        'bg-gray-200': pathname === '/streets'
                                    }
                                )}>
                                <span className="inline-flex">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6 fill-current text-gray-500">
                                        <path d="M2 6a3 3 0 013-3h14a3 3 0 011 5.83V18a3 3 0 01-3 3H7a3 3 0 01-3-3V8.83A3.001 3.001 0 012 6zm4 3v9a1 1 0 001 1h10a1 1 0 001-1V9H6zM5 5a1 1 0 000 2h14a1 1 0 100-2H5zm4 7a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z"></path>
                                    </svg>
                                    <span className="ml-2 text-gray-700">
                                        Streets
                                    </span>
                                </span>
                            </Link>
                            <Link
                                to="/incidences"
                                className={classnames(
                                    'mt-2 -mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium rounded-lg',
                                    {
                                        'bg-gray-200': pathname === '/incidences'
                                    }
                                )}>
                                <span className="inline-flex">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6 fill-current text-gray-500">
                                        <path d="M12 4a8 8 0 100 16 8 8 0 000-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm13.707-2.707a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L11 12.586l3.293-3.293a1 1 0 011.414 0z"></path>
                                    </svg>
                                    <span className="ml-2 text-gray-700">
                                        Incidences
                                    </span>
                                </span>
                            </Link>
                            <Link
                                to="/settings"
                                className={classnames(
                                    'mt-2 -mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium rounded-lg',
                                    {
                                        'bg-gray-200': pathname === '/settings'
                                    }
                                )}>
                                <span className="inline-flex">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6 fill-current text-gray-500">
                                        <path d="M12 4a8 8 0 100 16 8 8 0 000-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm13.707-2.707a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L11 12.586l3.293-3.293a1 1 0 011.414 0z"></path>
                                    </svg>
                                    <span className="ml-2 text-gray-700">
                                        Settings
                                    </span>
                                </span>
                            </Link>
                        </div>
                        <h2 className="mt-8 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Extra
                        </h2>
                        <div className="mt-4">
                            <Link
                                to="#"
                                className="mt-4 block text-sm font-medium text-gray-700">
                                FAQ
                            </Link>
                        </div>
                        <div className="mt-4">
                            <Link
                                to="#"
                                onClick={this.logoutUser}
                                className="mt-4 block text-sm font-medium text-gray-700">
                                Logout
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 p-6 border-t sm:hidden">
                        <div className="flex items-center">
                            <img
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=144&amp;h=144&amp;q=80"
                                alt=""
                                className="h-8 w-8 rounded-full object-cover"
                            />
                            <span className="ml-4 mr-2 text-sm font-medium text-gray-800">
                                {user.firstname} {user.lastname}
                            </span>
                        </div>
                        <div className="mt-4">
                            <Link
                                to="#"
                                className="block text-sm font-medium text-gray-700">
                                Settings
                            </Link>
                            <Link
                                to="#"
                                onClick={this.logoutUser}
                                className="mt-4 block text-sm font-medium text-gray-700">
                                Log out
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    toggle: state.ui.toggle,
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    { toggleSidebar, logout }
)(withRouter(Sidebar));
