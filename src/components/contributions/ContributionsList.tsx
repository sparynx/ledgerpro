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
}

export default function ContributionsList({ firebaseUid }: { firebaseUid?: string }) {
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

        // If firebaseUid provided, fetch receipts for this user and filter out paid contributions
        if (firebaseUid) {
          try {
            const r = await fetch(`/api/receipts?firebaseUid=${encodeURIComponent(firebaseUid)}`);
            if (r.ok) {
              const receipts = await r.json();
              const paidContributionIds = new Set(receipts.map((rc: any) => rc.contributionId));

              const filtered = data.filter((c: any) => {
                // hide contributions the user has already paid for
                if (paidContributionIds.has(c.id)) return false;
                // hide manual admin contribution of 11000 for members (assumption based on request)
                const amt = Number(c.amount ?? 0);
                if (amt === 11000) return false;
                return true;
              });
              setContributions(filtered);
              return;
            }
          } catch (err) {
            console.error('Failed to fetch user receipts for filtering', err);
          }
        }

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateStatus = (dueDate: string) => {
    const daysLeft = getDaysUntilDue(dueDate);
    if (daysLeft < 0) return { text: 'Overdue', color: 'bg-blue-100', textColor: 'text-blue-600', ring: 'ring-2 ring-blue-300' };
    if (daysLeft === 0) return { text: 'Due Today', color: 'bg-blue-200', textColor: 'text-blue-700', ring: 'ring-2 ring-blue-400' };
    if (daysLeft <= 3) return { text: `${daysLeft} days left`, color: 'bg-blue-100', textColor: 'text-blue-600', ring: 'ring-2 ring-blue-200' };
    return { text: `${daysLeft} days left`, color: 'bg-blue-50', textColor: 'text-blue-500', ring: '' };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="text-red-600 text-lg mb-2">⚠️ Oops!</div>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={fetchContributions}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (contributions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 max-w-md mx-auto">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Contributions Yet</h3>
          <p className="text-gray-500">Check back later for new contribution opportunities.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contributions.map((contribution, index) => {
        const dueDateStatus = getDueDateStatus(contribution.dueDate);
        return (
          <div
            key={contribution.id}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Subtle blue background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-80"></div>

            <div className="relative p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                    {contribution.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {contribution.description && (
                <div className="mb-3">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {contribution.description}
                  </p>
                </div>
              )}

              {/* Amount Display */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">Amount</span>
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  {formatCurrency(contribution.amount)}
                </div>
              </div>

              {/* Due Date Section */}
              <div className="mb-5 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-0.5">Due Date</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(contribution.dueDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${dueDateStatus.textColor} ${dueDateStatus.color} ${dueDateStatus.ring}`}>
                      <div className={`w-2 h-2 bg-blue-400 rounded-full mr-2`}></div>
                      {dueDateStatus.text}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/member/receipts/new?contributionId=${contribution.id}`}
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-semibold shadow hover:shadow-md transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  Upload Receipt
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}