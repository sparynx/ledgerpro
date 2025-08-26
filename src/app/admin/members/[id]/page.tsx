"use client"
<<<<<<< HEAD
<<<<<<< HEAD
=======
"use client"
>>>>>>> e201f34 (added stuff)
=======
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)
export default function AdminMemberDetailPage() {
  const router = useRouter();
  const params = useParams();
  const memberId = params?.id as string;
  const [member, setMember] = useState<any>(null);
<<<<<<< HEAD
=======
interface ReceiptItem {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  description?: string | null;
  imageUrl: string;
  contribution: { title: string } | null;
}

interface UserDetail {
  id: string;
  username?: string | null;
  displayName?: string | null;
  email: string;
  stateCode?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  receipts: ReceiptItem[];
}

export default function AdminMemberDetailPage() {
  const router = useRouter();
  const params = useParams() as { id?: string };
  const memberId = params.id;

  const [member, setMember] = useState<UserDetail | null>(null);
>>>>>>> e201f34 (added stuff)
=======
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (memberId) fetchMember();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)
    // eslint-disable-next-line
  }, [memberId]);

  const fetchMember = async () => {
<<<<<<< HEAD
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId]);

  const fetchMember = async () => {
    setLoading(true);
>>>>>>> e201f34 (added stuff)
=======
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)
    try {
      const res = await fetch(`/api/users/${memberId}`);
      if (!res.ok) throw new Error('Failed to fetch member');
      const data = await res.json();
<<<<<<< HEAD
<<<<<<< HEAD
      setMember(data);
    } catch (err: any) {
      setError(err.message || 'Error loading member');
=======
      setMember(data as UserDetail);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Error loading member');
>>>>>>> e201f34 (added stuff)
=======
      setMember(data);
    } catch (err: any) {
      setError(err.message || 'Error loading member');
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">{error}</div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen p-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded">Member not found</div>
      </div>
    );
  }

>>>>>>> e201f34 (added stuff)
=======
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-full sm:max-w-3xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <div className="text-base font-semibold text-blue-800 mb-1">Sustainable Development Group (SDG)</div>
<<<<<<< HEAD
<<<<<<< HEAD
          {/* <div className="text-sm text-gray-800">A CDS under the United Nations Charter for 2030</div> */}
=======
>>>>>>> e201f34 (added stuff)
=======
          {/* <div className="text-sm text-gray-800">A CDS under the United Nations Charter for 2030</div> */}
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)
        </div>
        <button
          onClick={() => router.back()}
          className="mb-4 sm:mb-6 px-3 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 border border-blue-100 text-xs sm:text-sm font-medium"
        >
          ← Back to Members
        </button>
        <div className="bg-white shadow rounded-lg sm:rounded-xl p-4 sm:p-8 border border-gray-100">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
          ) : member ? (
            <>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 break-words">{member.displayName || member.username || member.email}</h1>
              <div className="mb-3 sm:mb-4 text-gray-700 text-xs sm:text-sm">Member ID: <span className="font-mono break-all">{member.id}</span></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <div className="text-xs sm:text-xs text-gray-800">Username</div>
                  <div className="font-medium text-gray-900 break-words">{member.username || '-'}</div>
                </div>
                <div>
                  <div className="text-xs sm:text-xs text-gray-800">Email</div>
                  <div className="font-medium text-gray-900 break-words">{member.email}</div>
                </div>
                <div>
                  <div className="text-xs sm:text-xs text-gray-800">State Code</div>
                  <div className="font-medium text-gray-900 break-words">{member.stateCode || '-'}</div>
                </div>
                <div>
                  <div className="text-xs sm:text-xs text-gray-800">Status</div>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${member.isActive ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                    {member.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div>
                  <div className="text-xs sm:text-xs text-gray-800">Joined</div>
                  <div className="font-medium text-gray-900">{new Date(member.createdAt).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-xs sm:text-xs text-gray-800">Last Updated</div>
                  <div className="font-medium text-gray-900">{new Date(member.updatedAt).toLocaleDateString()}</div>
                </div>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-blue-800 mb-2 mt-4 sm:mt-6">Receipts</h2>
              {member.receipts && member.receipts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-[600px] w-full divide-y divide-gray-200 text-xs sm:text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Contribution</th>
                        <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {member.receipts.map((r: any) => (
                        <tr key={r.id}>
                          <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-900">{r.contribution?.title || '-'}</td>
                          <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-blue-700 font-semibold">₦{Number(r.amount).toLocaleString()}</td>
                          <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${r.status === 'APPROVED' ? 'bg-blue-100 text-blue-800' : r.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'}`}>
                              {r.status.charAt(0).toUpperCase() + r.status.slice(1).toLowerCase()}
                            </span>
                          </td>
                          <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                          <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-800">{r.description || '-'}</td>
                          <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
                            {r.imageUrl ? (
                              <a href={r.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
                            ) : (
                              '-'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-gray-700 text-xs sm:text-sm">No receipts found for this member.</div>
              )}
            </>
          ) : null}
<<<<<<< HEAD
=======
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 break-words">{member.displayName || member.username || member.email}</h1>
          <div className="mb-3 sm:mb-4 text-gray-700 text-xs sm:text-sm">Member ID: <span className="font-mono break-all">{member.id}</span></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <div className="text-xs sm:text-xs text-gray-800">Username</div>
              <div className="font-medium text-gray-900 break-words">{member.username || '-'}</div>
            </div>
            <div>
              <div className="text-xs sm:text-xs text-gray-800">Email</div>
              <div className="font-medium text-gray-900 break-words">{member.email}</div>
            </div>
            <div>
              <div className="text-xs sm:text-xs text-gray-800">State Code</div>
              <div className="font-medium text-gray-900 break-words">{member.stateCode || '-'}</div>
            </div>
            <div>
              <div className="text-xs sm:text-xs text-gray-800">Status</div>
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${member.isActive ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                {member.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div>
              <div className="text-xs sm:text-xs text-gray-800">Joined</div>
              <div className="font-medium text-gray-900">{new Date(member.createdAt).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-xs sm:text-xs text-gray-800">Last Updated</div>
              <div className="font-medium text-gray-900">{new Date(member.updatedAt).toLocaleDateString()}</div>
            </div>
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-blue-800 mb-2 mt-4 sm:mt-6">Receipts</h2>
          {member.receipts && member.receipts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full divide-y divide-gray-200 text-xs sm:text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Contribution</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {member.receipts.map((r: ReceiptItem) => (
                    <tr key={r.id}>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-900">{r.contribution?.title || '-'}</td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-blue-700 font-semibold">₦{Number(r.amount).toLocaleString()}</td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${r.status === 'APPROVED' ? 'bg-blue-100 text-blue-800' : r.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'}`}>
                          {r.status.charAt(0).toUpperCase() + r.status.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-gray-800">{r.description || '-'}</td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
                        {r.imageUrl ? (
                          <a href={r.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-700 text-xs sm:text-sm">No receipts found for this member.</div>
          )}
>>>>>>> e201f34 (added stuff)
=======
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)
        </div>
      </div>
    </div>
  );
}
