import { useContext, useEffect, useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useEdgesState, useNodesState, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { JsonContext } from '../../context/JsonContext';
import { TreeViewProps } from '../types';
import NodeRenderer from './NodeRenderer';

export default function TreeView({ height = '70vh', width = '100%' }: TreeViewProps) {
  const ctx = useContext(JsonContext);
  const { setCenter, getNode, fitView } = useReactFlow();

  if (!ctx) return null;
  const { nodes: ctxNodes, edges: ctxEdges, highlightedNodeId } = ctx;

  const nodeTypes = useMemo(() => ({ custom: NodeRenderer }), []);

  const coloredNodes = useMemo(() => ctxNodes.map(n => ({
    ...n,
    type: 'custom',
    data: { ...n.data, type: n.type, highlighted: highlightedNodeId === n.id },
  })), [ctxNodes, highlightedNodeId]);

  const [nodes, setNodesState, onNodesChange] = useNodesState(coloredNodes);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState(ctxEdges);

  useEffect(() => {
    setNodesState(coloredNodes);
  }, [coloredNodes, setNodesState]);

  useEffect(() => {
    setEdgesState(ctxEdges);
  }, [ctxEdges, setEdgesState]);

  // Fit view on mount and whenever graph changes (if nothing is highlighted)
  useEffect(() => {
    if (!highlightedNodeId) {
      fitView({ padding: 0.2, duration: 300 });
    }
  }, [coloredNodes, highlightedNodeId, fitView]);

  useEffect(() => {
    if (highlightedNodeId) {
      const n = getNode(highlightedNodeId);
      if (n) {
        const x = n.position.x + (n.width ?? 0) / 2;
        const y = n.position.y + (n.height ?? 0) / 2;
        setCenter(x, y, { zoom: 1.5, duration: 600 });
      }
    }
  }, [highlightedNodeId, getNode, setCenter]);

  return (
    <div style={{ height, width }} className="rounded-lg border border-gray-200 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2, includeHiddenNodes: true }}
        minZoom={0.1}
        maxZoom={2}
        panOnDrag
        panOnScroll
        zoomOnScroll
        zoomOnPinch
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
