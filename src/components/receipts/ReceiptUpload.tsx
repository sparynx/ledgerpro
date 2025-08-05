'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

interface Contribution {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
}

// Custom Loader Component
const CustomLoader = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 rounded-full border-2 border-slate-200"></div>
      <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
      <div className="absolute inset-1 rounded-full bg-slate-50 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

// Dropzone Component
const ImageDropzone = ({ 
  onFileSelect, 
  error, 
  isUploading, 
  uploadProgress 
}: { 
  onFileSelect: (file: File) => void;
  error: string;
  isUploading: boolean;
  uploadProgress: number;
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileSelection = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      return;
    }
    
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-bold text-gray-800">
        Receipt Image
      </label>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 transition-all duration-300 ${
          isDragOver
            ? 'border-blue-400 bg-blue-25 scale-[1.02]'
            : error
            ? 'border-red-300 bg-red-25'
            : 'border-slate-300 bg-slate-25 hover:border-blue-300 hover:bg-slate-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="text-center">
            <div className="relative mx-auto mb-3 sm:mb-4">
              <CustomLoader size="lg" />
            </div>
            <p className="text-base sm:text-lg font-semibold text-slate-700 mb-2">Uploading Receipt...</p>
            <div className="w-full bg-slate-200 rounded-full h-2 sm:h-3 mb-2">
              <div 
                className="bg-blue-500 h-2 sm:h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">{uploadProgress}% Complete</p>
          </div>
        ) : previewUrl ? (
          <div className="text-center">
            <div className="relative mx-auto mb-3 sm:mb-4 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-slate-200">
              <img 
                src={previewUrl} 
                alt="Receipt preview" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm sm:text-base font-semibold text-slate-800 mb-1 truncate px-2">{selectedFile?.name}</p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : ''}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
              className="mt-2 sm:mt-3 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Choose Different Image
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 mb-2 px-2">
              <span className="block sm:inline">Drop your receipt here or </span>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 underline"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                browse files
              </button>
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Supports: JPG, PNG, GIF (Max 5MB)
            </p>
          </div>
        )}
        
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
};

export default function ReceiptUpload() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const contributionId = searchParams.get('contributionId');

  const [contribution, setContribution] = useState<Contribution | null>(null);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (contributionId) {
      fetchContribution();
    }
    fetchUserProfile();
  }, [contributionId, user?.uid]);

  const fetchContribution = async () => {
    try {
      const response = await fetch(`/api/contributions/${contributionId}`);
      if (response.ok) {
        const data = await response.json();
        setContribution(data);
        setFormData(prev => ({ ...prev, amount: data.amount.toString() }));
      }
    } catch (error) {
      setError('Failed to fetch contribution details');
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/users/profile?firebaseUid=${user?.uid}`);
      if (response.ok) {
        const profile = await response.json();
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }
    setImageFile(file);
    setError('');
  };

  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return interval;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsUploading(true);
    setError('');

    if (!imageFile) {
      setError('Please select an image file');
      setIsSubmitting(false);
      setIsUploading(false);
      return;
    }

    const progressInterval = simulateUploadProgress();

    try {
      const imageUrl = await uploadImage(imageFile);
      setUploadProgress(100);

      const response = await fetch('/api/receipts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userProfile.id,
          contributionId: contributionId,
          amount: parseFloat(formData.amount),
          imageUrl,
          description: formData.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload receipt');
      }

      setTimeout(() => {
        router.push('/member/dashboard?success=receipt_uploaded');
      }, 500);

    } catch (error) {
      clearInterval(progressInterval);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload image');
    }

    const data = await response.json();
    return data.url;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  if (!contributionId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-8 px-4">
        <div className="max-w-sm w-full text-center bg-white rounded-lg shadow-sm p-6 border border-slate-200">
          <div className="mx-auto mb-4 w-16 h-16 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Select a Contribution</h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium mb-6">
            Please select a contribution to upload a receipt for.
          </p>
          <button
            onClick={() => router.push('/member/contributions')}
            className="w-full px-4 py-2.5 border border-transparent rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            View Available Contributions
          </button>
        </div>
      </div>
    );
  }

  if (!contribution) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center py-8 px-4">
        <div className="text-center">
          <CustomLoader size="lg" />
          <p className="mt-3 text-base sm:text-lg font-semibold text-slate-700">Loading contribution details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 border border-slate-200">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Upload Receipt</h1>
                <p className="text-sm sm:text-base text-slate-600 font-medium">Upload proof of payment for your contribution</p>
              </div>
            </div>
          </div>

          {/* Contribution Details */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="font-bold text-slate-900 mb-3 sm:mb-4 text-base sm:text-lg">Contribution Details</h3>
            <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-1">Title</p>
                <p className="font-bold text-slate-900 text-sm sm:text-base">{contribution.title}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-1">Amount</p>
                <p className="font-bold text-slate-900 text-sm sm:text-base">{formatCurrency(contribution.amount)}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-1">Due Date</p>
                <p className="font-bold text-slate-900 text-sm sm:text-base">{new Date(contribution.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-bold text-slate-800 mb-2">
                  Amount Paid
                </label>
                <input
                  type="number"
                  id="amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold transition-colors duration-200 text-sm sm:text-base"
                  placeholder="Enter amount paid"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-bold text-slate-800 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-colors duration-200 text-sm sm:text-base resize-none"
                  placeholder="Add any additional notes..."
                />
              </div>
            </div>

            <ImageDropzone
              onFileSelect={handleFileSelect}
              error={error}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />

            {error && !isUploading && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-lg">
                <p className="text-red-700 font-semibold text-sm sm:text-base">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={isSubmitting}
                className="w-full sm:flex-1 px-4 py-2.5 sm:px-6 sm:py-3 border border-slate-300 rounded-lg text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !imageFile}
                className="w-full sm:flex-1 px-4 py-2.5 sm:px-6 sm:py-3 border border-transparent rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <CustomLoader size="sm" className="mr-2" />
                    Uploading Receipt...
                  </div>
                ) : (
                  'Upload Receipt'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}