import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute';
import AdminNavbar from '@/components/layout/AdminNavbar';
import ContributionForm from '@/components/contributions/ContributionForm';

export default function NewContributionPage() {
  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Contribution</h1>
            <p className="text-gray-600">Add a new contribution for members to pay</p>
          </div>
          <ContributionForm />
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
