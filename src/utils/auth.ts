// Authentication utility functions

export interface User {
  _id: string;
  email: string;
  userType: 'user' | 'artist' | 'business';
  profile: {
    name: string;
    phone?: string;
    artistInfo?: {
      bio?: string;
      specialization?: string[];
      experience?: number;
      location?: {
        state?: string;
        city?: string;
      };
      portfolio?: string[];
    };
    businessInfo?: {
      companyName?: string;
      businessType?: string;
      description?: string;
      website?: string;
      location?: {
        state?: string;
        city?: string;
        address?: string;
      };
    };
  };
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const authUtils = {
  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  // Get token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Check if user is logged in
  isAuthenticated: (): boolean => {
    return !!(authUtils.getToken() && authUtils.getCurrentUser());
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  // Check if user has specific role
  hasRole: (role: 'user' | 'artist' | 'business'): boolean => {
    const user = authUtils.getCurrentUser();
    return user?.userType === role;
  },

  // Get API headers with auth token
  getAuthHeaders: () => {
    const token = authUtils.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  },

  // API call with auth
  apiCall: async (url: string, options: RequestInit = {}) => {
    const baseURL = 'http://localhost:5000/api';
    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      headers: {
        ...authUtils.getAuthHeaders(),
        ...options.headers,
      },
    });

    if (response.status === 401) {
      // Token expired or invalid
      authUtils.logout();
      return null;
    }

    return response.json();
  },
};
