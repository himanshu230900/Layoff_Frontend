import { useState, useCallback } from 'react';
import { ApiResponse, ApiError } from '@/globalService/types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<ApiResponse<T> | ApiError>;
  reset: () => void;
}

function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T> | ApiError>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFunction(...args);
        
        if (response.success) {
          setState(prev => ({
            ...prev,
            data: response.data,
            loading: false,
            error: null,
          }));
        } else {
          setState(prev => ({
            ...prev,
            data: null,
            loading: false,
            error: response.message,
          }));
        }
        
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        setState(prev => ({
          ...prev,
          data: null,
          loading: false,
          error: errorMessage,
        }));
        
        return {
          success: false,
          message: errorMessage,
          statusCode: 0,
        } as ApiError;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

export default useApi; 