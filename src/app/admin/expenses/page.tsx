"use client";

import { useEffect, useState } from "react";

interface Expense {
  id: string;
  amount: number;
  description: string;
  project: string;
  createdAt: string;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch("/api/expenses");
      if (res.ok) {
        const data = await res.json();
        setExpenses(data);
      } else {
        setError("Failed to fetch expenses");
      }
    } catch {
      setError("Error loading expenses");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-4 md:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow p-2 sm:p-4 md:p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Expenses</h1>
          <a
            href="/admin/expenses/new"
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors text-center"
          >
            + Log Expense
          </a>
        </div>
        <div className="mb-4 flex flex-col sm:flex-row justify-end gap-2">
          <a
            href="/api/expenses/export"
            className="w-full sm:w-auto px-3 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded text-sm font-medium hover:bg-blue-100 transition-colors text-center"
            download
          >
            Export as CSV
          </a>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-center">{error}</div>
        ) : expenses.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No expenses logged yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg text-xs sm:text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-2 sm:px-4 py-2 text-left font-semibold text-blue-800 uppercase tracking-wider">Amount</th>
                  <th className="px-2 sm:px-4 py-2 text-left font-semibold text-blue-800 uppercase tracking-wider">Description</th>
                  <th className="px-2 sm:px-4 py-2 text-left font-semibold text-blue-800 uppercase tracking-wider">Project</th>
                  <th className="px-2 sm:px-4 py-2 text-left font-semibold text-blue-800 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {expenses.map((exp) => (
                  <tr key={exp.id}>
                    <td className="px-2 sm:px-4 py-2 font-semibold text-blue-700">{formatCurrency(exp.amount)}</td>
                    <td className="px-2 sm:px-4 py-2 text-gray-800">{exp.description}</td>
                    <td className="px-2 sm:px-4 py-2 text-gray-700">{exp.project}</td>
                    <td className="px-2 sm:px-4 py-2 text-gray-500">{formatDate(exp.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
