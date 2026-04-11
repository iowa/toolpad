'use client';

import React from 'react';

import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDeepMemo } from '@/swiss-client/hooks/useDeepMemo';

export default function QueryClientProviderWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = useDeepMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          placeholderData: keepPreviousData,
        },
      },
    });
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
