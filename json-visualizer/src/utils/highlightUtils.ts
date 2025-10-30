import { NodeType } from './types';

export function clearHighlights(): void {}

export function setHighlights(): void {}

export function isHighlighted(nodeId: string, highlightedId: string | null): boolean {
  return highlightedId === nodeId;
}

export function getNodeBorderColor(type: NodeType, highlighted: boolean): string {
  if (highlighted) return '#ef4444';
  if (type === 'object') return '#7c3aed';
  if (type === 'array') return '#16a34a';
  return '#f59e0b';
}
