import React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { updateApplicationStatusAsync } from '../store/applicationSlice';
import type { Application } from '../store/applicationSlice';

interface ApplicationCardProps {
  application: Application;
  onView?: (application: Application) => void;
  className?: string;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onView,
  className = '',
}) => {
  const dispatch = useAppDispatch();

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = async (newStatus: Application['status']) => {
    await dispatch(updateApplicationStatusAsync({
      applicationId: application.id,
      status: newStatus,
    }));
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
      className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow ${className}`}
      onClick={() => onView?.(application)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {application.jobTitle}
          </h3>
          <p className="text-gray-600 mb-2">{application.company}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Applied: {formatDate(application.appliedAt)}</span>
            <span>Updated: {formatDate(application.lastUpdated)}</span>
          </div>
        </div>
        
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
          {application.status.replace('-', ' ')}
        </span>
      </div>

      {application.notes && (
        <div className="mb-4">
          <p className="text-sm text-gray-700 line-clamp-2">{application.notes}</p>
        </div>
      )}

      {application.interviewSchedule && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md">
          <h4 className="text-sm font-medium text-blue-900 mb-1">Interview Scheduled</h4>
          <p className="text-sm text-blue-700">
            {formatDate(application.interviewSchedule.date)} at {application.interviewSchedule.time}
          </p>
          <p className="text-sm text-blue-600">{application.interviewSchedule.type}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {application.status === 'applied' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatusUpdate('under-review');
              }}
              className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200"
            >
              Mark Under Review
            </button>
          )}
          {(application.status === 'applied' || application.status === 'under-review') && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatusUpdate('interview');
              }}
              className="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200"
            >
              Schedule Interview
            </button>
          )}
        </div>

        {application.followUpDate && (
          <div className="text-xs text-gray-500">
            Follow up: {formatDate(application.followUpDate)}
          </div>
        )}
      </div>
    </div>
  );
}; 