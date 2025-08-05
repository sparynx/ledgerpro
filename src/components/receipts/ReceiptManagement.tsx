'use client';

import { useState, useEffect } from 'react';

interface Receipt {
  id: string;
  amount: number;
  imageUrl: string;
  description?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  user: {
    username: string;
    displayName: string;
    stateCode: string;
  };
  contribution: {
    title: string;
    amount: number;
  };
}

export default function ReceiptManagement() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('PENDING');

  useEffect(() => {
    fetchReceipts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus]);

  const fetchReceipts = async () => {
    try {
      const response = await fetch(`/api/receipts?status=${selectedStatus}`);
      if (response.ok) {
        const data = await response.json();
        setReceipts(data);
      } else {
        setError('Failed to fetch receipts');
      }
    } catch {
      setError('Error loading receipts');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (receiptId: string, status: 'APPROVED' | 'REJECTED', notes?: string) => {
    try {
      const response = await fetch(`/api/receipts/${receiptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, adminNotes: notes }),
      });

      if (response.ok) {
        fetchReceipts(); // Refresh the list
      } else {
        setError('Failed to update receipt status');
      }
    } catch {
      setError('Error updating receipt status');
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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
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
        <h2 className="text-2xl font-bold text-gray-900">Receipt Management</h2>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md  text-gray-600 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {receipts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No {selectedStatus.toLowerCase()} receipts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {receipts.map((receipt) => (
            <div key={receipt.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {receipt.user.displayName || receipt.user.username}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {receipt.user.stateCode} • {receipt.contribution.title}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(receipt.status)}`}>
                  {receipt.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Amount:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(receipt.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Expected:</span>
                  <span className="text-sm text-gray-700">
                    {formatCurrency(receipt.contribution.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Submitted:</span>
                  <span className="text-sm text-gray-700">
                    {formatDate(receipt.createdAt)}
                  </span>
                </div>
              </div>

              {receipt.description && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">{receipt.description}</p>
                </div>
              )}

              <div className="mb-4">
                <img
                  src={receipt.imageUrl}
                  alt="Receipt"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>

              {receipt.status === 'PENDING' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(receipt.id, 'APPROVED')}
                    className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(receipt.id, 'REJECTED')}
                    className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 