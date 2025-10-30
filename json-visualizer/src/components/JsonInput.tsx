import { useContext, useMemo } from 'react';
import { JsonContext } from '../context/JsonContext';
import { useJsonParser } from '../hooks/useJsonParser';
import { JsonInputProps } from './types';
import { jsonToNodes } from '../utils/jsonToNodes';

export default function JsonInput({ placeholder }: JsonInputProps) {
  const ctx = useContext(JsonContext);
  const { parse } = useJsonParser();

  if (!ctx) return null;
  const {
    rawInput,
    setRawInput,
    setJsonData,
    setParseError,
    setNodes,
    setEdges,
    setMessage,
  } = ctx;

  const defaultPlaceholder = useMemo(() => `{
  "user": {
    "name": "Ada",
    "address": { "city": "London" }
  },
  "items": [
    { "name": "Book", "price": 10 },
    { "name": "Pen", "price": 2 }
  ]
}`, []);
  
  const finalPlaceholder = placeholder ?? defaultPlaceholder;

  const onVisualize = () => {
    const { data, error } = parse(rawInput);
    if (error) {
      setParseError(error);
      setJsonData(null);
      setNodes([]);
      setEdges([]);
      setMessage('Invalid JSON');
      return;
    }
    setParseError(null);
    setJsonData(data);
    // Build nodes/edges immediately for visualization
    const { nodes, edges } = jsonToNodes(data);
    setNodes(nodes);
    setEdges(edges);
    setMessage(null);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="pt-1">
        <button
          onClick={onVisualize}
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Visualize
        </button>
      </div>
      <textarea
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        placeholder={finalPlaceholder}
        rows={10}
        className="w-full h-[80vh] rounded-md border border-gray-300 bg-white p-3 font-mono text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
     
    </div>
  );
}
