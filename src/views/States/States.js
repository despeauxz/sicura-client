import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput, Spinner } from '../../components';
import { ApplicationLayout } from '../../layouts';
import {
    getStates,
    getState,
    addState,
    deleteState,
    getIncidences,
    sortList
} from '../../redux/actions/states';

class States extends Component {
    state = {
        states: [],
        errors: {},
        selected: null,
        name: '',
        capital: '',
        report: {
            kidnap: 0,
            murder: 0,
            armed_robbery: 0
        },
        view: null,
        order: ''
    };

    componentDidMount() {
        const { getStates, getIncidences } = this.props;
        getStates();
        getIncidences();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.errors !== nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    handleSelected(state) {
        this.setState({
            selected: state,
            view: '',
            name: state.name,
            capital: state.capital
        });
    }

    createView = () => {
        this.setState({ selected: null, view: 'add' });
    };

    handleReportChange = e => {
        const { report } = { ...this.state };
        const currentState = report;
        const { name, value } = e.target;
        currentState[name] = value;
        this.setState({
            report: currentState
        });
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { name, capital, report, errors } = this.state;
        const { addState } = this.props;

        const data = {
            name,
            capital,
            report: JSON.stringify(report),
            rating: 70
        };
        addState(data);
        if (!errors) {
            this.setState({ view: '', name: '', capital: '' });
        }
    };

    deleteItem = () => {
        const { deleteState } = this.props;
        const { selected } = this.state;
        deleteState(selected.id);
        this.setState({ selected: null });
    };

    removeItem = () => {
        this.setState({ selected: null, view: '' });
    };

    sortData = () => {
        const { order } = this.state;
        const { sortList } = this.props;
        if (!order || order === 'desc') {
            this.setState({ order: 'asc' });
            sortList('asc');
        } else {
            this.setState({ order: 'desc' });
            sortList('desc');
        }
    };

    render() {
        const { selected, view, name, capital, report, errors } = this.state;
        const { states, loading } = this.props;

        return (
            <ApplicationLayout>
                <div className="hidden lg:flex flex-col relative z-10 w-full max-w-xs flex-grow flex-shrink-0 border-r bg-gray-300">
                    <div className="flex-shrink-0 px-4 py-2 flex items-center justify-between border-b bg-gray-200">
                        <button className="flex items-center text-xs font-semibold text-gray-600">
                            Sorted by Name
                            <svg
                                viewBox="0 0 24 24"
                                className="ml-1 h-6 w-6 fill-current text-gray-500">
                                <path d="M7.293 9.293a1 1 0 011.414 0L12 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                            </svg>
                        </button>
                        <button onClick={this.sortData}>
                            <svg
                                viewBox="0 0 24 24"
                                className="h-6 w-6 fill-current text-gray-500">
                                <path d="M16 3H3a1 1 0 000 2h13a1 1 0 100-2zm-4 4H3a1 1 0 000 2h9a1 1 0 100-2zm-9 4h6a1 1 0 110 2H3a1 1 0 110-2zm9.293.293l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L18 10.414V20a1 1 0 11-2 0v-9.586l-2.293 2.293a1 1 0 01-1.414-1.414z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="bg-gray-200">
                            <div>
                                <div className="block px-6 pt-3 pb-4">
                                    <div className="flex-col">
                                        <h3 className="mt-4 font-medium">
                                            Locations
                                        </h3>
                                        {states.map((state, index) => {
                                            return (
                                                <div
                                                    className="flex justify-between items-center"
                                                    key={index.toString()}>
                                                    <div className="mt-3">
                                                        <label className="inline-flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox"
                                                                checked={
                                                                    !selected ||
                                                                    selected.id !==
                                                                        state.id
                                                                        ? false
                                                                        : true
                                                                }
                                                                onClick={this.handleSelected.bind(
                                                                    this,
                                                                    state
                                                                )}
                                                            />
                                                            <span className="ml-2 text-sm">
                                                                {state.name}
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col w-0 overflow-hidden h-screen">
                    <div className="relative shadow-md">
                        <div className="flex items-center justify-between px-5 py-4 bg-gray-100 border-b">
                            <div className="flex items-center">
                                <button
                                    onClick={this.removeItem}
                                    aria-label="Go back"
                                    data-balloon-pos="down">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6 fill-current text-gray-600">
                                        <path d="M9.707 3.293a1 1 0 010 1.414L5.414 9H13a9 9 0 019 9v2a1 1 0 11-2 0v-2a7 7 0 00-7-7H5.414l4.293 4.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"></path>
                                    </svg>
                                </button>
                                <button
                                    onClick={this.createView}
                                    className="ml-2"
                                    aria-label="Add State"
                                    data-balloon-pos="down">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6 fill-current text-gray-600">
                                        <path d="M19.707 4.293a1 1 0 00-1.414 0L10 12.586V14h1.414l8.293-8.293a1 1 0 000-1.414zM16.88 2.879A3 3 0 1121.12 7.12l-8.585 8.586a1 1 0 01-.708.293H9a1 1 0 01-1-1v-2.828a1 1 0 01.293-.708l8.586-8.585zM6 6a1 1 0 00-1 1v11a1 1 0 001 1h11a1 1 0 001-1v-5a1 1 0 112 0v5a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h5a1 1 0 110 2H6z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center">
                                {selected && (
                                    <button
                                        onClick={this.deleteItem}
                                        className="mr-2"
                                        aria-label="Delete State"
                                        data-balloon-pos="down">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-6 w-6 fill-current text-gray-500">
                                            <path d="M2 6a3 3 0 013-3h14a3 3 0 011 5.83V18a3 3 0 01-3 3H7a3 3 0 01-3-3V8.83A3.001 3.001 0 012 6zm4 3v9a1 1 0 001 1h10a1 1 0 001-1V9H6zM5 5a1 1 0 000 2h14a1 1 0 100-2H5zm4 7a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z"></path>
                                        </svg>
                                    </button>
                                )}
                                <button>
                                    <svg
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        fill="none"
                                        className="h-6 w-6 text-gray-600">
                                        <path
                                            d="M19 9l-7 7-7-7"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                                <button className="ml-2">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        className="h-6 w-6 text-gray-600">
                                        <path
                                            d="M5 16l7-7 7 7"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto">
                        {!selected && !view && (
                            <div className="flex w-full h-screen justify-center items-center">
                                <h2 className="text-gray-700">
                                    Click list to view State details
                                </h2>
                            </div>
                        )}
                        {!view && selected && (
                            <div style={{ width: '60%' }}>
                                <h2>{selected.name}</h2>

                                <div className="mt-2">
                                    <form>
                                        <div>
                                            <TextInput
                                                type="text"
                                                name="name"
                                                value={name}
                                                handleChange={this.handleChange}
                                                placeholder="Enter State Name"
                                                label="Name"
                                            />
                                        </div>
                                        <div className="mt-1">
                                            <TextInput
                                                type="text"
                                                name="capital"
                                                value={capital}
                                                handleChange={this.handleChange}
                                                placeholder="Enter State Name"
                                                label="Capital"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {view === 'add' && (
                            <div style={{ width: '60%' }}>
                                <h2 className="uppercase mb-4 text-gray-800 font-bold">
                                    Add State
                                </h2>

                                <div className="mt-2">
                                    <form>
                                        <div>
                                            <TextInput
                                                type="text"
                                                name="name"
                                                value={name}
                                                handleChange={this.handleChange}
                                                placeholder="Enter State Name"
                                                label="Name"
                                                error={errors.name}
                                            />
                                        </div>
                                        <div className="mt-1">
                                            <TextInput
                                                type="text"
                                                name="capital"
                                                value={capital}
                                                handleChange={this.handleChange}
                                                placeholder="Enter State Name"
                                                label="Capital"
                                                error={errors.capital}
                                            />
                                        </div>
                                        <div className="w-full text-gray-700 my-2">
                                            <fieldset className="border border-gray-300">
                                                <legend className="text-sm bg-gray-600 rounded text-white py-1 px-2 ml-2">
                                                    Report
                                                </legend>
                                                <div className="w-full flex items-center m-2">
                                                    <h3 className="mr-4">
                                                        Murder
                                                    </h3>
                                                    <TextInput
                                                        type="number"
                                                        name="murder"
                                                        value={report.murder}
                                                        handleChange={
                                                            this
                                                                .handleReportChange
                                                        }
                                                        className="flex-1"
                                                        placeholder="Ratings"
                                                        label=""
                                                        error={errors.rating}
                                                    />
                                                </div>
                                                <div className="w-full flex items-center m-2">
                                                    <h3 className="mr-4">
                                                        Kidnap
                                                    </h3>
                                                    <TextInput
                                                        type="number"
                                                        name="kidnap"
                                                        value={report.kidnap}
                                                        handleChange={
                                                            this
                                                                .handleReportChange
                                                        }
                                                        className="flex-1"
                                                        placeholder="Ratings"
                                                        label=""
                                                        error={errors.rating}
                                                    />
                                                </div>
                                                <div className="w-full flex items-center m-2">
                                                    <h3 className="mr-4">
                                                        Armed Robbery
                                                    </h3>
                                                    <TextInput
                                                        type="number"
                                                        name="armed_robbery"
                                                        value={
                                                            report.armed_robbery
                                                        }
                                                        handleChange={
                                                            this
                                                                .handleReportChange
                                                        }
                                                        className="flex-1"
                                                        placeholder="Ratings"
                                                        label=""
                                                        error={errors.rating}
                                                    />
                                                </div>
                                            </fieldset>
                                        </div>
                                        <button
                                            onClick={this.handleSubmit}
                                            className="w-64 mt-2 bg-teal-400 text-white rounded py-2 rounded-full">
                                            {loading ? (
                                                <Spinner type="circle" />
                                            ) : (
                                                <span>Create</span>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </ApplicationLayout>
        );
    }
}

const mapStateToProps = state => ({
    states: state.states.states,
    loading: state.states.loading,
    incidence: state.states.incidence,
    errors: state.states.errors
});

export default connect(
    mapStateToProps,
    { getStates, getState, addState, deleteState, getIncidences, sortList }
)(States);
