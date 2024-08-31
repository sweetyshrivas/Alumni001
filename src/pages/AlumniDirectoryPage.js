import React, { useState, useEffect } from 'react';
import './AlumniDirectoryPage.css'; // Import CSS for styling
import { fetchAlumni } from '../services/alumniService'; // Example service

const AlumniDirectoryPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [filteredAlumni, setFilteredAlumni] = useState([]);

  useEffect(() => {
    const loadAlumni = async () => {
      try {
        const data = await fetchAlumni();
        setAlumni(data);
        setFilteredAlumni(data);
      } catch (error) {
        console.error('Error fetching alumni:', error);
      }
    };

    loadAlumni();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let results = alumni;

      if (searchQuery) {
        results = results.filter(alumnus =>
          alumnus.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedFilter !== 'All') {
        results = results.filter(alumnus => alumnus.field === selectedFilter);
      }

      setFilteredAlumni(results);
    };

    applyFilters();
  }, [searchQuery, selectedFilter, alumni]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div className="alumni-directory">
      <h1>Alumni Directory</h1>
      <div className="directory-controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select value={selectedFilter} onChange={handleFilterChange} className="filter-select">
          <option value="All">All Fields</option>
          <option value="Engineering">Engineering</option>
          <option value="Business">Business</option>
          <option value="Arts">Arts</option>
          <option value="Science">Science</option>
          {/* Add more filters as needed */}
        </select>
      </div>
      <div className="alumni-list">
        {filteredAlumni.length > 0 ? (
          filteredAlumni.map(alumnus => (
            <div key={alumnus.id} className="alumnus-card">
              <img src={alumnus.profilePicture} alt={alumnus.name} className="alumnus-picture" />
              <div className="alumnus-info">
                <h2>{alumnus.name}</h2>
                <p className="field">{alumnus.field}</p>
                <p className="graduation-year">{alumnus.graduationYear}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-alumni">No alumni found.</p>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectoryPage;