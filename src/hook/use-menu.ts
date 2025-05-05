import { useState, useCallback } from 'react';

export const useMenu = (): {
  isOpen: boolean;
  toggle: () => void;
} => {
  const [isOpen, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  return { isOpen, toggle };
};
