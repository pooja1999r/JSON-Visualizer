import { Viewport, Node, Edge } from 'reactflow';

const NODE_WIDTH = 140;
const NODE_HEIGHT = 60;

const getNodeColor = (type: string, highlighted?: boolean): string => {
  if (highlighted) return '#ef4444';
  if (type === 'object') return '#7c3aed';
  if (type === 'array') return '#16a34a';
  return '#f59e0b';
};

const isNodeInViewport = (
  node: Node,
  viewport: Viewport,
  containerWidth: number,
  containerHeight: number
): boolean => {
  const nodeX = node.position.x;
  const nodeY = node.position.y;
  const nodeRight = nodeX + NODE_WIDTH;
  const nodeBottom = nodeY + NODE_HEIGHT;

  // Transform viewport coordinates to world coordinates
  const viewportLeft = -viewport.x / viewport.zoom;
  const viewportTop = -viewport.y / viewport.zoom;
  const viewportRight = viewportLeft + containerWidth / viewport.zoom;
  const viewportBottom = viewportTop + containerHeight / viewport.zoom;

  return !(
    nodeRight < viewportLeft ||
    nodeX > viewportRight ||
    nodeBottom < viewportTop ||
    nodeY > viewportBottom
  );
};

export function exportReactFlowViewport(
  nodes: Node[],
  edges: Edge[],
  viewport: Viewport,
  containerWidth: number,
  containerHeight: number
): string {
  // Filter nodes and edges that are in the viewport
  const visibleNodes = nodes.filter((node) =>
    isNodeInViewport(node, viewport, containerWidth, containerHeight)
  );
  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = edges.filter(
    (e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)
  );

  if (visibleNodes.length === 0) {
    return '';
  }

  // Calculate bounds of visible nodes
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  visibleNodes.forEach((node) => {
    minX = Math.min(minX, node.position.x);
    minY = Math.min(minY, node.position.y);
    maxX = Math.max(maxX, node.position.x + NODE_WIDTH);
    maxY = Math.max(maxY, node.position.y + NODE_HEIGHT);
  });

  const padding = 32;
  const width = maxX - minX + padding * 2;
  const height = maxY - minY + padding * 2;

  // Transform coordinates relative to bounds
  const transformX = (x: number) => x - minX + padding;
  const transformY = (y: number) => y - minY + padding;

  // Generate edges SVG
  const edgesSvg = visibleEdges
    .map((edge) => {
      const sourceNode = visibleNodes.find((n) => n.id === edge.source);
      const targetNode = visibleNodes.find((n) => n.id === edge.target);
      if (!sourceNode || !targetNode) return '';

      const x1 = transformX(sourceNode.position.x + NODE_WIDTH / 2);
      const y1 = transformY(sourceNode.position.y + NODE_HEIGHT);
      const x2 = transformX(targetNode.position.x + NODE_WIDTH / 2);
      const y2 = transformY(targetNode.position.y);

      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#94a3b8" stroke-width="2" />`;
    })
    .join('');

  // Generate nodes SVG
  const nodesSvg = visibleNodes
    .map((node) => {
      const x = transformX(node.position.x);
      const y = transformY(node.position.y);
      const stroke = getNodeColor(
        (node.data as any)?.type || 'primitive',
        (node.data as any)?.highlighted
      );
      const label = (node.data as any)?.label || '';
      const path = (node.data as any)?.path || '';

      return `<g>
  <rect x="${x}" y="${y}" rx="8" ry="8" width="${NODE_WIDTH}" height="${NODE_HEIGHT}" fill="#ffffff" stroke="${stroke}" stroke-width="2" />
  <text x="${x + 8}" y="${y + 20}" font-size="12" font-weight="600" fill="${stroke}">${label}</text>
  <text x="${x + 8}" y="${y + 38}" font-size="10" fill="#6b7280">${path}</text>
</g>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background:#ffffff">
${edgesSvg}
${nodesSvg}
</svg>`;
}

export function downloadSVG(svgContent: string, filename: string = 'tree.svg'): void {
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
