import React, { lazy, ComponentType } from 'react';

interface LazyLoadOptions {
  fallback?: React.ReactNode;
}

interface LazyLoadWrapper {
  (props: any): JSX.Element;
  preload?: () => Promise<any>;
}

export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
): LazyLoadWrapper {
  const LazyComponent = lazy(importFunc);

  const Wrapper = (props: React.ComponentProps<T>) => {
    return (
      <React.Suspense fallback={options.fallback || <div>Loading...</div>}>
        <LazyComponent {...props} />
      </React.Suspense>
    );
  };

  // Add preload function
  Wrapper.preload = importFunc;

  return Wrapper;
} 