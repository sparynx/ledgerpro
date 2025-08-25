"use client"


import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute';
import AdminNavbar from '@/components/layout/AdminNavbar';
import ExportReportButton from '@/components/admin/ExportReportButton';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalContributions: 0,
    totalExpenses: 0,
    activeMembers: 0,
    pendingReceipts: 0,
  });
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
=======
  const [searchState, setSearchState] = useState('');
  interface UserSearchResult {
    id: string;
    username?: string | null;
    displayName?: string | null;
    email: string;
    stateCode?: string | null;
    isActive: boolean;
    createdAt: string;
  }
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
>>>>>>> e201f34 (added stuff)

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
    } finally {
      setLoading(false);
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
<<<<<<< HEAD
            <div className="flex gap-2">
=======
            <div className="flex gap-3 items-center">
              <div className="flex items-center bg-gradient-to-r from-white/80 via-sky-50 to-white/90 border border-sky-100 shadow-sm rounded-full px-3 py-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                </svg>
                <input
                  value={searchState}
                  onChange={(e) => setSearchState(e.target.value)}
                  placeholder="State code (e.g. LA)"
                  className="text-sm px-2 py-1 outline-none w-44 bg-transparent placeholder-gray-400 text-gray-600"
                />
                <button
                  onClick={async () => {
                    setSearching(true);
                    try {
                      const params = new URLSearchParams();
                      if (searchState) params.set('stateCode', searchState.trim());
                      const res = await fetch(`/api/users?${params.toString()}`);
                      if (res.ok) {
                        const data = await res.json();
                        setSearchResults(data);
                      }
                    } finally {
                      setSearching(false);
                    }
                  }}
                  className="ml-3 inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-full shadow hover:from-blue-700 transition-colors text-sm"
                >
                  {searching ? 'Searching...' : 'Search'}
                </button>
              </div>
>>>>>>> e201f34 (added stuff)
              <ExportReportButton small />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Total Contributions</h3>
              <p className="text-3xl font-bold text-blue-700">₦{stats.totalContributions.toLocaleString()}</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Total Expenses</h3>
              <p className="text-3xl font-bold text-blue-700">₦{stats.totalExpenses.toLocaleString()}</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Active Members</h3>
              <p className="text-3xl font-bold text-blue-700">{stats.activeMembers}</p>
              <p className="text-sm text-gray-500">Current members</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Pending Receipts</h3>
              <p className="text-3xl font-bold text-blue-700">{stats.pendingReceipts}</p>
              <p className="text-sm text-gray-500">Awaiting approval</p>
            </div>
          </div>

<<<<<<< HEAD
=======
          {/* Search results */}
          {searchResults.length > 0 && (
            <div className="bg-gradient-to-br from-white via-slate-50 to-sky-50 rounded-lg shadow-lg p-6 mb-8 border border-sky-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.map((u) => (
                  <Link key={u.id} href={`/admin/members/${u.id}`} className="block">
                    <div className="p-4 bg-white/80 border border-slate-100 rounded-xl flex items-center gap-4 hover:shadow-md transition">
                      <div className="flex-shrink-0 w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-blue-600 font-bold">{(u.displayName || u.username || '').charAt(0).toUpperCase()}</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-600">{u.displayName || u.username}</div>
                        <div className="text-sm text-gray-600">{u.email} • {u.stateCode}</div>
                      </div>
                      <div className="text-sm text-gray-600">{u.isActive ? 'Active' : 'Inactive'}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

>>>>>>> e201f34 (added stuff)
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
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-500">No recent activity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
