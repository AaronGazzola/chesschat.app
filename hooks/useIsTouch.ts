import { useCallback, useEffect, useState } from 'react';

export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);

  const matchHandler = useCallback((event: MediaQueryListEvent) => {
    setIsTouch(event.matches);
  }, []);

  useEffect(() => {
    const matchTouchPointer = window.matchMedia('(pointer: coarse)');
    matchTouchPointer.addEventListener('change', matchHandler);
    return () => matchTouchPointer.removeEventListener('change', matchHandler);
  }, [matchHandler]);

  return isTouch;
}
