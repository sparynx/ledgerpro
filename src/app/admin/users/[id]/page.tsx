"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function UserProfile() {
  const { id } = useParams() as { id?: string };

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/users/${id}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusClass = (status: string) => {
    switch ((status || '').toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div role="status" className="flex flex-col items-center gap-3">
          <svg className="animate-spin -ml-1 h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <span className="text-gray-600">Loading user…</span>
          <span className="sr-only">Loading user data</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">User not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link href="/admin/dashboard" className="hover:underline text-blue-600">Admin</Link>
            <span className="px-2">/</span>
            <Link href="/admin/members" className="hover:underline text-blue-600">Members</Link>
            <span className="px-2">/</span>
            <span className="text-gray-700">{user.displayName || user.username}</span>
          </nav>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {user.photoURL || user.profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <Image
                    src={user.photoURL || user.profileImage}
                    alt={user.displayName || user.username}
                    width={112}
                    height={112}
                    className="object-cover"
                  />
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{user.displayName || user.username}</h1>
                <p className="text-sm text-gray-500">{user.email}</p>
                <div className="mt-2 inline-flex items-center gap-3">
                  <span className="text-sm text-gray-600">State code:</span>
                  <span className="text-sm font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded">{user.stateCode || '—'}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Receipts</div>
                  <div className="text-lg font-semibold text-gray-900">{(user.receipts || []).length}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Joined</div>
                  <div className="text-lg font-semibold text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/users/${user.id}/edit`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">Edit</Link>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm">Message</button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Receipts</h2>

              {user.receipts && user.receipts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.receipts.map((receipt: any) => (
                    <div key={receipt.id} className="border rounded-lg p-4 flex flex-col justify-between">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                          {receipt.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <Image src={receipt.imageUrl} alt="receipt" width={80} height={80} className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm text-gray-500">Amount</div>
                              <div className="text-lg font-semibold text-gray-900">₦{receipt.amount}</div>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass(receipt.status)}`}>
                              {receipt.status || 'Unknown'}
                            </div>
                          </div>

                          <p className="mt-2 text-sm text-gray-600">{receipt.description || 'No description'}</p>
                          <p className="mt-3 text-xs text-gray-400">Uploaded {new Date(receipt.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end gap-3">
                        <a href={receipt.imageUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">View</a>
                        <Link href={`/admin/receipts/${receipt.id}`} className="text-sm text-gray-700 hover:underline">Details</Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">No receipts uploaded.</div>
              )}
            </div>
          </div>

          <aside className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Profile details</h3>
            <dl className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between"><dt className="text-gray-500">Username</dt><dd className="font-medium text-gray-800">{user.username || '—'}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Email</dt><dd className="font-medium text-gray-800">{user.email || '—'}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">State code</dt><dd className="font-medium text-gray-800">{user.stateCode || '—'}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Active</dt><dd className="font-medium text-gray-800">{user.isActive ? 'Yes' : 'No'}</dd></div>
            </dl>

            <div className="mt-6">
              <Link href={`/admin/users/${user.id}/edit`} className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md">Edit profile</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
