import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSidebar } from '../../redux/actions/ui';
import './index.scss';

class Header extends Component {
    toggleSidebar = () => {
        const { toggle, toggleSidebar } = this.props;
        toggleSidebar(!toggle);
    };

    render() {
        return (
            <header className="flex flex-shrink-0">
                <div className="flex-shrink-0 px-4 py-3 bg-gray-700 lg:w-64 lg:bg-gray-800">
                    <button
                        className="block text-gray-400 hover:text-gray-200 sm:hidden outline-none"
                        onClick={this.toggleSidebar}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6">
                            <path d="M3 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM4 17a1 1 0 100 2h7a1 1 0 100-2H4z"></path>
                        </svg>
                    </button>
                    <button className="hidden sm:flex sm:items-center sm:w-full outline-none">
                        <img
                            src="/logo.png"
                            alt=""
                            className="h-8 w-16 object-cover mx-auto text-center"
                        />
                    </button>
                </div>
                <div className="flex-1 flex items-center justify-between pl-2 pr-6 bg-gray-700 lg:px-6">
                    <nav className="hidden sm:flex">
                        <Link
                            to="/"
                            className="inline-block px-3 py-2 bg-gray-800 rounded-lg leading-none text-sm font-medium text-white">
                            Home
                        </Link>
                        <Link
                            to="/admin"
                            className="ml-2 inline-block px-3 py-2 rounded-lg leading-none text-sm font-medium text-white hover:bg-gray-600">
                            Admin
                        </Link>

                    </nav>
                    <div className="ml-auto flex items-center">
                        <button className="lg:hidden ml-5 text-gray-400 hover:text-gray-200">
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5 fill-current">
                                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                            </svg>
                        </button>
                        <div className="hidden lg:block relative w-64">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-current text-gray-500">
                                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                                </svg>
                            </span>
                            <input
                                placeholder="Search"
                                className="block pl-8 pr-4 py-2 w-full bg-gray-800 rounded-lg text-sm placeholder-gray-400 text-white focus:bg-white focus:placeholder-gray-600 focus:text-gray-900 focus:outline-none"
                            />
                        </div>
                        <button className="ml-5 text-gray-400 hover:text-gray-200">
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5 fill-current">
                                <path d="M9.018 4.665a3 3 0 015.964 0A7 7 0 0119 11v3.159c0 .273.109.535.302.729l1.405 1.405A1 1 0 0120 18H4a1 1 0 01-.707-1.707l1.405-1.405c.193-.194.302-.456.302-.73V11a7 7 0 014.018-6.335zM12 4a1 1 0 00-1 1v1.049l-.667.235A5.002 5.002 0 007 11v3.159c0 .669-.221 1.315-.623 1.841h11.246A3.032 3.032 0 0117 14.159V11a5.002 5.002 0 00-3.333-4.716L13 6.05V5a1 1 0 00-1-1zM10 18a2 2 0 004 0h2a4 4 0 11-8 0h2z"></path>
                            </svg>
                        </button>
                        <Link to="#">
                            <img
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=144&amp;h=144&amp;q=80"
                                alt="Berry"
                                className="ml-4 w-9 h-8 rounded-full"
                            />
                        </Link>
                        <button className="ml-4 text-gray-400 hover:text-gray-200">
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5 fill-current">
                                <path d="M12 18a1 1 0 100-2 1 1 0 000 2z"></path>
                                <path d="M12 4a8 8 0 100 16 8 8 0 000-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z"></path>
                                <path d="M12 8c-1.472 0-2.528.706-2.868 1.426a1 1 0 01-1.809-.852C8.082 6.964 9.99 6 12 6c1.3 0 2.515.394 3.428 1.079C16.343 7.764 17 8.786 17 10c0 2.07-1.834 3.508-3.817 3.889a.31.31 0 00-.162.083A.107.107 0 0013 14a1 1 0 01-2 0c0-1.142.909-1.904 1.805-2.075C14.279 11.642 15 10.729 15 10c0-.443-.237-.92-.771-1.321C13.694 8.278 12.909 8 12 8z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    toggle: state.ui.toggle
});

export default connect(
    mapStateToProps,
    { toggleSidebar }
)(Header);
