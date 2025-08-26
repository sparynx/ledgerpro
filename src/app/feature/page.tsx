import React from 'react';

export default function FeaturePage() {
  return (
    <div className="min-h-screen bg-white py-6 px-2 sm:px-4 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">Platform Features</h1>
        <div className="w-12 sm:w-16 h-1 bg-blue-500 mb-6 sm:mb-8 rounded-full"></div>
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Key Features</h2>
          <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
            <li>Modern, mobile-first design for all devices</li>
            <li>Secure authentication and user management</li>
            <li>Dynamic dashboard with real-time stats</li>
            <li>Contribution tracking and management</li>
            <li>Receipt upload, review, and approval workflow</li>
            <li>Expense management for admins</li>
            <li>Export reports as CSV for transparency</li>
            <li>Comprehensive member management (view, drill-down, status)</li>
            <li>Professional UI/UX with custom loaders and blue theme</li>
            <li>Legal pages: Terms, Privacy, About, Contact</li>
            <li>Role-based access for admins and members</li>
            <li>Fully responsive tables and forms</li>
            <li>Accessible and easy to use for all users</li>
          </ul>
        </section>
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Why Use LedgerPro?</h2>
          <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
            <li>Transparency and accountability for group finances</li>
            <li>Easy onboarding for new members and admins</li>
            <li>Automated calculations and reporting</li>
            <li>Designed for CDS groups and similar organizations</li>
            <li>Backed by enterprise-grade security and compliance</li>
          </ul>
        </section>
        <div className="text-center text-xs text-gray-400 mt-6 sm:mt-8">For more, see the Documentation or Contact pages.</div>
      </div>
    </div>
  );
}
