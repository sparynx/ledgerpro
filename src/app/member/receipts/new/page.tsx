import UserProtectedRoute from '@/components/auth/UserProtectedRoute';
import ReceiptUpload from '@/components/receipts/ReceiptUpload';

export default function NewReceiptPage() {
  return (
    <UserProtectedRoute>
      <ReceiptUpload />
    </UserProtectedRoute>
  );
}
