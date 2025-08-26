"use client";
import { useState } from 'react';

export default function ExportReportButton({ small = false }: { small?: boolean }) {
  const [loadingType, setLoadingType] = useState<null | 'monthly' | 'weekly'>(null);
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
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
}
