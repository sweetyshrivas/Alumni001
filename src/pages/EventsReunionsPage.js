import React, { useState, useEffect } from 'react';
import './EventsReunionsPage.css'; // Import CSS for styling
import { fetchEvents } from '../services/eventsService'; // Example service

const EventsReunionsPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('Upcoming');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10; // Changed from state to a constant
  const [sortedEvents, setSortedEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    const applyFiltersAndSort = () => {
      let results = events;

      if (searchQuery) {
        results = results.filter(event =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory !== 'All') {
        results = results.filter(event => event.category === selectedCategory);
      }

      if (sortOrder === 'Upcoming') {
        results = results.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else {
        results = results.sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      setSortedEvents(results);
      setTotalPages(Math.ceil(results.length / eventsPerPage));
    };

    applyFiltersAndSort();
  }, [searchQuery, selectedCategory, sortOrder, events, eventsPerPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div className="events-reunions">
      <h1>Events & Reunions</h1>
      <div className="events-controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
          <option value="All">All Categories</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Networking">Networking</option>
          <option value="Webinar">Webinar</option>
          {/* Add more categories as needed */}
        </select>
        <select value={sortOrder} onChange={handleSortChange} className="sort-select">
          <option value="Upcoming">Upcoming Events</option>
          <option value="Past">Past Events</option>
        </select>
      </div>
      <div className="events-list">
        {currentEvents.length > 0 ? (
          currentEvents.map(event => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-content">
                <h2>{event.title}</h2>
                <p className="event-category">{event.category}</p>
                <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                <p className="event-description">{event.description}</p>
                <a href={event.link} target="_blank" rel="noopener noreferrer" className="event-link">More Info</a>
              </div>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
      <div className="pagination">
        {[...Array(totalPages).keys()].map(page => (
          <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={`pagination-button ${currentPage === page + 1 ? 'active' : ''}`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventsReunionsPage;
