// Helper script to get Firebase UID
// Run this in your browser console after signing in

console.log('=== Firebase UID Helper ===');
console.log('1. Make sure you are signed in to your app');
console.log('2. Run this code in your browser console:');
console.log('');
console.log('// Method 1: Direct access');
console.log('firebase.auth().currentUser.uid');
console.log('');
console.log('// Method 2: With newer Firebase SDK');
console.log('import { getAuth } from "firebase/auth";');
console.log('const auth = getAuth();');
console.log('console.log(auth.currentUser.uid);');
console.log('');
console.log('// Method 3: From AuthContext (if using React)');
console.log('// In your React component:');
console.log('const { user } = useAuth();');
console.log('console.log(user.uid);');
console.log('');
console.log('3. Copy the UID and update the create-admin.js script');
console.log('4. Run: node scripts/create-admin.js'); 