import React, { useEffect, useState } from 'react';
import { JobCard } from '../components/JobCard';
import { JobFilters } from '../components/JobFilters';
import { useJobs } from '../hooks/useJobs';
import { Job } from '../store/jobSlice';

export const JobSearchScreen: React.FC = () => {
  const {
    jobs,
    isLoading,
    error,
    hasMore,
    isEmpty,
    searchJobs,
    loadMoreJobs,
    clearError,
  } = useJobs();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    // Load initial jobs
    searchJobs();
  }, [searchJobs]);

  const handleJobView = (job: Job) => {
    setSelectedJob(job);
  };

  const handleJobApply = (job: Job) => {
    // Handle job application
    console.log('Apply to job:', job.id);
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      loadMoreJobs();
    }
  };

  const handleFiltersChange = () => {
    searchJobs();
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={clearError}
            className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Search</h1>
        <p className="mt-2 text-gray-600">Find your next opportunity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <JobFilters onFiltersChange={handleFiltersChange} />
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3">
          {isLoading && jobs.length === 0 ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : isEmpty ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onView={handleJobView}
                  onApply={handleJobApply}
                />
              ))}

              {hasMore && (
                <div className="text-center py-6">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Loading...' : 'Load More Jobs'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Company</h3>
                  <p className="text-gray-600">{selectedJob.company}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600">{selectedJob.location}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                {selectedJob.benefits && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Benefits</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => handleJobApply(selectedJob)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 