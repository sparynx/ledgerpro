'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileSetup from './ProfileSetup';

interface UserProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function UserProtectedRoute({ children, fallback }: UserProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && !loading) {
      fetchUserProfile();
    }
  }, [user, loading]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/users/profile?firebaseUid=${user?.uid}`);
      if (response.ok) {
        const profile = await response.json();
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserProfile(null);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleProfileComplete = () => {
    fetchUserProfile();
  };

  if (loading || profileLoading) {
return (
    <div className="flex min-h-screen items-center justify-center">
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
  );
  }

  if (!user) {
    return fallback || (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please sign in to access this page.</p>
        </div>
      </div>
    );
  }

  // If user doesn't have a complete profile, show profile setup
  if (!userProfile || !userProfile.username || !userProfile.stateCode) {
    return <ProfileSetup onComplete={handleProfileComplete} />;
  }

  return <>{children}</>;
} 