import { type ReactNode, useEffect, useRef, useState } from 'react';

import { useNavigation } from 'react-router-dom';

export const GlobalLoader = (): ReactNode => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (navigation.state === 'loading') {
      setVisible(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Timeout pour minimum 5s
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        // Si la navigation est terminée à ce moment-là, on peut masquer
        if (navigation.state !== 'loading') {
          setVisible(false);
        }
      }, 5000);
    } else {
      if (!timeoutRef.current) {
        setVisible(false); // Navigation finie ET 5s écoulées
      }
      // Sinon : on attend que les 5s passent avant de cacher
    }

    return () => {
      // Cleanup si le composant est démonté
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [navigation.state]);

  if (!visible) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/80 transition-opacity duration-300'>
      <div className='h-10 w-10 animate-spin rounded-full border-t-4 border-blue-500' />
    </div>
  );
};
