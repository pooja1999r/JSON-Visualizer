import { useCallback, useContext } from 'react';
import { JsonContext } from '../context/JsonContext';
export type SearchResult = {
  found: boolean;
  id: string | null;
};

function parsePath(query: string): string | null {
  const trimmed = query.trim();
  if (!trimmed) return null;
  // Normalize: ensure it starts with '$' and uses '$.' for keys
  if (trimmed.startsWith('$')) return trimmed;
  if (trimmed.startsWith('[')) return `$${trimmed}`; // e.g. [0].name -> $[0].name
  return `$.${trimmed}`; // e.g. user.name -> $.user.name
}

export function useSearchNode() {
  const ctx = useContext(JsonContext);

  const search = useCallback((query: string): SearchResult => {
    if (!ctx) return { found: false, id: null };
    const { nodes, setHighlightedNodeId, setMessage } = ctx;
    const id = parsePath(query);
    if (!id) {
      setHighlightedNodeId(null);
      setMessage('No match found');
      return { found: false, id: null };
    }
    const match = nodes.find(n => n.id === id);
    if (match) {
      setHighlightedNodeId(match.id);
      setMessage('Match found');
      return { found: true, id: match.id };
    }
    setHighlightedNodeId(null);
    setMessage('No match found');
    return { found: false, id: null };
  }, [ctx]);

  return { search };
}
