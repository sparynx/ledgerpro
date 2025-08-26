"use client"

import UserProtectedRoute from '@/components/auth/UserProtectedRoute';
import ContributionsList from '@/components/contributions/ContributionsList';
import ActivityTimeline from '@/components/common/ActivityTimeline';

import { useState, useEffect } from 'react';

import { useAuth } from '@/context/AuthContext';

export default function MemberDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalPaid: 0,
    pendingAmount: 0,
    receiptsSubmitted: 0,
    receiptsApproved: 0,
  });
  const [error, setError] = useState('');
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (user?.uid) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [user?.uid]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch(`/api/reports/dashboard?firebaseUid=${user?.uid}`);
      if (res.ok) {
        const data = await res.json();
        setDashboardData({
          totalPaid: data.totalPaid || 0,
          pendingAmount: data.pendingAmount || 0,
          receiptsSubmitted: data.receiptsSubmitted || 0,
          receiptsApproved: data.receiptsApproved || 0,
        });
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (err) {
      setError('Error loading dashboard');
    } finally {
      setLoading(false);
    }
  };

  // fetch user's recent receipts for timeline
  useEffect(() => {
    const load = async () => {
      if (!user?.uid) return;
      try {
        const res = await fetch(`/api/receipts?firebaseUid=${user.uid}`);
        if (res.ok) {
          const receipts = await res.json();
          const evts = receipts.slice(0, 8).map((r: any) => ({
            id: r.id,
            title: 'You uploaded a receipt',
            subtitle: `₦${r.amount} • ${r.contribution?.title || ''}`,
            timestamp: r.createdAt,
            details: r.description,
            href: `/member/receipts/${r.id}`,
          }));
          setEvents(evts);
        }
      } catch (err) {
        console.error('Error loading user receipts', err);
      }
    };
    load();
  }, [user?.uid]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
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
            background: transparent !important;
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

  return (
    <UserProtectedRoute>
      {/* ...existing code... */}
      <div className="min-h-screen bg-gray-50">
        {/* ...existing code... */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ...existing code... */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Member Dashboard</h1>
            <p className="text-gray-600">View available contributions and upload receipts</p>
          </div>
          {/* ...existing code... */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">My Contributions</h3>
              <p className="text-3xl font-bold text-green-600">₦{dashboardData.totalPaid.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total paid</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Pending Amount</h3>
              <p className="text-3xl font-bold text-red-600">₦{dashboardData.pendingAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Outstanding</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Receipts Submitted</h3>
              <p className="text-3xl font-bold text-blue-600">{dashboardData.receiptsSubmitted}</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Receipts Approved</h3>
              <p className="text-3xl font-bold text-yellow-600">{dashboardData.receiptsApproved}</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
          </div>
          {/* ...existing code... */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Contributions</h2>
            <ContributionsList firebaseUid={user?.uid} />
          </div>
          {/* ...existing code... */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a href="/member/contributions" className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100">
                  View My Contributions
                </a>
                <a href="/member/receipts/new" className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100">
                  Upload Receipt
                </a>
                <a href="/member/history" className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100">
                  Payment History
                </a>
                <a href="/member/profile" className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100">
                  My Profile
                </a>
              </div>
            </div>
            {/* ...existing code... */}
            <div>
              <ActivityTimeline events={events} />
            </div>
          </div>
        </div>
      </div>
      {/* ...existing code... */}
    </UserProtectedRoute>
  );
}
