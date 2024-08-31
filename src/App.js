import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Correct import
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import AlumniDirectoryPage from './pages/AlumniDirectoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DonationPage from './pages/DonationPage';
import DonationPortalPage from './pages/DonationPortalPage';
import EventPage from './pages/EventPage';
import EventsPage from './pages/EventsPage';
import EventsReunionsPage from './pages/EventsReunionsPage';
import FeedbackSurveysPage from './pages/FeedbackSurveysPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import JobPortalPage from './pages/JobPortalPage';
import NetworkingHubPage from './pages/NetworkingHubPage';
import NotFoundPage from './pages/NotFoundPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import UpdateInfoPage from './pages/UpdateInfoPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/directory" element={<AlumniDirectoryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/donation" element={<DonationPage />} />
            <Route path="/donate" element={<DonationPortalPage />} />
            <Route path="/event" element={<EventPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events-reunions" element={<EventsReunionsPage />} />
            <Route path="/feedback" element={<FeedbackSurveysPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/jobs" element={<JobPortalPage />} />
            <Route path="/network" element={<NetworkingHubPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/update-info" element={<UpdateInfoPage />} />
            <Route path="/update-profile" element={<UpdateProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;

