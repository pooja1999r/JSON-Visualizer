import { useCallback } from 'react';
export type ParseResult = {
  data: unknown | null;
  error: string | null;
};

export function useJsonParser() {
  const parse = useCallback((input: string): ParseResult => {
    if (!input || !input.trim()) {
      return { data: null, error: 'Input is empty' };
    }
    try {
      const data = JSON.parse(input);
      return { data, error: null };
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Invalid JSON';
      return { data: null, error: message };
    }
  }, []);

  return { parse };
}
