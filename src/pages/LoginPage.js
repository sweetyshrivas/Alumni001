import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated import
import "./LoginPage.css"; // Importing the CSS file

const LoginPage = () => {
  const navigate = useNavigate(); // Updated from useHistory to useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Handle login logic here (API call, authentication, etc.)
    // For demo purposes, we'll just clear the form
    setError("");
    console.log("Logging in with:", email, password);
    
    // Navigate to another page upon successful login
    navigate("/dashboard"); // Updated from history.push to navigate
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        {/* Display error message */}
        {error && <div className="error-alert">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
          </div>

          {/* Additional Links */}
          <div className="additional-links">
            <a href="/register" className="register-link">
              New? Register
            </a>
            <a href="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>

        {/* Social Login Buttons */}
        <div className="social-login">
          <button className="social-btn google-btn">
            <span className="icon">G</span> Login with Google
          </button>
          <button className="social-btn twitter-btn">
            <span className="icon">T</span> Login with Twitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;