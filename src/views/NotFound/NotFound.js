import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div className="h-screen- w-screen">
                <div className="flex justify-center items-center">
                    <img
                        src="/404.png"
                        alt="404"
                        className="relative h-screen w-screen"
                    />
                    <Link
                        to="/"
                        className="bg-gray-300 px-4 py-2 rounded-full text-gray-700"
                        style={{ position: 'absolute', bottom: '10%' }}>
                        Click here to go Home
                    </Link>
                </div>
            </div>
        );
    }
}

export default NotFound;
