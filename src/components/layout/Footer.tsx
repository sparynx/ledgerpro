import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info - Streamlined */}
          <div className="sm:col-span-2 lg:col-span-1 group">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                CDS LedgerPro
              </h3>
              <div className="w-8 h-0.5 bg-blue-400 rounded-full mb-3 group-hover:w-16 transition-all duration-500 ease-out"></div>
            </div>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
              Professional financial management platform for CDS groups. Track contributions, 
              expenses, and generate reports with enterprise-grade security.
            </p>
            
            {/* Social Links - Enhanced animations */}
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-8 h-8 bg-slate-800/50 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group/social hover:scale-110 hover:rotate-3 hover:shadow-lg hover:shadow-blue-500/25"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 text-slate-400 group-hover/social:text-white transition-all duration-300 group-hover/social:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-slate-800/50 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group/social hover:scale-110 hover:-rotate-3 hover:shadow-lg hover:shadow-blue-500/25"
                aria-label="Twitter"
              >
                <svg className="h-4 w-4 text-slate-400 group-hover/social:text-white transition-all duration-300 group-hover/social:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-slate-800/50 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group/social hover:scale-110 hover:rotate-6 hover:shadow-lg hover:shadow-blue-500/25"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 text-slate-400 group-hover/social:text-white transition-all duration-300 group-hover/social:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links - Enhanced animations */}
          <div className="group">
            <h3 className="text-sm font-semibold text-blue-200 tracking-wider uppercase mb-4 group-hover:text-blue-100 transition-colors duration-300">
              Platform
            </h3>
            <ul className="space-y-2">
              <li className="transform hover:translate-x-2 transition-transform duration-200">
                <Link href="/about" className="text-slate-300 hover:text-blue-300 transition-all duration-200 text-sm relative inline-block hover:scale-105">
                  <span className="relative z-10">About Us</span>
                  <span className="absolute inset-0 bg-blue-500/10 rounded px-1 -mx-1 scale-0 hover:scale-100 transition-transform duration-200 origin-left"></span>
                </Link>
              </li>


              <li className="transform hover:translate-x-2 transition-transform duration-200">
                <Link href="/contact" className="text-slate-300 hover:text-blue-300 transition-all duration-200 text-sm relative inline-block hover:scale-105">
                  <span className="relative z-10">Contact</span>
                  <span className="absolute inset-0 bg-blue-500/10 rounded px-1 -mx-1 scale-0 hover:scale-100 transition-transform duration-200 origin-left"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support - Enhanced animations */}
          <div className="group">
            <h3 className="text-sm font-semibold text-blue-200 tracking-wider uppercase mb-4 group-hover:text-blue-100 transition-colors duration-300">
              Support
            </h3>
            <ul className="space-y-2">

              <li className="transform hover:translate-x-2 transition-transform duration-200">
                <Link href="/docs" className="text-slate-300 hover:text-blue-300 transition-all duration-200 text-sm relative inline-block hover:scale-105">
                  <span className="relative z-10">Documentation</span>
                  <span className="absolute inset-0 bg-blue-500/10 rounded px-1 -mx-1 scale-0 hover:scale-100 transition-transform duration-200 origin-left"></span>
                </Link>
              </li>

              <li className="transform hover:translate-x-2 transition-transform duration-200">
                <a href="mailto:adebisitimileyin23@gmail.com" className="text-blue-300 hover:text-blue-200 transition-all text-sm relative inline-block hover:scale-105 hover:shadow-lg">
                  <span className="relative z-10">Support Email</span>
                  <span className="absolute inset-0 bg-blue-500/10 rounded px-1 -mx-1 scale-0 hover:scale-100 transition-transform duration-200 origin-left"></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Trust - Enhanced animations */}
          <div className="group">
            <h3 className="text-sm font-semibold text-blue-200 tracking-wider uppercase mb-4 group-hover:text-blue-100 transition-colors duration-300">
              Legal
            </h3>
            <ul className="space-y-2">
              <li className="transform hover:translate-x-2 transition-transform duration-200">
                <Link href="/privacy" className="text-slate-300 hover:text-blue-300 transition-all duration-200 text-sm relative inline-block hover:scale-105">
                  <span className="relative z-10">Privacy Policy</span>
                  <span className="absolute inset-0 bg-blue-500/10 rounded px-1 -mx-1 scale-0 hover:scale-100 transition-transform duration-200 origin-left"></span>
                </Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-200">
                <Link href="/terms" className="text-slate-300 hover:text-blue-300 transition-all duration-200 text-sm relative inline-block hover:scale-105">
                  <span className="relative z-10">Terms of Service</span>
                  <span className="absolute inset-0 bg-blue-500/10 rounded px-1 -mx-1 scale-0 hover:scale-100 transition-transform duration-200 origin-left"></span>
                </Link>
              </li>
            </ul>
            
            {/* Trust Badges - Enhanced animations */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-xs text-slate-400 hover:text-green-300 transition-colors duration-300 cursor-default group/badge">
                <svg className="w-3 h-3 text-green-400 group-hover/badge:scale-125 group-hover/badge:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="group-hover/badge:font-medium transition-all duration-300">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400 hover:text-blue-300 transition-colors duration-300 cursor-default group/badge">
                <svg className="w-3 h-3 text-blue-400 group-hover/badge:scale-125 group-hover/badge:-rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="group-hover/badge:font-medium transition-all duration-300">SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="mt-8 pt-6 border-t border-slate-700/50 hover:border-slate-600/50 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-slate-400 text-sm text-center sm:text-left hover:text-slate-300 transition-colors duration-300">
              © {currentYear} CDS LedgerPro. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm flex items-center hover:text-slate-300 transition-colors duration-300 group/heart">
              <span>Built with</span>
              <svg className="w-4 h-4 text-red-400 mx-1 group-hover/heart:scale-125 group-hover/heart:text-red-300 transition-all duration-300 group-hover/heart:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>for CDS groups</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}