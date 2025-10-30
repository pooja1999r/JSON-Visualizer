import React, { createContext, useMemo, useState } from 'react';
import { GraphNode, GraphEdge } from '../utils/types';

export type JsonContextValue = {
  rawInput: string;
  setRawInput: (input: string) => void;
  jsonData: unknown | null;
  setJsonData: (data: unknown | null) => void;
  parseError: string | null;
  setParseError: (err: string | null) => void;
  nodes: GraphNode[];
  setNodes: (nodes: GraphNode[]) => void;
  edges: GraphEdge[];
  setEdges: (edges: GraphEdge[]) => void;
  highlightedNodeId: string | null;
  setHighlightedNodeId: (id: string | null) => void;
  message: string | null;
  setMessage: (m: string | null) => void;
};

export const JsonContext = createContext<JsonContextValue | null>(null);

export function JsonProvider({ children }: { children: React.ReactNode }) {
  const [rawInput, setRawInput] = useState('');
  const [jsonData, setJsonData] = useState<unknown | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const value = useMemo<JsonContextValue>(() => ({
    rawInput,
    setRawInput,
    jsonData,
    setJsonData,
    parseError,
    setParseError,
    nodes,
    setNodes,
    edges,
    setEdges,
    highlightedNodeId,
    setHighlightedNodeId,
    message,
    setMessage,
  }), [rawInput, jsonData, parseError, nodes, edges, highlightedNodeId, message]);

  return <JsonContext.Provider value={value}>{children}</JsonContext.Provider>;
}
