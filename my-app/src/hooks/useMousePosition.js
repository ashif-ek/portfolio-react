// src/hooks/useMousePosition.js
import { useState, useEffect } from 'react';

export const useMousePosition = (ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [ref]);

  return position;
};
