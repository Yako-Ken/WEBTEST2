"use client";

import { useEffect, useState } from 'react';
import { useCartStore } from './useCartStore';

export const useHydratedCart = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsub = useCartStore.persist.onFinishHydration(() => setIsHydrated(true));
    setIsHydrated(useCartStore.persist.hasHydrated());
    return () => {
      unsub();
    };
  }, []);

  return { isHydrated };
};
