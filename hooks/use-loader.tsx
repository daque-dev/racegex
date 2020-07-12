import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onLoad = useCallback(() => setIsLoading(true), [setIsLoading]);
  const onDone = useCallback(() => setIsLoading(false), [setIsLoading]);

  useEffect(() => {
    router.events.on(RouterEvents.START, onLoad);
    router.events.on(RouterEvents.COMPLETE, onDone);
    router.events.on(RouterEvents.ERROR, onDone);

    return () => {
      router.events.off(RouterEvents.START, onLoad);
      router.events.off(RouterEvents.COMPLETE, onDone);
      router.events.off(RouterEvents.ERROR, onDone);
    };
  });

  return isLoading;
};

enum RouterEvents {
  START = 'routeChangeStart',
  COMPLETE = 'routeChangeComplete',
  ERROR = 'routeChangeError',
}

export default useLoader;
