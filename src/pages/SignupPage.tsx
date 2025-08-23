import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SignupPageProps {}

const SignupPage: React.FC<SignupPageProps> = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    userType: 'user' as 'user' | 'artist' | 'business',
  });
  
  const [artistInfo, setArtistInfo] = useState({
    bio: '',
    specialization: '',
    experience: 0,
    state: '',
    city: '',
  });
  
  const [businessInfo, setBusinessInfo] = useState({
    companyName: '',
    businessType: '',
    description: '',
    website: '',
    state: '',
    city: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArtistInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArtistInfo(prev => ({
      ...prev,
      [name]: name === 'experience' ? parseInt(value) || 0 : value
    }));
  };

  const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate required fields
    if (!formData.email || !formData.password || !formData.name) {
      setError('Email, password, and name are required');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Prepare request body
    const requestBody: any = {
      email: formData.email,
      password: formData.password,
      userType: formData.userType,
      name: formData.name,
      phone: formData.phone,
    };

    // Add type-specific info
    if (formData.userType === 'artist') {
      requestBody.artistInfo = {
        bio: artistInfo.bio,
        specialization: artistInfo.specialization.split(',').map(s => s.trim()).filter(s => s),
        experience: artistInfo.experience,
        location: {
          state: artistInfo.state,
          city: artistInfo.city,
        },
        portfolio: [], // Can be added later
      };
    } else if (formData.userType === 'business') {
      requestBody.businessInfo = {
        companyName: businessInfo.companyName,
        businessType: businessInfo.businessType,
        description: businessInfo.description,
        website: businessInfo.website,
        location: {
          state: businessInfo.state,
          city: businessInfo.city,
          address: businessInfo.address,
        },
      };
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Account created successfully! Redirecting...');
        // Store token and redirect
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        setTimeout(() => {
          window.location.href = data.data.user.userType === 'artist' ? '/artist' : 
                                 data.data.user.userType === 'business' ? '/brand' : '/';
        }, 2000);
      } else {
        // Handle validation errors or other server errors
        if (data.errors && data.errors.length > 0) {
          setError(data.errors.join(', '));
        } else {
          setError(data.message || 'Registration failed');
        }
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold header-indian mb-2">Join Our Community! 🎨</h1>
          <p className="text-stone-600">Create your account and start your artistic journey</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-amber-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}

            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-3">
                I want to join as:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'user', label: 'Art Lover', icon: '🎭', desc: 'Browse and purchase art' },
                  { value: 'artist', label: 'Artist', icon: '🎨', desc: 'Showcase and sell your art' },
                  { value: 'business', label: 'Business', icon: '🏢', desc: 'Buy art for commercial use' },
                ].map((type) => (
                  <label
                    key={type.value}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      formData.userType === type.value
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-amber-200 hover:border-amber-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type.value}
                      checked={formData.userType === type.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-semibold text-stone-800">{type.label}</div>
                      <div className="text-xs text-stone-600 mt-1">{type.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-stone-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  placeholder="Enter your phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-stone-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-stone-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Artist-specific fields */}
            {formData.userType === 'artist' && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">Artist Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="bio" className="block text-sm font-semibold text-stone-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      placeholder="Tell us about yourself and your art..."
                      value={artistInfo.bio}
                      onChange={handleArtistInfoChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="specialization" className="block text-sm font-semibold text-stone-700 mb-2">
                      Specializations (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="specialization"
                      name="specialization"
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      placeholder="e.g., Madhubani, Warli, Kalamkari"
                      value={artistInfo.specialization}
                      onChange={handleArtistInfoChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="experience" className="block text-sm font-semibold text-stone-700 mb-2">
                        Experience (years)
                      </label>
                      <input
                        type="number"
                        id="experience"
                        name="experience"
                        min="0"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                        value={artistInfo.experience}
                        onChange={handleArtistInfoChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-semibold text-stone-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                        placeholder="Your state"
                        value={artistInfo.state}
                        onChange={handleArtistInfoChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold text-stone-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                        placeholder="Your city"
                        value={artistInfo.city}
                        onChange={handleArtistInfoChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Business-specific fields */}
            {formData.userType === 'business' && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">Business Information</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-semibold text-stone-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                        placeholder="Your company name"
                        value={businessInfo.companyName}
                        onChange={handleBusinessInfoChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="businessType" className="block text-sm font-semibold text-stone-700 mb-2">
                        Business Type
                      </label>
                      <input
                        type="text"
                        id="businessType"
                        name="businessType"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                        placeholder="e.g., Textile, Home Decor, Fashion"
                        value={businessInfo.businessType}
                        onChange={handleBusinessInfoChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-stone-700 mb-2">
                      Business Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      placeholder="Describe your business..."
                      value={businessInfo.description}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-semibold text-stone-700 mb-2">
                      Website (optional)
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      placeholder="https://yourwebsite.com"
                      value={businessInfo.website}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="state" className="block text-sm font-semibold text-stone-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                        placeholder="Business state"
                        value={businessInfo.state}
                        onChange={handleBusinessInfoChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold text-stone-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                        placeholder="Business city"
                        value={businessInfo.city}
                        onChange={handleBusinessInfoChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-stone-700 mb-2">
                      Full Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={2}
                      className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                      placeholder="Complete business address"
                      value={businessInfo.address}
                      onChange={handleBusinessInfoChange}
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-indian py-3 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-stone-600">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-600 hover:text-orange-700 font-semibold">
                Sign in here
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

export default SignupPage;
