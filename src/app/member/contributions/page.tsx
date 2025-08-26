import UserProtectedRoute from '@/components/auth/UserProtectedRoute';
import ContributionsList from '@/components/contributions/ContributionsList';

export default function MemberContributionsPage() {
  return (
    <UserProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Available Contributions</h1>
            <p className="text-gray-600">View and pay for available contributions</p>
          </div>
          <ContributionsList />
        </div>
      </div>
    </UserProtectedRoute>
  );
}
