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
            <div className="flex gap-2">
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
