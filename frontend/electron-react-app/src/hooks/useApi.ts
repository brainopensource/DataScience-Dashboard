import { useState, useCallback } from 'react';
import { useStore } from '../store/useStore';
import apiService from '../services/api';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const setLoading = useStore(state => state.setLoading);

  const execute = useCallback(
    async <R = T>(
      method: 'get' | 'post' | 'put' | 'delete',
      url: string,
      options?: UseApiOptions<R>,
      config?: any
    ) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService[method]<R>(url, config);
        setData(result as any);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        options?.onError?.(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  return {
    data,
    error,
    execute,
    reset: () => {
      setData(null);
      setError(null);
    },
  };
}
