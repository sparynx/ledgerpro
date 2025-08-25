"use client";
import React, { useEffect, useState } from 'react';

type Payer = {
  receiptId: string;
  userId: string | null;
  username: string;
  displayName: string;
  stateCode: string | null;
  paidAmount: number;
  status: string;
  timestamp: string | Date;
};

type ContributionGroup = {
  contributionId: string;
  contributionTitle: string;
  contributionAmount: number;
  payers: Payer[];
};

export default function ContributionPayersAdminPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contributions, setContributions] = useState<ContributionGroup[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch('/api/reports/contribution-payers?period=monthly');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (!mounted) return;
        setContributions(data.contributions || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Error');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, []);

  const downloadCSV = (rows: Array<Record<string, string | number | null>>, filename = 'download.csv') => {
    if (!rows || rows.length === 0) return;
    const keys = Object.keys(rows[0]);
    const csv = [keys.join(','), ...rows.map(r => keys.map(k => {
      const v = r[k];
      if (v === null || v === undefined) return '';
      const s = typeof v === 'string' ? v : String(v);
      // escape quotes
      return '"' + s.replace(/"/g, '""') + '"';
    }).join(','))].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadContribution = (c: ContributionGroup) => {
    const rows = c.payers.map(p => ({
      contributionId: c.contributionId,
      contributionTitle: c.contributionTitle,
      contributionAmount: c.contributionAmount.toFixed ? c.contributionAmount.toFixed(2) : String(c.contributionAmount),
      receiptId: p.receiptId,
      userId: p.userId,
      username: p.username,
      displayName: p.displayName,
      stateCode: p.stateCode,
      paidAmount: p.paidAmount.toFixed ? p.paidAmount.toFixed(2) : String(p.paidAmount),
      status: p.status,
      timestamp: (new Date(p.timestamp)).toISOString(),
    }));
    downloadCSV(rows, `contribution_${c.contributionId}_payers.csv`);
  };

  const handleDownloadAll = () => {
    const rows: Array<Record<string, string | number | null>> = [];
    for (const c of contributions) {
      for (const p of c.payers) {
        rows.push({
          contributionId: c.contributionId,
          contributionTitle: c.contributionTitle,
          contributionAmount: c.contributionAmount.toFixed ? c.contributionAmount.toFixed(2) : String(c.contributionAmount),
          receiptId: p.receiptId,
          userId: p.userId,
          username: p.username,
          displayName: p.displayName,
          stateCode: p.stateCode,
          paidAmount: p.paidAmount.toFixed ? p.paidAmount.toFixed(2) : String(p.paidAmount),
          status: p.status,
          timestamp: (new Date(p.timestamp)).toISOString(),
        });
      }
    }
    downloadCSV(rows, `contribution_payers_all.csv`);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Contribution Payers</h1>
        <div className="flex gap-2">
          <button onClick={handleDownloadAll} className="px-3 py-1 bg-blue-600 text-white rounded">Download All CSV</button>
        </div>
      </div>

      <div className="space-y-6">
        {contributions.length === 0 && <div>No contributions found for the selected period.</div>}
        {contributions.map(c => (
          <div key={c.contributionId} className="border rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-medium text-gray-900">{c.contributionTitle}</div>
                <div className="text-sm text-gray-600">ID: {c.contributionId} — Amount: {c.contributionAmount}</div>
              </div>
              <div>
                <button onClick={() => handleDownloadContribution(c)} className="px-2 py-1 bg-green-600 text-white rounded">Download CSV</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-600">
                    <th className="pr-4">User</th>
                    <th className="pr-4">Username</th>
                    <th className="pr-4">State</th>
                    <th className="pr-4">Paid</th>
                    <th className="pr-4">Status</th>
                    <th className="pr-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {c.payers.map(p => (
                    <tr key={p.receiptId} className="border-t">
                      <td className="py-2">{p.displayName || '-'}</td>
                      <td>{p.username || '-'}</td>
                      <td>{p.stateCode || '-'}</td>
                      <td>{p.paidAmount}</td>
                      <td>{p.status}</td>
                      <td>{new Date(p.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
