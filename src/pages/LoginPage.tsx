import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Redirect based on user type
        window.location.href = data.data.user.userType === 'artist' ? '/artist' : 
                               data.data.user.userType === 'business' ? '/brand' : '/';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold header-indian mb-2">Welcome Back! 🎨</h1>
          <p className="text-stone-600">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-amber-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-stone-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-indian py-3 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-stone-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-semibold">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-stone-600 hover:text-stone-800 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
