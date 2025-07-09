import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFilters, clearFilters } from '../store/jobSlice';
import { JobFilters as JobFiltersType } from '../store/jobSlice';

interface JobFiltersProps {
  onFiltersChange?: (filters: JobFiltersType) => void;
  className?: string;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  onFiltersChange,
  className = '',
}) => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.job);
  const [localFilters, setLocalFilters] = useState<JobFiltersType>(filters);

  const handleFilterChange = (key: keyof JobFiltersType, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
    onFiltersChange?.(newFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    dispatch(clearFilters());
    onFiltersChange?.({});
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={handleClearFilters}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            value={localFilters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Job title, company, or keywords"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={localFilters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            placeholder="City, state, or country"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <select
            value={localFilters.type || ''}
            onChange={(e) => handleFilterChange('type', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={localFilters.experienceLevel || ''}
            onChange={(e) => handleFilterChange('experienceLevel', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Levels</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
          </select>
        </div>

        {/* Remote Work */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localFilters.remote || false}
              onChange={(e) => handleFilterChange('remote', e.target.checked || undefined)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Remote work only</span>
          </label>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary Range
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={localFilters.salaryRange?.min || ''}
              onChange={(e) => handleFilterChange('salaryRange', {
                ...localFilters.salaryRange,
                min: e.target.value ? parseInt(e.target.value) : undefined,
              })}
              placeholder="Min"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={localFilters.salaryRange?.max || ''}
              onChange={(e) => handleFilterChange('salaryRange', {
                ...localFilters.salaryRange,
                max: e.target.value ? parseInt(e.target.value) : undefined,
              })}
              placeholder="Max"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 