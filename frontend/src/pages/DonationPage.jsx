import React, { useState } from 'react';
import NGOCard from "../components/body/NGOCard";
import ngosData from "./ngos.jsx";  // Importing the data from ngos.jsx

const DonationPage = () => {
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
      <h2>Donate to NGOs</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for NGOs..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Display NGOs List */}
      <div className="ngo-list">
        {filteredNGOs.length > 0 ? (
          filteredNGOs.map((ngo, index) => (
            <NGOCard key={index} ngo={ngo} />
          ))
        ) : (
          <p>No NGOs found.</p>
        )}
      </div>
    </div>
  );
};

export default DonationPage;
