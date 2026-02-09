import React, { useState } from 'react';
import { LayoutGrid } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - in real app, validate credentials with backend
    if (loginForm.email && loginForm.password) {
      onLogin({
        name: 'John Doe',
        email: loginForm.email
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <LayoutGrid className="logo-icon" />
          <h1>ProjectManager</h1>
          <p>Centralized project management dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="you@company.com"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary btn-full">
            Sign In
          </button>
          
          <div className="login-footer">
            <a href="#forgot">Forgot password?</a>
            <span>•</span>
            <a href="#signup">Create account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;