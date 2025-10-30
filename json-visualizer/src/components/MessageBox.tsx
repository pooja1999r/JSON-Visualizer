import { useContext, useEffect } from 'react';
import { JsonContext } from '../context/JsonContext';
import { MessageBoxProps } from './types';

export default function MessageBox({ className }: MessageBoxProps) {
  const ctx = useContext(JsonContext);
  if (!ctx) return null;
  const { message, setMessage } = ctx;
  if (!message) return null;
  const isError = message.includes('No');
  const color = isError ? 'text-red-700 border-red-200 bg-red-50' : 'text-green-700 border-green-200 bg-green-50';

  useEffect(() => {
    const timer = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [message, setMessage]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        'fixed left-1/2 top-4 z-50 -translate-x-1/2 transform',
        'rounded-md border px-4 py-2 text-sm shadow-lg',
        color,
        className ?? ''
      ].join(' ').trim()}
    >
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button
          type="button"
          onClick={() => setMessage(null)}
          aria-label="Close notification"
          className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded hover:bg-black/5"
        >
          ×
        </button>
      </div>
    </div>
  );
}
