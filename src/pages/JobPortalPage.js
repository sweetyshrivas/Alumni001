// src/pages/JobPortalPage.js

import React, { useState, useEffect } from 'react';
import {
  Container,
  ListGroup,
  Spinner,
  Alert,
  Button,
  Form,
  Row,
  Col,
  Pagination,
  Modal,
  Badge,
} from 'react-bootstrap';
import {
  getJobs,
  applyForJob,
  getCategories,
  saveJob,
  getSavedJobs,
} from '../services/jobService';
import './JobPortalPage.css'; // Custom styles for JobPortalPage

const JobPortalPage = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('date');
  const [showJobModal, setShowJobModal] = useState(false);
  const [currentJobDetails, setCurrentJobDetails] = useState(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    jobType: '',
    location: '',
    remote: false,
  });

  useEffect(() => {
    document.title = 'Alumni Platform - Job Portal';
    fetchJobs();
    fetchCategories();
    fetchSavedJobs();
  }, [currentCategory, sortBy, filterOptions]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const jobList = await getJobs(currentCategory);
      const sortedJobs = sortJobs(jobList, sortBy);
      setJobs(sortedJobs);
    } catch (error) {
      setError('Failed to load jobs.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoryList = await getCategories();
      setCategories(categoryList);
    } catch (error) {
      setError('Failed to load categories.');
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const savedJobList = await getSavedJobs();
      setSavedJobs(savedJobList);
    } catch (error) {
      setError('Failed to load saved jobs.');
    }
  };

  const sortJobs = (jobList, criterion) => {
    switch (criterion) {
      case 'date':
        return jobList.sort(
          (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
        );
      case 'company':
        return jobList.sort((a, b) =>
          a.company.localeCompare(b.company)
        );
      case 'relevance':
        return jobList; // Assuming the default order is by relevance
      default:
        return jobList;
    }
  };

  const handleApply = async (jobId) => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await applyForJob(jobId);
      setSuccess('Successfully applied for the job.');
    } catch (error) {
      setError('Failed to apply for the job.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async (jobId) => {
    try {
      await saveJob(jobId);
      fetchSavedJobs();
      setSuccess('Job saved successfully.');
    } catch (error) {
      setError('Failed to save job.');
    }
  };

  const handleBookmarkJob = (jobId) => {
    if (!bookmarkedJobs.includes(jobId)) {
      setBookmarkedJobs([...bookmarkedJobs, jobId]);
      setSuccess('Job bookmarked.');
    } else {
      setError('Job already bookmarked.');
    }
  };

  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFilterOptions((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const filteredJobs = jobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((job) => {
      if (filterOptions.jobType && job.type !== filterOptions.jobType) {
        return false;
      }
      if (filterOptions.location && job.location !== filterOptions.location) {
        return false;
      }
      if (filterOptions.remote && !job.remote) {
        return false;
      }
      return true;
    });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleJobClick = (job) => {
    setCurrentJobDetails(job);
    setShowJobModal(true);
  };

  const closeJobModal = () => setShowJobModal(false);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading job opportunities...</p>
      </Container>
    );
  }

  return (
    <Container className="job-portal-container mt-5">
      <h2 className="text-center">Job Opportunities</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Filter and Sort Options */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Control
            as="select"
            onChange={handleCategoryChange}
            value={currentCategory}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col md={3}>
          <Form.Control as="select" onChange={handleSortChange} value={sortBy}>
            <option value="date">Sort by Date</option>
            <option value="company">Sort by Company</option>
            <option value="relevance">Sort by Relevance</option>
          </Form.Control>
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={3}>
          <Form.Check
            type="checkbox"
            label="Remote Only"
            name="remote"
            checked={filterOptions.remote}
            onChange={handleFilterChange}
          />
        </Col>
      </Row>

      {/* Job List */}
      <ListGroup className="mt-4">
        {currentJobs.map((job) => (
          <ListGroup.Item
            key={job.id}
            className="job-item"
            onClick={() => handleJobClick(job)}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{job.title}</h5>
                <Badge variant="info">{job.type}</Badge>
                <p>{job.description}</p>
                <small>
                  {job.company} - {new Date(job.postedDate).toLocaleDateString()}
                </small>
              </div>
              <div>
                <Button
                  variant="outline-success"
                  onClick={() => handleApply(job.id)}
                  disabled={loading}
                  className="mr-2"
                >
                  Apply
                </Button>
                <Button
                  variant="outline-warning"
                  onClick={() => handleSaveJob(job.id)}
                  disabled={loading}
                >
                  Save
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleBookmarkJob(job.id)}
                  disabled={loading}
                >
                  Bookmark
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Pagination */}
      <Pagination className="mt-4 justify-content-center">
        <Pagination.Prev
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from(
          { length: Math.ceil(filteredJobs.length / jobsPerPage) },
          (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredJobs.length / jobsPerPage)}
        />
      </Pagination>

      {/* Job Details Modal */}
      <Modal show={showJobModal} onHide={closeJobModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentJobDetails?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{currentJobDetails?.description}</p>
          <p>
            <strong>Company:</strong> {currentJobDetails?.company}
          </p>
          <p>
            <strong>Location:</strong> {currentJobDetails?.location}
          </p>
          <p>
            <strong>Job Type:</strong> {currentJobDetails?.type}
          </p>
          <p>
            <strong>Posted Date:</strong>{' '}
            {new Date(currentJobDetails?.postedDate).toLocaleDateString()}
          </p>
          {/* Additional Details */}
          <p>
            <strong>Salary:</strong> {currentJobDetails?.salary || 'Not Disclosed'}
          </p>
          <p>
            <strong>Requirements:</strong> {currentJobDetails?.requirements}
          </p>
          <p>
            <strong>Experience:</strong> {currentJobDetails?.experience} years
          </p>
          <Button
            variant="primary"
            onClick={() => handleApply(currentJobDetails?.id)}
            className="mt-3"
          >
            Apply Now
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default JobPortalPage;