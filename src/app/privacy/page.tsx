"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2025";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">Privacy Policy</h1>
          <p className="text-center text-gray-600">CDS LedgerPro - NYSC Financial Management</p>
          <p className="text-center text-sm text-gray-500 mt-2">Last Updated: {lastUpdated}</p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-sm rounded-lg p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <p className="text-gray-700">
              This privacy policy explains how CDS LedgerPro collects, uses, and protects the personal information 
              of NYSC corp members who use our financial management platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Personal Information</h3>
                <ul className="text-gray-700 text-sm space-y-1 ml-4">
                  <li>• Full name and NYSC state code</li>
                  <li>• Email address and phone number</li>
                  <li>• CDS group and platoon information</li>
                  <li>• Account login credentials</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Financial Information</h3>
                <ul className="text-gray-700 text-sm space-y-1 ml-4">
                  <li>• CDS contribution records and payments</li>
                  <li>• Financial transactions and balances</li>
                  <li>• Payment history and receipts</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="text-gray-700 text-sm space-y-2 ml-4">
              <li>• Manage your CDS financial contributions and records</li>
              <li>• Generate financial reports and statements</li>
              <li>• Send important updates about your account</li>
              <li>• Provide customer support when needed</li>
              <li>• Ensure platform security and prevent fraud</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Protect Your Data</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• All data is encrypted and stored securely</li>
                <li>• Access is restricted to authorized personnel only</li>
                <li>• We use secure connections (HTTPS) for all communications</li>
                <li>• Regular security updates and monitoring</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 text-sm mb-2">
                <strong>We do NOT sell or share your personal information with third parties.</strong>
              </p>
              <p className="text-gray-700 text-sm">
                Information may only be shared with NYSC officials or CDS leadership when required 
                for official purposes or as required by law.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <ul className="text-gray-700 text-sm space-y-2 ml-4">
              <li>• View and update your personal information</li>
              <li>• Request a copy of your data</li>
              <li>• Delete your account and data</li>
              <li>• Report any privacy concerns</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700 text-sm">
              We keep your information for the duration of your NYSC service year and up to 
              2 years after completion for record-keeping purposes. You can request earlier 
              deletion of your personal data at any time.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 text-sm mb-2">
              If you have questions about this privacy policy or your data:
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Email:</strong> <a href="mailto:privacy@cdsledgerpro.com" className="text-blue-600 hover:underline">privacy@cdsledgerpro.com</a>
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link href="/auth/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Back to Sign Up
            </Link>
          </div>
          <p className="text-gray-600 text-sm">
            By using CDS LedgerPro, you agree to this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}