import React, { useState, useEffect } from 'react';
import './SuccessStoriesPage.css'; // Import CSS for styling
import { fetchSuccessStories } from '../services/storiesService'; // Example service

const SuccessStoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortedStories, setSortedStories] = useState([]);
  const [sortOrder, setSortOrder] = useState('Newest');

  useEffect(() => {
    const loadStories = async () => {
      try {
        const data = await fetchSuccessStories();
        setStories(data);
        setSortedStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    loadStories();
  }, []);

  useEffect(() => {
    const applyFiltersAndSort = () => {
      let results = stories;

      if (searchQuery) {
        results = results.filter(story =>
          story.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory !== 'All') {
        results = results.filter(story => story.category === selectedCategory);
      }

      if (sortOrder === 'Newest') {
        results = results.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else {
        results = results.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      setSortedStories(results);
    };

    applyFiltersAndSort();
  }, [searchQuery, selectedCategory, sortOrder, stories]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="success-stories">
      <h1>Success Stories</h1>
      <div className="stories-controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
          <option value="All">All Categories</option>
          <option value="Entrepreneurship">Entrepreneurship</option>
          <option value="Innovation">Innovation</option>
          <option value="Leadership">Leadership</option>
          <option value="Community">Community</option>
          {/* Add more categories as needed */}
        </select>
        <select value={sortOrder} onChange={handleSortChange} className="sort-select">
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>
      <div className="stories-list">
        {sortedStories.length > 0 ? (
          sortedStories.map(story => (
            <div key={story.id} className="story-card">
              <img src={story.image} alt={story.title} className="story-image" />
              <div className="story-content">
                <h2>{story.title}</h2>
                <p className="story-category">{story.category}</p>
                <p className="story-date">{new Date(story.date).toLocaleDateString()}</p>
                <p className="story-description">{story.description}</p>
                <a href={story.link} target="_blank" rel="noopener noreferrer" className="story-link">Read More</a>
              </div>
            </div>
          ))
        ) : (
          <p>No stories found.</p>
        )}
      </div>
    </div>
  );
};

export default SuccessStoriesPage;