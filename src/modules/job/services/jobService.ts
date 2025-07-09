import { Job, JobFilters } from '../store/jobSlice';

// Base URL for job endpoints
const JOB_BASE_URL = '/api/jobs';

// Types
interface JobSearchParams {
  filters?: JobFilters;
  page?: number;
  limit?: number;
}

interface JobSearchResponse {
  jobs: Job[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Job Service Class
export class JobService {
  private static instance: JobService;

  static getInstance(): JobService {
    if (!JobService.instance) {
      JobService.instance = new JobService();
    }
    return JobService.instance;
  }

  // Search jobs with filters
  async searchJobs(params: JobSearchParams = {}): Promise<JobSearchResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.filters?.search) queryParams.append('search', params.filters.search);
    if (params.filters?.location) queryParams.append('location', params.filters.location);
    if (params.filters?.type) queryParams.append('type', params.filters.type);
    if (params.filters?.experienceLevel) queryParams.append('experienceLevel', params.filters.experienceLevel);
    if (params.filters?.remote !== undefined) queryParams.append('remote', params.filters.remote.toString());
    if (params.filters?.salaryRange?.min) queryParams.append('salaryMin', params.filters.salaryRange.min.toString());
    if (params.filters?.salaryRange?.max) queryParams.append('salaryMax', params.filters.salaryRange.max.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`${JOB_BASE_URL}?${queryParams}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to search jobs');
    }

    return response.json();
  }

  // Get job by ID
  async getJobById(jobId: string): Promise<Job> {
    const response = await fetch(`${JOB_BASE_URL}/${jobId}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get job details');
    }

    return response.json();
  }

  // Bookmark job
  async bookmarkJob(jobId: string, token: string): Promise<Job> {
    const response = await fetch(`${JOB_BASE_URL}/${jobId}/bookmark`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to bookmark job');
    }

    return response.json();
  }

  // Remove bookmark
  async removeBookmark(jobId: string, token: string): Promise<void> {
    const response = await fetch(`${JOB_BASE_URL}/${jobId}/bookmark`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to remove bookmark');
    }
  }

  // Get bookmarked jobs
  async getBookmarkedJobs(token: string): Promise<Job[]> {
    const response = await fetch(`${JOB_BASE_URL}/bookmarks`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get bookmarked jobs');
    }

    return response.json();
  }

  // Get similar jobs
  async getSimilarJobs(jobId: string, limit: number = 5): Promise<Job[]> {
    const response = await fetch(`${JOB_BASE_URL}/${jobId}/similar?limit=${limit}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get similar jobs');
    }

    return response.json();
  }

  // Get job recommendations
  async getRecommendations(token: string, limit: number = 10): Promise<Job[]> {
    const response = await fetch(`${JOB_BASE_URL}/recommendations?limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get job recommendations');
    }

    return response.json();
  }

  // Report job
  async reportJob(jobId: string, reason: string, token: string): Promise<void> {
    const response = await fetch(`${JOB_BASE_URL}/${jobId}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ reason }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to report job');
    }
  }

  // Share job
  async shareJob(jobId: string, method: 'email' | 'link', email?: string): Promise<string> {
    const response = await fetch(`${JOB_BASE_URL}/${jobId}/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ method, email }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to share job');
    }

    const result = await response.json();
    return result.shareUrl || result.message;
  }

  // Get job statistics
  async getJobStatistics(filters?: JobFilters): Promise<{
    total: number;
    byType: Record<string, number>;
    byExperienceLevel: Record<string, number>;
    byLocation: Record<string, number>;
    averageSalary: number;
  }> {
    const queryParams = new URLSearchParams();
    
    if (filters?.search) queryParams.append('search', filters.search);
    if (filters?.location) queryParams.append('location', filters.location);
    if (filters?.type) queryParams.append('type', filters.type);

    const response = await fetch(`${JOB_BASE_URL}/statistics?${queryParams}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get job statistics');
    }

    return response.json();
  }
}

// Export singleton instance
export const jobService = JobService.getInstance(); 