// src/pages/AdminDashboardPage.js

import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Table, Button, Spinner } from 'react-bootstrap';
import { fetchUsers, fetchJobs, fetchDonations, fetchEvents, deleteUser, deleteJob, deleteEvent } from '../services/adminService';
import './AdminDashboardPage.css'; // Custom styles for AdminDashboardPage

const AdminDashboardPage = () => {
  const [key, setKey] = useState('users');
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Admin Dashboard';
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [userList, jobList, eventList, donationList] = await Promise.all([
        fetchUsers(),
        fetchJobs(),
        fetchEvents(),
        fetchDonations(),
      ]);

      setUsers(userList);
      setJobs(jobList);
      setEvents(eventList);
      setDonations(donationList);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading dashboard...</p>
      </Container>
    );
  }

  return (
    <Container className="admin-dashboard-container mt-5">
      <h2 className="text-center">Admin Dashboard</h2>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="users" title="Users">
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="jobs" title="Jobs">
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteJob(job.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="events" title="Events">
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{event.date}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteEvent(event.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="donations" title="Donations">
          <Table striped bordered hover className="mt-4">
          <thead>
              <tr>
                <th>Donor</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.donor}</td>
                  <td>{donation.amount}</td>
                  <td>{donation.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminDashboardPage;