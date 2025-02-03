'use client';  

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface MainPageLayoutProps {
  children: ReactNode;
}

function MainPageLayout({ children }: MainPageLayoutProps) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default React.memo(MainPageLayout);