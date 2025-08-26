'use client';

import { useState, useEffect } from 'react';
import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute';
import AdminNavbar from '@/components/layout/AdminNavbar';
import ContributionForm from '@/components/contributions/ContributionForm';

interface Contribution {
  id: string;
  title: string;
  description?: string;
  amount: number;
  dueDate: string;
}

export default function EditContributionPage({ params }: any) {
  const [contribution, setContribution] = useState<Contribution | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContribution();
  }, [params.id]);

  const fetchContribution = async () => {
    try {
      const response = await fetch(`/api/contributions/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setContribution(data);
      } else {
        setError('Failed to fetch contribution');
      }
    } catch (error) {
      setError('Error loading contribution');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <AdminNavbar />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </AdminProtectedRoute>
    );
  }

  if (error || !contribution) {
    return (
      <AdminProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <AdminNavbar />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-8">
              <p className="text-red-600">{error || 'Contribution not found'}</p>
            </div>
          </div>
        </div>
      </AdminProtectedRoute>
    );
  }

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Contribution</h1>
            <p className="text-gray-600">Update contribution details</p>
          </div>
          <ContributionForm contribution={contribution} mode="edit" />
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
