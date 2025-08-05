"use client";

import { useState, useEffect } from "react";
import UserProtectedRoute from "@/components/auth/UserProtectedRoute";
import { useAuth } from "@/context/AuthContext";

interface ReceiptHistory {
  id: string;
  contribution?: {
    title: string;
    amount: number;
  };
  amount: number;
  status: string;
  createdAt: string;
  description?: string;
  imageUrl?: string;
}

export default function MemberHistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState<ReceiptHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.uid) {
      fetchHistory();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [user?.uid]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`/api/receipts?firebaseUid=${user?.uid}`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      } else {
        setError("Failed to fetch history");
      }
    } catch (err) {
      setError("Error loading history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <UserProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment & Receipt History</h1>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          {history.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No receipt history found.</div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contribution</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt Image</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.contribution?.title || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-semibold">₦{item.amount?.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'APPROVED' ? 'bg-green-100 text-green-800' : item.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.description || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.imageUrl ? (
                          <a href={item.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </UserProtectedRoute>
  );
}
