import { useState, useEffect, useCallback } from 'react';
import type { CursorState } from '../types';

interface CursorPosition {
  x: number;
  y: number;
}

interface UseCursorReturn {
  position: CursorPosition;
  state: CursorState;
  setHover: (value: boolean) => void;
  setClick: (value: boolean) => void;
}

export function useCursor(): UseCursorReturn {
  const [position, setPosition] = useState<CursorPosition>({ x: -100, y: -100 });
  const [state, setState] = useState<CursorState>('default');

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const setHover = useCallback((value: boolean) => {
    setState(prev => {
      if (prev === 'click') return prev;
      return value ? 'hover' : 'default';
    });
  }, []);

  const setClick = useCallback((value: boolean) => {
    setState(value ? 'click' : 'default');
  }, []);

  return { position, state, setHover, setClick };
}
