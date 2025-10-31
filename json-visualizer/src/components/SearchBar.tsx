import { useState } from 'react';
import { useSearchNode } from '../hooks/useSearchNode';
import { SearchBarProps } from './types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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
        className="flex-1 rounded-md border-2 border-[#4ade80] bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg bg-[rgb(137,255,196)] px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-md hover:bg-[rgb(120,235,176)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(120,235,176)] transition-colors duration-200 cursor-pointer"
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
        <span>Search</span>
      </button>
    </form>
  );
}
