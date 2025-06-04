'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full space-y-8 text-center relative z-10">
        {/* Logo and title */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
            <span className="text-4xl font-bold text-white">IS</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
        </div>

        {/* Error message */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 transform hover:scale-[1.02] transition-all duration-300">
          <p className="text-gray-600 text-lg mb-6">
            We&apos;re sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="text-sm text-gray-500 mb-8">
            <p className="font-medium mb-2">Not found path:</p>
            <code className="block p-3 bg-gray-50/50 rounded-xl text-gray-700 font-mono text-sm break-all border border-gray-100">
              {pathname}
            </code>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex-1 sm:flex-none px-8 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Additional information */}
        <div className="text-sm text-gray-500 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
          <p className="mb-2">Need help? Contact technical support</p>
          <Link
            href="/support"
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all duration-300"
          >
            Contact Support
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}