import React, { Component } from 'react';
import instance from '../../config/axios';
import { ApplicationLayout } from '../../layouts';

class Home extends Component {
    state = {
        count: null
    };

    async componentDidMount() {
        const count = await instance.get('/analysis');
        this.setState({ count: count.data.data });
    }

    render() {
        const { count } = this.state;
        if (!count) return null;

        return (
            <ApplicationLayout>
                <main className="flex-1 flex bg-gray-200">
                    <div className="flex-1 flex flex-col w-0 overflow-hidden h-screen w-full items-center mx-auto">
                        <div className="relative flex flex-wrap w-full">
                            <div className="w-1/2 md:w-1/3 lg:w-1/4 flex flex-col p-4 rounded text-center text-gray-700">
                                <div className="bg-white rounded shadow-lg overflow-hidden flex-1 flex-col p-2">
                                    <h3 className="text-lg">States</h3>
                                    <h1 className="text-2xl">
                                        {count.states_count}
                                    </h1>
                                </div>
                            </div>
                            <div className="w-1/2 md:w-1/3 lg:w-1/4 flex flex-col p-4 rounded text-center text-gray-700">
                                <div className="bg-white rounded shadow-lg overflow-hidden flex-1 flex-col p-2">
                                    <h3 className="text-lg">LGAS</h3>
                                    <h1 className="text-2xl">
                                        {count.lgas_count}
                                    </h1>
                                </div>
                            </div>
                            <div className="w-1/2 md:w-1/3 lg:w-1/4 flex flex-col p-4 rounded text-center text-gray-700">
                                <div className="bg-white rounded shadow-lg overflow-hidden flex-1 flex-co p-2">
                                    <h3 className="text-lg">Areas</h3>
                                    <h1 className="text-2xl">
                                        {count.areas_count}
                                    </h1>
                                </div>
                            </div>
                            <div className="w-1/2 md:w-1/3 lg:w-1/4 flex flex-col p-4 rounded text-center text-gray-700">
                                <div className="bg-white rounded shadow-lg overflow-hidden flex-1 flex-col p-2">
                                    <h3 className="text-lg">Streets</h3>
                                    <h1 className="text-2xl">
                                        {count.streets_count}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </ApplicationLayout>
        );
    }
}

export default Home;
