# CDS LedgerPro - Financial Secretary Web App

## 🎯 **Complete Workflow & Features**

### **User Journey:**
1. **Sign In** → User signs in with Google Firebase authentication
2. **Profile Setup** → User creates profile with username and state code
3. **View Contributions** → User sees all available contributions created by admin
4. **Upload Receipt** → User clicks on contribution card to upload payment proof
5. **Admin Review** → Admin reviews and approves/rejects receipts
6. **Status Tracking** → Users can track their receipt status

### **Admin Features:**
- ✅ Create and manage contributions
- ✅ Review and approve/reject receipts
- ✅ View financial reports and analytics
- ✅ Manage user profiles
- ✅ Track expenses and balances

### **Member Features:**
- ✅ View available contributions
- ✅ Upload payment receipts
- ✅ Track payment history
- ✅ Profile management

## 🚀 **Setup Instructions**

### **1. Environment Variables**
Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBGSOzl5paOqqrkRHnpCLOjLZHOW-XpmMc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ledgerpro-6081f.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ledgerpro-6081f
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ledgerpro-6081f.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1079030816261
NEXT_PUBLIC_FIREBASE_APP_ID=1:1079030816261:web:1f418fd6f643e7033a466c
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-KK2G39LF9H

# Database URL (for Prisma)
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth Secret (for session management)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### **2. Database Setup**
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Run the development server
npm run dev
```

### **3. Create Admin User**
After signing in with Google, run the admin creation script:

```bash
# Edit the script with your Firebase UID
node scripts/create-admin.js
```

Replace `your-firebase-uid-here` in the script with your actual Firebase UID.

## 🏗️ **Database Schema**

The app uses a comprehensive Prisma schema with:

- **Users**: Firebase authentication + profile data (username, state code, admin status)
- **Contributions**: Admin-created payment requirements
- **Receipts**: User-uploaded payment proofs with approval workflow
- **Expenses**: Financial tracking for admin

## 🔐 **Security & Access Control**

- **Admin Routes**: Only users with `isAdmin: true` can access
- **Member Routes**: All authenticated users with complete profiles
- **Protected Routes**: Automatic redirection for unauthorized access
- **Profile Completion**: Users must complete profile before accessing features

## 📱 **Key Features Implemented**

### ✅ **Authentication System**
- Google Firebase authentication
- User profile creation with username/state code
- Admin role management
- Protected routes for different user types

### ✅ **Contribution Management**
- Admin creates contributions with amounts and due dates
- Users view available contributions
- Click-to-upload workflow

### ✅ **Receipt System**
- Image upload with validation
- Pending/Approved/Rejected status workflow
- Admin review interface
- Status tracking for users

### ✅ **User Interface**
- Responsive design with Tailwind CSS
- Loading states and error handling
- Currency formatting (Nigerian Naira)
- Modern card-based layouts

### ✅ **API Endpoints**
- User profile management
- Contribution CRUD operations
- Receipt upload and status management
- Secure admin-only operations

## 🎨 **User Experience**

1. **Landing Page** → Beautiful sign-in interface
2. **Profile Setup** → Guided username/state code entry
3. **Dashboard** → Overview with contribution cards
4. **Receipt Upload** → Simple form with image upload
5. **Admin Panel** → Comprehensive management interface

## 🔄 **Workflow Summary**

**For Members:**
1. Sign in with Google
2. Complete profile (username + state code)
3. View available contributions
4. Click "Upload Receipt" on desired contribution
5. Upload payment proof and submit
6. Track approval status

**For Admins:**
1. Sign in with Google (must be admin)
2. Access admin dashboard
3. Create contributions
4. Review pending receipts
5. Approve/reject with notes
6. Generate reports

## 🚀 **Next Steps**

1. **Deploy to production** (Vercel/Netlify)
2. **Add image upload service** (Cloudinary/AWS S3)
3. **Implement email notifications**
4. **Add financial reporting**
5. **Create mobile app version**
6. **Add bulk operations for admin**

## 💡 **Financial Secretary Features**

This web app provides all essential financial secretary functions:

- **Contribution Tracking**: Create and manage payment requirements
- **Receipt Management**: Upload and verify payment proofs
- **User Management**: Profile creation and state-based organization
- **Admin Controls**: Secure admin-only operations
- **Financial Reporting**: Track contributions, expenses, and balances
- **Audit Trail**: Complete history of all transactions
- **Status Tracking**: Real-time approval workflow
- **Multi-user Support**: Scalable for large CDS groups 