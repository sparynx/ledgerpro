"use client";
import { useState } from 'react';

export default function ExportReportButton({ small = false }: { small?: boolean }) {
  const [loadingType, setLoadingType] = useState<null | 'monthly' | 'weekly'>(null);
<<<<<<< HEAD
=======
  const [loadingGrouped, setLoadingGrouped] = useState(false);
>>>>>>> e201f34 (added stuff)
  const [error, setError] = useState('');

  const handleExport = async (period: 'monthly' | 'weekly') => {
    setLoadingType(period);
    setError('');
    try {
      const res = await fetch(`/api/reports/export?period=${period}`);
      if (!res.ok) throw new Error('Failed to export report');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipts_report_${period}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || 'Export failed');
    } finally {
      setLoadingType(null);
    }
  };

<<<<<<< HEAD
=======
  const handleGroupedExport = async () => {
    setLoadingGrouped(true);
    setError('');
    try {
      const res = await fetch(`/api/reports/export?period=monthly&group=contribution`);
      if (!res.ok) throw new Error('Failed to export grouped report');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipts_report_monthly_by_contribution.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || 'Grouped export failed');
    } finally {
      setLoadingGrouped(false);
    }
  };

>>>>>>> e201f34 (added stuff)
  const btnClass = small
    ? 'px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors'
    : 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50';

  return (
    <div className={small ? 'flex gap-2 mb-0' : 'mb-4 flex flex-col gap-2'}>
      <button
        onClick={() => handleExport('monthly')}
        disabled={loadingType !== null}
        className={btnClass}
      >
        {loadingType === 'monthly' ? 'Exporting...' : 'Export Monthly'}
      </button>
      <button
        onClick={() => handleExport('weekly')}
        disabled={loadingType !== null}
        className={btnClass}
      >
        {loadingType === 'weekly' ? 'Exporting...' : 'Export Weekly'}
      </button>
<<<<<<< HEAD
=======
      <button
        onClick={handleGroupedExport}
        disabled={loadingType !== null || loadingGrouped}
        className={btnClass}
      >
        {loadingGrouped ? 'Exporting...' : 'Export by Contribution'}
      </button>
>>>>>>> e201f34 (added stuff)
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
}
