import React from 'react';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-white py-4 sm:py-8 px-2 sm:px-4 lg:px-8">
      <div className="max-w-full sm:max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">LedgerPro Documentation</h1>
        <div className="w-12 sm:w-16 h-1 bg-blue-500 mb-6 sm:mb-8 rounded-full"></div>
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Getting Started</h2>
          <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
            <li>Open the website in your browser (URL provided by your group admin).</li>
            <li>Use the navigation bar to access Dashboard, Contributions, Receipts, Expenses, Members, and more.</li>
          </ul>
        </section>
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Signing In & Profile Setup</h2>
          <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
            <li>Click <b>Sign In</b> at the top right and enter your credentials.</li>
            <li>On first login, complete your profile (name, state code, etc.).</li>
            <li>Save your profile to access all features.</li>
          </ul>
        </section>
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Dashboard Overview</h2>
          <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
            <li>The dashboard shows your financial summary: total contributions, receipts, and expenses.</li>
            <li>Admins see group-wide stats; members see their own.</li>
            <li>All values update automatically as records are added.</li>
          </ul>
        </section>
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Contributions</h2>
          <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
            <li>View all group contributions and their details.</li>
            <li>Members can see their own contributions and make new ones if enabled.</li>
            <li>Admins can add, edit, or remove contribution types.</li>
          </ul>
        </section>
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Receipts</h2>
          <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
            <li>Members can upload receipts for their contributions.</li>
            <li>Click <b>Upload Receipt</b> and fill in the form (amount, description, image).</li>
            <li>Admins review, approve, or reject receipts.</li>
            <li>All receipts are listed with status (Pending, Approved, Rejected).</li>
          </ul>
        </section>
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Expenses</h2>
          <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
            <li>Admins can add and manage group expenses.</li>
            <li>Each expense includes amount, description, and date.</li>
            <li>Expenses are visible to all members for transparency.</li>
          </ul>
        </section>
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Admin Features</h2>
          <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
            <li><b>Members List:</b> Admins can view all members, their details, and receipts.</li>
            <li><b>Member Details:</b> Click a username to see full info and receipt history.</li>
            <li><b>Reports:</b> Admins can export financial reports as CSV for record-keeping.</li>
            <li><b>Settings:</b> Admins can manage group info and permissions.</li>
          </ul>
        </section>
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Exporting Reports</h2>
          <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
            <li>On the admin dashboard, click <b>Export as CSV</b> to download financial data.</li>
            <li>Choose the report type (contributions, receipts, expenses).</li>
            <li>The file will download to your device for use in Excel or Google Sheets.</li>
          </ul>
        </section>
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Contact & Support</h2>
          <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
            <li>Visit the <b>Contact</b> page for the list of executive committee members (EXCO) and their roles.</li>
            <li>For help, email the admin or use the contact form if available.</li>
            <li>The About page provides more info about the group and mission.</li>
          </ul>
        </section>
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Tips</h2>
          <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-xs sm:text-base mb-3 sm:mb-4">
            <li>Use the website on any device—it's fully responsive.</li>
            <li>Always keep your profile up to date.</li>
            <li>For security, log out after use on shared devices.</li>
            <li>If you forget your password, use the reset link or contact admin.</li>
          </ul>
        </section>
        <div className="text-center text-xs text-gray-400 mt-6 sm:mt-8">For more help, see the About or Contact pages, or reach out to your group admin.</div>
      </div>
    </div>
  );
}
