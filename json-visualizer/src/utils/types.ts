// Core shared types used across utils and components

export type NodeType = 'object' | 'array' | 'primitive';

export type Position = {
  x: number;
  y: number;
};

export type NodeData = {
  label: string;
  path: string;
  value?: unknown;
  type?: NodeType;
  highlighted?: boolean;
};

export type GraphNode = {
  id: string;
  type: NodeType;
  data: NodeData;
  position: Position;
};

export type GraphEdge = {
  id: string;
  source: string;
  target: string;
};


