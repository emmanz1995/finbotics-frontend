'use client';

import { useCallback, useState } from 'react';

export const useSelectId = () => {
  const [selectedId, setSelectedId] = useState<string | null>(
    null
  );
  const chooseId = useCallback((id: string) =>
    setSelectedId(prevId => (prevId === id ? null : id)), []);

  return { selectedId, chooseId };
};
