import { GraphEdge, GraphNode, NodeType } from './types';

function nodeTypeOf(value: unknown): NodeType {
  if (Array.isArray(value)) return 'array';
  if (value !== null && typeof value === 'object') return 'object';
  return 'primitive';
}

function makePath(parentPath: string, key: string | number): string {
  if (typeof key === 'number') {
    return `${parentPath}[${key}]`;
  }
  if (parentPath === '$') return `${parentPath}.${key}`;
  return `${parentPath}.${key}`;
}

function extractDisplayKey(path: string): string {
  if (path === '$') return 'root';
  const bracketIndex = path.lastIndexOf('[');
  if (bracketIndex !== -1 && bracketIndex > path.lastIndexOf('.')) {
    const endIndex = path.indexOf(']', bracketIndex);
    const idx = path.slice(bracketIndex, endIndex + 1);
    return idx || '[0]';
  }
  const lastDot = path.lastIndexOf('.');
  return lastDot !== -1 ? path.slice(lastDot + 1) : path;
}

export function jsonToNodes(json: unknown): { nodes: GraphNode[]; edges: GraphEdge[] } {
  // Build an internal tree first
  type InternalNode = {
    id: string;
    type: NodeType;
    value: unknown;
    label: string;
    path: string;
    children: InternalNode[];
    depth: number;
    x?: number;
    y?: number;
  };

  function build(value: unknown, path: string, depth: number): InternalNode {
    const type = nodeTypeOf(value);
    const displayKey = extractDisplayKey(path);
    const label = (() => {
      if (type === 'object') return displayKey;
      if (type === 'array') return displayKey;
      const val = value === null ? 'null' : String(value);
      return `${displayKey}: ${val}`;
    })();
    const node: InternalNode = { id: path, type, value, label, path, children: [], depth };
    if (type === 'object' && value && typeof value === 'object') {
      for (const key of Object.keys(value as Record<string, unknown>)) {
        node.children.push(build((value as any)[key], makePath(path, key), depth + 1));
      }
    } else if (type === 'array' && Array.isArray(value)) {
      (value as unknown[]).forEach((item, index) => {
        node.children.push(build(item, makePath(path, index), depth + 1));
      });
    }
    return node;
  }

  const root = build(json, '$', 0);

  // Layout pass: assign x centered over children, y by depth
  const horizontalGap = 220;
  const verticalGap = 100;
  let leafIndex = 0;

  function assignPositions(n: InternalNode): void {
    n.y = n.depth * verticalGap;
    if (n.children.length === 0) {
      n.x = leafIndex * horizontalGap;
      leafIndex += 1;
      return;
    }
    n.children.forEach(assignPositions);
    const minX = Math.min(...n.children.map(c => c.x as number));
    const maxX = Math.max(...n.children.map(c => c.x as number));
    n.x = (minX + maxX) / 2;
  }

  assignPositions(root);

  // Flatten to React Flow nodes/edges
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  function emit(n: InternalNode, parentId?: string) {
    nodes.push({
      id: n.id,
      type: n.type,
      data: { label: n.label, path: n.path, value: n.type === 'primitive' ? n.value : undefined },
      position: { x: n.x as number, y: n.y as number },
    });
    if (parentId) {
      edges.push({ id: `${parentId}->${n.id}`, source: parentId, target: n.id });
    }
    n.children.forEach(child => emit(child, n.id));
  }

  emit(root);

  return { nodes, edges };
}
