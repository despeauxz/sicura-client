import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { ApplicationLayout } from "../../layouts";
import { TextInput, Spinner } from "../../components";
import {
    getIncidences,
    addIncidence,
    deleteIncidence,
    updateIncidence
} from "../../redux/actions/states";

class Incidences extends Component {
    state = {
        name: "",
        weight: "",
        selected: null,
        view: null,
        order: "",
        errors: {}
    };

    componentDidMount() {
        const { getIncidences } = this.props;
        getIncidences();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.errors !== nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    handleSelected(incidence) {
        this.setState({
            selected: incidence,
            view: "",
            name: incidence.name,
            weight: incidence.weight
        });
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    createView = () => {
        this.setState({ selected: null, view: "add", name: "", weight: "" });
    };

    removeItem = () => {
        this.setState({ selected: null, view: "", name: "", weight: "" });
    };

    handleDropdown(item) {
        this.setState({ active: item });
    }

    handleSubmit = e => {
        e.preventDefault();

        const { name, weight } = this.state;
        const { addIncidence } = this.props;

        const data = {
            name,
            weight
        };
        addIncidence(data);
    };

    handleUpdate(e) {
        e.preventDefault();

        const { name, weight, selected } = this.state;
        const { updateIncidence } = this.props;

        const data = {
            name,
            weight
        };
        updateIncidence(selected.id, data);
    }

    deleteItem = () => {
        const { selected } = this.state;
        const { deleteIncidence } = this.props;
        deleteIncidence(selected.id);
        this.setState({ selected: null });
    };

    sortData = () => {
        const { order } = this.state;
        const { sortList } = this.props;
        if (!order || order === "desc") {
            this.setState({ order: "asc" });
            sortList("asc");
        } else {
            this.setState({ order: "desc" });
            sortList("desc");
        }
    };

    render() {
        const { selected, view, name, weight, errors } = this.state;
        const { incidences, loading } = this.props;

        return (
            <ApplicationLayout>
                <div className="hidden lg:flex flex-col relative z-10 w-full max-w-xs flex-grow flex-shrink-0 border-r bg-gray-300">
                    {/* <div className="flex-shrink-0 px-4 py-2 flex items-center justify-between border-b bg-gray-200">
                        <button className="flex items-center text-xs font-semibold text-gray-600">
                            Sorted by Name
                            <svg
                                viewBox="0 0 24 24"
                                className="ml-1 h-6 w-6 fill-current text-gray-500">
                                <path d="M7.293 9.293a1 1 0 011.414 0L12 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                            </svg>
                        </button>
                        <button>
                            <svg
                                viewBox="0 0 24 24"
                                className="h-6 w-6 fill-current text-gray-500">
                                <path d="M16 3H3a1 1 0 000 2h13a1 1 0 100-2zm-4 4H3a1 1 0 000 2h9a1 1 0 100-2zm-9 4h6a1 1 0 110 2H3a1 1 0 110-2zm9.293.293l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L18 10.414V20a1 1 0 11-2 0v-9.586l-2.293 2.293a1 1 0 01-1.414-1.414z"></path>
                            </svg>
                        </button>
                    </div> */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="bg-gray-200">
                            <div>
                                <div className="block px-6 pt-3 pb-4">
                                    <div className="flex-col">
                                        <h3 className="mt-4 font-medium">
                                            Locations
                                        </h3>
                                        {incidences.map((incidence, index) => {
                                            return (
                                                <div
                                                    className="flex justify-between items-center"
                                                    key={index.toString()}>
                                                    <div className="mt-3">
                                                        <button
                                                            onClick={this.handleSelected.bind(
                                                                this,
                                                                incidence
                                                            )}
                                                            className={classnames(
                                                                "inline-flex items-center text-sm outline-none",
                                                                {
                                                                    "font-bold":
                                                                        !selected ||
                                                                        selected.id !==
                                                                            incidence.id
                                                                            ? false
                                                                            : true
                                                                }
                                                            )}>
                                                            <span className="">
                                                                {incidence.name}
                                                            </span>
                                                        </button>
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
                                    aria-label="Add Incidence"
                                    data-balloon-pos="down">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 64 64"
                                        width="30px"
                                        height="30px">
                                        <linearGradient
                                            id="KJ7ka9GQp0CHqT_2YsWMsa"
                                            x1="32"
                                            x2="32"
                                            y1="5.75"
                                            y2="59.005"
                                            gradientUnits="userSpaceOnUse"
                                            spreadMethod="reflect">
                                            <stop
                                                offset="0"
                                                stop-color="#718096"
                                            />
                                            <stop
                                                offset="1"
                                                stop-color="#718096"
                                            />
                                        </linearGradient>
                                        <path
                                            fill="url(#KJ7ka9GQp0CHqT_2YsWMsa)"
                                            d="M32,58C17.663,58,6,46.337,6,32S17.663,6,32,6s26,11.663,26,26S46.337,58,32,58z M32,8 C18.767,8,8,18.767,8,32s10.767,24,24,24s24-10.767,24-24S45.233,8,32,8z"
                                        />
                                        <linearGradient
                                            id="KJ7ka9GQp0CHqT_2YsWMsb"
                                            x1="32"
                                            x2="32"
                                            y1="5.75"
                                            y2="59.005"
                                            gradientUnits="userSpaceOnUse"
                                            spreadMethod="reflect">
                                            <stop
                                                offset="0"
                                                stop-color="#718096"
                                            />
                                            <stop
                                                offset="1"
                                                stop-color="#718096"
                                            />
                                        </linearGradient>
                                        <path
                                            fill="url(#KJ7ka9GQp0CHqT_2YsWMsb)"
                                            d="M32,52c-11.028,0-20-8.972-20-20s8.972-20,20-20s20,8.972,20,20S43.028,52,32,52z M32,14 c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S41.925,14,32,14z"
                                        />
                                        <linearGradient
                                            id="KJ7ka9GQp0CHqT_2YsWMsc"
                                            x1="32"
                                            x2="32"
                                            y1="21.75"
                                            y2="42.538"
                                            gradientUnits="userSpaceOnUse"
                                            spreadMethod="reflect">
                                            <stop
                                                offset="0"
                                                stop-color="#718096"
                                            />
                                            <stop
                                                offset="1"
                                                stop-color="#718096"
                                            />
                                        </linearGradient>
                                        <path
                                            fill="url(#KJ7ka9GQp0CHqT_2YsWMsc)"
                                            d="M41,30h-7v-7c0-0.552-0.448-1-1-1h-2c-0.552,0-1,0.448-1,1v7h-7c-0.552,0-1,0.448-1,1v2 c0,0.552,0.448,1,1,1h7v7c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-7h7c0.552,0,1-0.448,1-1v-2C42,30.448,41.552,30,41,30z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center">
                                {selected && !view && (
                                    <button
                                        onClick={this.deleteItem}
                                        className="mr-2"
                                        aria-label="Delete Incidence"
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
                                    Click list to view Incidence details
                                </h2>
                            </div>
                        )}

                        {!view && selected && (
                            <div style={{ width: "60%" }}>
                                <h2>{selected.name}</h2>

                                <div className="mt-2">
                                    <form
                                        onSubmit={this.handleUpdate.bind(this)}>
                                        <div>
                                            <TextInput
                                                type="text"
                                                name="name"
                                                value={name}
                                                handleChange={this.handleChange}
                                                placeholder="Enter Incidence"
                                                label="Name"
                                            />
                                        </div>
                                        <div>
                                            <TextInput
                                                type="number"
                                                name="weight"
                                                value={weight}
                                                handleChange={this.handleChange}
                                                placeholder="Enter Weight"
                                                label="Weight"
                                            />
                                        </div>
                                        <button
                                            onClick={this.handleUpdate.bind(
                                                this
                                            )}
                                            className="w-64 mt-2 bg-teal-400 text-white rounded py-2 rounded-full">
                                            {loading ? (
                                                <Spinner type="circle" />
                                            ) : (
                                                <span>Update</span>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {view === "add" && (
                            <div style={{ width: "60%" }}>
                                <h2 className="uppercase mb-4 text-gray-800 font-bold">
                                    Add Incidence
                                </h2>

                                <div className="mt-2">
                                    <form>
                                        <div>
                                            <TextInput
                                                type="text"
                                                name="name"
                                                value={name}
                                                handleChange={this.handleChange}
                                                placeholder="Enter Incidence"
                                                label="Name"
                                                error={errors.name}
                                            />
                                        </div>
                                        <div>
                                            <TextInput
                                                type="number"
                                                name="weight"
                                                value={weight}
                                                handleChange={this.handleChange}
                                                placeholder="Enter Weight"
                                                label="Weight"
                                                error={errors.weight}
                                            />
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
    incidences: state.states.incidence,
    loading: state.states.loading,
    errors: state.states.errors
});

export default connect(
    mapStateToProps,
    { getIncidences, addIncidence, deleteIncidence, updateIncidence }
)(Incidences);
