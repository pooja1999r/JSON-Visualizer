import { useState } from 'react';
import { useSearchNode } from '../hooks/useSearchNode';
import { SearchBarProps } from './types';

export default function SearchBar({ placeholder }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const { search } = useSearchNode();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

  const defaultPlaceholder = "e.g. $.user.address.city or $.items[0].name";
  
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder={placeholder ?? defaultPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
      <button
        type="submit"
        className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Search
      </button>
    </form>
  );
}
