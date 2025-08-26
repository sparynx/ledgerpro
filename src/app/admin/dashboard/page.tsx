"use client"


import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute';
import AdminNavbar from '@/components/layout/AdminNavbar';
import ExportReportButton from '@/components/admin/ExportReportButton';
import { useEffect, useState } from 'react';
import ActivityTimeline from '@/components/common/ActivityTimeline';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalContributions: 0,
    totalExpenses: 0,
    activeMembers: 0,
    pendingReceipts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/reports/dashboard?admin=1');
      if (res.ok) {
        const data = await res.json();
        setStats({
          totalContributions: data.totalContributions || 0,
          totalExpenses: data.totalExpenses || 0,
          activeMembers: data.activeMembers || 0,
          pendingReceipts: data.pendingReceipts || 0,
        });
      }
      // fetch recent receipts for timeline
      try {
        const r = await fetch('/api/receipts');
        if (r.ok) {
          const receipts = await r.json();
          const events = receipts.slice(0, 8).map((rcpt: any) => ({
            id: rcpt.id,
            title: `${rcpt.user?.displayName || rcpt.user?.username || 'Member'} uploaded a receipt`,
            subtitle: `₦${rcpt.amount} • ${rcpt.contribution?.title || ''}`,
            timestamp: rcpt.createdAt,
            details: rcpt.description,
            href: `/admin/receipts/${rcpt.id}`,
          }));
          setRecentEvents(events);
        }
      } catch (err) {
        console.error('Failed to load recent receipts', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(`/api/users/search?query=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* <AdminNavbar hideTitle hideProfile /> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage CDS finances and members</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-2 py-1">
                <input
                  type="text"
                  placeholder="Search by state code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-36 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none"
                />
                <button
                  onClick={handleSearch}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
              <ExportReportButton small />
            </div>
          </div>

          {/* Search Results (compact) */}
          {searchResults.length > 0 && (
            <div className="mb-6">
              <div className="bg-white rounded-lg shadow p-3">
                <ul className="space-y-1">
                  {searchResults.map((user) => (
                    <li key={user.id}>
                      <Link href={`/admin/users/${user.id}`} className="block px-3 py-2 rounded hover:bg-gray-50 text-gray-600 no-underline">
                        <div className="text-sm font-medium">{user.displayName || user.username}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {searchResults.length === 0 && searchQuery && (
            <p className="mb-6 text-sm text-gray-600">No users found for "{searchQuery}".</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Total Contributions</h3>
              <p className="text-3xl font-bold text-blue-700">₦{stats.totalContributions.toLocaleString()}</p>
              <p className="text-sm text-gray-600">This month</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Total Expenses</h3>
              <p className="text-3xl font-bold text-blue-700">₦{stats.totalExpenses.toLocaleString()}</p>
              <p className="text-sm text-gray-600">This month</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Active Members</h3>
              <p className="text-3xl font-bold text-blue-700">{stats.activeMembers}</p>
              <p className="text-sm text-gray-600">Current members</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Pending Receipts</h3>
              <p className="text-3xl font-bold text-blue-700">{stats.pendingReceipts}</p>
              <p className="text-sm text-gray-600">Awaiting approval</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a href="/admin/contributions/new" className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100">
                  Add New Contribution
                </a>
                <a href="/admin/expenses/new" className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100">
                  Record New Expense
                </a>
                <a href="/admin/expenses" className="block w-full text-left px-4 py-3 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100">
                  View Expenses
                </a>
                <Link href="/admin/receipts" className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100">
                  Review Receipts
                </Link>
                <Link href="/admin/members" className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100">
                  Manage Members
                </Link>
              </div>
            </div>
            <div>
              <ActivityTimeline events={recentEvents} isAdmin />
            </div>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
