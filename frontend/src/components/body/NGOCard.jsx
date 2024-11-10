import React from 'react';

const NGOCard = ({ ngo }) => {
    const { name, description, location, donationUrl } = ngo;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500 text-gray-900 dark:text-gray-100 font-sans transition-all ease-in-out duration-500 pt-0">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full dark:bg-gray-950 dark:text-white transform transition-all duration-700 hover:scale-105">
                <h3 className="text-3xl font-bold mb-4 text-center text-indigo-600 dark:text-indigo-400">{name}</h3>
                <p className="mb-4">{description}</p>
                <p><strong>Location:</strong> {location}</p>
                <a href={donationUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 dark:bg-indigo-400 dark:hover:bg-indigo-500">
                    Donate Now
                </a>
            </div>
        </div>
    );
};

export default NGOCard;