import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute';
import AdminNavbar from '@/components/layout/AdminNavbar';
import ReceiptManagement from '@/components/receipts/ReceiptManagement';

export default function AdminReceiptsPage() {
  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* <AdminNavbar /> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ReceiptManagement />
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
