'use client';

import { useAuth } from '@/context/AuthContext';

export default function UIDDisplay() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 rounded-lg p-4 max-w-sm">
      <h3 className="font-semibold text-yellow-800 mb-2">Firebase UID (for admin setup)</h3>
      <div className="bg-white p-2 rounded border text-sm font-mono break-all">
        {user.uid}
      </div>
      <p className="text-xs text-yellow-700 mt-2">
        Copy this UID and update scripts/create-admin.js
      </p>
    </div>
  );
} 