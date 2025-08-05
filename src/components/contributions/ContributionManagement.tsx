'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Contribution {
  id: string;
  title: string;
  description?: string;
  amount: number;
  dueDate: string;
  isActive: boolean;
  createdAt: string;
}

export default function ContributionManagement() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      const response = await fetch('/api/contributions');
      if (response.ok) {
        const data = await response.json();
        setContributions(data);
      } else {
        setError('Failed to fetch contributions');
      }
    } catch (error) {
      setError('Error loading contributions');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (contributionId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/contributions/${contributionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchContributions(); // Refresh the list
      } else {
        setError('Failed to update contribution status');
      }
    } catch (error) {
      setError('Error updating contribution status');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Contribution Management</h2>
        <Link
          href="/admin/contributions/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create New Contribution
        </Link>
      </div>

      {contributions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No contributions found.</p>
          <Link
            href="/admin/contributions/new"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create your first contribution
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {contributions.map((contribution) => (
              <li key={contribution.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {contribution.title}
                          </h3>
                          {contribution.description && (
                            <p className="text-sm text-gray-500 mt-1">
                              {contribution.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-lg font-semibold text-green-600">
                              {formatCurrency(contribution.amount)}
                            </p>
                            <p className="text-sm text-gray-500">
                              Due: {formatDate(contribution.dueDate)}
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              contribution.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {contribution.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        href={`/admin/contributions/${contribution.id}/edit`}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleToggleStatus(contribution.id, contribution.isActive)}
                        className={`text-sm font-medium ${
                          contribution.isActive
                            ? 'text-red-600 hover:text-red-900'
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {contribution.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 