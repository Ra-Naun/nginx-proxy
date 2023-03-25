import { useEffect } from 'react';

export function useOnClickOutside(ref: any | any[], handler: any) {
  useEffect(() => {
    const listener = (event: any) => {
      if (Array.isArray(ref)) {
        let isNeedCallHandler = true;

        ref.forEach((item) => {
          if (item.current && item.current.contains(event.target)) {
            isNeedCallHandler = false;
          }
        });

        isNeedCallHandler && handler(event);
      } else {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
