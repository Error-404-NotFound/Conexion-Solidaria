import React, { useState } from 'react';
import NGOCard from "../components/body/NGOCard";
import ngosData from "./NGOData.jsx";  // Importing the data from ngos.jsx

export const DonationPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNGOs, setFilteredNGOs] = useState(ngosData);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = ngosData.filter((ngo) => {
            const name = ngo.name.toLowerCase();
            const description = ngo.description.toLowerCase();
            const location = ngo.location.toLowerCase();

            return name.includes(query) || description.includes(query) || location.includes(query);
        });

        setFilteredNGOs(filtered);
    };

    return (
        <div className="donation-page-container">
            <h2 className='mt-2 text-2xl dark:text-gray-200'>Donate to NGOs</h2>

            {/* Search Bar */}
            <div className="search-bar dark:bg-gray-600 dark:text-gray-200">
                <label htmlFor="search" className="search-label mr-2 font-bold">Search:</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search for NGOs..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input text-gray-900"
                />
            </div>

            {/* Display NGOs List */}
            <div className="ngo-list">
                {filteredNGOs.length > 0 ? (
                    filteredNGOs.map((ngo, index) => (
                        <NGOCard key={index} ngo={ngo} />
                    ))
                ) : (
                    <p className='text-red-600 m-4 text-center font-bold text-2xl'>No NGOs found.</p>
                )}
            </div>
        </div>
    );
};