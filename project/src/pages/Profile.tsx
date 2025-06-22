import React, { useState } from 'react';
import { User, Mail, Phone, Save, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Profile: React.FC = () => {
  const { user, profile, updateProfile, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      navigate('/login', { state: { from: { pathname: '/profile' } } });
      return;
    }

    if (profile) {
      setFormData({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        phone: profile.phone || '',
      });
    }
  }, [isAuthenticated, authLoading, navigate, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await updateProfile({
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
    });

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isAuthenticated && !authLoading) {
    return null;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-sunset-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-sunset-500 to-teal-500 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-gray-600" />
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">
                  {profile ? `${profile.first_name} ${profile.last_name}` : 'User'}
                </h2>
                <p className="text-sunset-100">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      placeholder="First name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                    placeholder="Email address"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Email address cannot be changed. Contact support if you need to update it.
                </p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                    placeholder="+971 50 123 4567"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-sunset-500 hover:bg-sunset-600 disabled:bg-sunset-300 text-white px-6 py-3 rounded-md font-semibold transition-colors"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Account Created:</span>
              <span className="ml-2 font-medium">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Email Verified:</span>
              <span className="ml-2 font-medium text-green-600">
                {user?.email_confirmed_at ? 'Yes' : 'Pending'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;