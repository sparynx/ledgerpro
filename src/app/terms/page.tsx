"use client";

import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Mobile-optimized container */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
              <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-blue-700">Legal Information</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              By using CDS LedgerPro, you agree to these terms and conditions. 
              Please read them carefully.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              
              {/* Welcome Section */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  Welcome to CDS LedgerPro
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  CDS LedgerPro is a free financial management platform designed specifically for 
                  CDS (Cooperative Development Society) groups in Nigeria. By accessing or using 
                  our platform, you agree to be bound by these Terms of Service.
                </p>
              </div>

              {/* Terms Sections */}
              <div className="space-y-8">
                
                {/* 1. Account Creation */}
                <div className="group">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                      <span className="text-green-700 font-bold text-sm">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                        Account Creation & Security
                      </h3>
                      <div className="prose prose-gray max-w-none">
                        <ul className="space-y-2 text-gray-700">
                          <li>You must provide accurate, complete, and current information during registration</li>
                          <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                          <li>You must notify us immediately of any unauthorized access to your account</li>
                          <li>Only authorized CDS group members should have access to group financial data</li>
                          <li>Each user is responsible for all activities under their account</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Acceptable Use */}
                <div className="group">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                      <span className="text-blue-700 font-bold text-sm">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                        Acceptable Use Policy
                      </h3>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 mb-3">You agree to use CDS LedgerPro only for lawful purposes and in accordance with these terms. You must not:</p>
                        <ul className="space-y-2 text-gray-700">
                          <li>Use the platform for any illegal activities or money laundering</li>
                          <li>Upload false, misleading, or fraudulent financial information</li>
                          <li>Attempt to gain unauthorized access to other groups' data</li>
                          <li>Interfere with or disrupt the platform's operation</li>
                          <li>Use the platform to harass, abuse, or harm other users</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Data & Privacy */}
                <div className="group">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                      <span className="text-purple-700 font-bold text-sm">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                        Data Protection & Responsibility
                      </h3>
                      <div className="prose prose-gray max-w-none">
                        <ul className="space-y-2 text-gray-700">
                          <li>We implement industry-standard security measures to protect your data</li>
                          <li>You remain responsible for creating regular backups of important data</li>
                          <li>We are not liable for data loss due to user error or external factors</li>
                          <li>Your data will be processed in accordance with our Privacy Policy</li>
                          <li>Financial records should be independently verified and maintained</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Service Availability */}
                <div className="group">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-200">
                      <span className="text-yellow-700 font-bold text-sm">4</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                        Service Availability & Support
                      </h3>
                      <div className="prose prose-gray max-w-none">
                        <ul className="space-y-2 text-gray-700">
                          <li>CDS LedgerPro is provided free of charge to CDS groups</li>
                          <li>We strive for 99.9% uptime but cannot guarantee uninterrupted service</li>
                          <li>Planned maintenance will be communicated in advance when possible</li>
                          <li>Support is provided on a best-effort basis via email and documentation</li>
                          <li>No service level agreements (SLAs) are provided for the free service</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Account Termination */}
                <div className="group">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                      <span className="text-red-700 font-bold text-sm">5</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                        Account Suspension & Termination
                      </h3>
                      <div className="prose prose-gray max-w-none">
                        <ul className="space-y-2 text-gray-700">
                          <li>We reserve the right to suspend accounts that violate these terms</li>
                          <li>Serious violations may result in immediate account termination</li>
                          <li>You may delete your account at any time through the platform settings</li>
                          <li>Upon termination, your access to the platform and data will be revoked</li>
                          <li>We may retain certain data as required by law or for legitimate business purposes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. Limitation of Liability */}
                <div className="group">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                      <span className="text-gray-700 font-bold text-sm">6</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                        Limitation of Liability
                      </h3>
                      <div className="prose prose-gray max-w-none">
                        <ul className="space-y-2 text-gray-700">
                          <li>CDS LedgerPro is provided "as is" without warranties of any kind</li>
                          <li>We are not liable for any financial decisions made using our platform</li>
                          <li>Users are responsible for the accuracy of all financial data entered</li>
                          <li>We recommend maintaining independent financial records and audits</li>
                          <li>Our liability shall not exceed the amount paid for our services (₦0 for free users)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 7. Changes to Terms */}
                <div className="group">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-200">
                      <span className="text-indigo-700 font-bold text-sm">7</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                        Changes to These Terms
                      </h3>
                      <div className="prose prose-gray max-w-none">
                        <ul className="space-y-2 text-gray-700">
                          <li>We may update these terms at any time to reflect changes in our services</li>
                          <li>Material changes will be communicated via email or platform notifications</li>
                          <li>Continued use of the platform after changes constitutes acceptance</li>
                          <li>If you disagree with changes, you should discontinue use of the platform</li>
                          <li>The current version will always be available on our website</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Questions or Concerns?
                </h3>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service or need clarification 
                  on any point, please don't hesitate to contact our support team.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <a 
                    href="mailto:support@cdsledgerpro.com" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    support@cdsledgerpro.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 sm:mt-12 text-center space-y-4">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/auth/signup" 
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
                Back to Sign Up
              </Link>
              <Link 
                href="/privacy" 
                className="inline-flex items-center px-6 py-3 text-base font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Privacy Policy
              </Link>
            </div>
            
            <p className="text-sm text-gray-500">
              By using CDS LedgerPro, you acknowledge that you have read and understood these terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}