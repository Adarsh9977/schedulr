'use client'

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface GithubStatus {
  isConnected: boolean;
  loading: boolean;
  error?: string;
}

export function useIsGithubConnected(): GithubStatus {
  const { data: session } = useSession();
  const [status, setStatus] = useState<GithubStatus>({
    isConnected: false,
    loading: true
  });

  useEffect(() => {
    const checkGithubConnection = async () => {
      if (!session?.user) {
        setStatus({ isConnected: false, loading: false });
        return;
      }

      try {
        const response = await fetch('/api/github/status');
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub status');
        }
        const data = await response.json();
        setStatus({ isConnected: data.isConnected, loading: false });
      } catch (error) {
        setStatus({
          isConnected: false,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to check GitHub status'
        });
      }
    };

    checkGithubConnection();
  }, [session?.user]);

  return status;
}