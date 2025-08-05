'use client';

import { useState, useEffect } from 'react';
import UserProtectedRoute from '@/components/auth/UserProtectedRoute';
import { useAuth } from '@/context/AuthContext';

interface UserProfile {
  id: string;
  username: string;
  stateCode: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export default function MemberProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    stateCode: '',
  });

  useEffect(() => {
    if (user?.uid) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user?.uid]);

  const fetchProfile = async () => {
    if (!user?.uid) return;
    try {
      const response = await fetch(`/api/users/profile?firebaseUid=${user.uid}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData({
          username: data.username || '',
          stateCode: data.stateCode || '',
        });
      } else {
        setError('Failed to fetch profile');
      }
    } catch (error) {
      setError('Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/users/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebaseUid: user?.uid,
          email: user?.email,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          username: formData.username,
          stateCode: formData.stateCode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <UserProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <style>{`
            .spinner {
              position: relative;
              width: 15.7px;
              height: 15.7px;
            }
            .spinner div {
              animation: spinner-4t3wzl 1.875s infinite backwards;
              background-color: #474bff;
              border-radius: 50%;
              height: 100%;
              position: absolute;
              width: 100%;
            }
            .spinner div:nth-child(1) {
              animation-delay: 0.15s;
              background-color: rgba(71,75,255,0.9);
            }
            .spinner div:nth-child(2) {
              animation-delay: 0.3s;
              background-color: rgba(71,75,255,0.8);
            }
            .spinner div:nth-child(3) {
              animation-delay: 0.45s;
              background-color: rgba(71,75,255,0.7);
            }
            .spinner div:nth-child(4) {
              animation-delay: 0.6s;
              background-color: rgba(71,75,255,0.6);
            }
            .spinner div:nth-child(5) {
              animation-delay: 0.75s;
              background-color: rgba(71,75,255,0.5);
            }
            @keyframes spinner-4t3wzl {
              0% {
                transform: rotate(0deg) translateY(-200%);
              }
              60%, 100% {
                transform: rotate(360deg) translateY(-200%);
              }
            }
          `}</style>
        </div>
      </UserProtectedRoute>
    );
  }

  return (
    <UserProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">View and edit your profile information</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {!isEditing ? (
                // View Mode
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    {profile?.photoURL && (
                      <img
                        src={profile.photoURL}
                        alt="Profile"
                        className="h-16 w-16 rounded-full"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {profile?.displayName || 'User'}
                      </h3>
                      <p className="text-sm text-gray-500">{profile?.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Username</h4>
                      <p className="mt-1 text-sm text-gray-900">{profile?.username || 'Not set'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">State Code</h4>
                      <p className="mt-1 text-sm text-gray-900">{profile?.stateCode || 'Not set'}</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="stateCode" className="block text-sm font-medium text-gray-700">
                        State Code
                      </label>
                      <input
                        type="text"
                        id="stateCode"
                        name="stateCode"
                        required
                        value={formData.stateCode}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g.,FC/25A/*****"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </UserProtectedRoute>
  );
}
