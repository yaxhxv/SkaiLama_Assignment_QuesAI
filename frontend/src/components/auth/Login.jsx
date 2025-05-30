import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import QuesLogo from "../../assets/QuesLogo1.png";
import purpleLogo from "../../assets/purpleLogo.png";
import authService from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authService.login({
        email: formData.email,
        password: formData.password,
      });
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="brand">
          <div className="logo-container">
            <img src={QuesLogo} alt="Ques.AI Logo" className="logo" />
          </div>
          <h1>
            Your podcast
            <br />
            will no longer
            <br />
            be just a hobby.
          </h1>
        </div>
        <p className="subtitle">
          Supercharge Your Distribution using our AI assistant!
        </p>
      </div>

      <div className="auth-right">
        <div className="welcome-section">
          <div className="logo-container">
            <img src={purpleLogo} alt="Ques.AI Logo" className="mobile-logo" />
          </div>
          <h2>
            Welcome to
            <br />
            Ques.AI
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button type="button" className="google-btn" disabled={isLoading}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
            />
            Continue with Google
          </button>

          <p className="switch-auth">
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
