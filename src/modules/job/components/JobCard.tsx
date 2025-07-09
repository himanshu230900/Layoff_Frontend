import React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { bookmarkJobAsync, unbookmarkJobAsync } from '../store/jobSlice';
import { Job } from '../store/jobSlice';

interface JobCardProps {
  job: Job;
  onView?: (job: Job) => void;
  onApply?: (job: Job) => void;
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onView,
  onApply,
  className = '',
}) => {
  const dispatch = useAppDispatch();

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (job.isBookmarked) {
      dispatch(unbookmarkJobAsync(job.id));
    } else {
      dispatch(bookmarkJobAsync(job.id));
    }
  };

  const handleView = () => {
    onView?.(job);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    onApply?.(job);
  };

  const getStatusColor = (status: Job['applicationStatus']) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatSalary = (salary: Job['salary']) => {
    if (!salary) return 'Salary not specified';
    return `${salary.currency}${salary.min.toLocaleString()} - ${salary.currency}${salary.max.toLocaleString()}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={handleView}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          {job.companyLogo && (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {job.title}
            </h3>
            <p className="text-gray-600 mb-2">{job.company}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(job.postedAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full transition-colors ${
              job.isBookmarked
                ? 'text-yellow-500 hover:text-yellow-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill={job.isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 text-sm line-clamp-2">
          {job.description}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.applicationStatus)}`}>
            {job.applicationStatus === 'not-applied' ? 'Not Applied' : job.applicationStatus}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {job.type}
          </span>
          {job.remote && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Remote
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">
            {formatSalary(job.salary)}
          </span>
          {job.applicationStatus === 'not-applied' && (
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 