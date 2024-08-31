import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { registerUser } from '../services/authService';
import './RegisterPage.css';

const RegisterPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({}); // Object to hold field-specific errors

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input change
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validateForm()) return; // Validate before proceeding
    setLoading(true);

    try {
      await registerUser(formData);
      setSuccess('Registration successful! Please check your email to verify your account.');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      login({ email: formData.email });
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="register-container mt-5">
      <div className="register-card">
        <h2 className="text-center">Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form className="mt-4" onSubmit={handleRegister}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3" style={{ position: 'relative' }}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
              role="button"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <i className="toggle-icon">&#x1F441;</i> // Eye icon for password visibility
              ) : (
                <i className="toggle-icon">&#x1F576;</i> // Slashed eye icon for hidden password
              )}
            </span>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3" style={{ position: 'relative' }}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            <span
              className="password-toggle"
              onClick={toggleConfirmPasswordVisibility}
              role="button"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? (
                <i className="toggle-icon">&#x1F441;</i> // Eye icon for password visibility
              ) : (
                <i className="toggle-icon">&#x1F576;</i> // Slashed eye icon for hidden password
              )}
            </span>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterPage;