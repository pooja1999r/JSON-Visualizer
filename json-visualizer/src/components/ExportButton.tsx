import { useReactFlow } from 'reactflow';
import { useContext } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { JsonContext } from '../context/JsonContext';
import { exportReactFlowViewport, downloadSVG } from '../utils/exportReactFlowView';

export default function ExportButton() {
  const { getViewport, getNodes, getEdges } = useReactFlow();
  const ctx = useContext(JsonContext);

  const handleExport = () => {
    if (!ctx) return;
    
    const nodes = getNodes();
    const edges = getEdges();
    
    if (!nodes.length) {
      ctx.setMessage('No graph to export');
      return;
    }

    const viewport = getViewport();
    const container = document.querySelector('.react-flow') as HTMLElement;
    
    if (!container) {
      ctx.setMessage('React Flow container not found');
      return;
    }

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const svgContent = exportReactFlowViewport(
      nodes,
      edges,
      viewport,
      containerWidth,
      containerHeight
    );

    if (!svgContent) {
      ctx.setMessage('No visible nodes to export');
      return;
    }

    downloadSVG(svgContent, 'tree-view.svg');
    ctx.setMessage('Downloaded tree-view.svg');
  };

  return (
    <button
      aria-label="Download SVG"
      type="button"
      onClick={handleExport}
      className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-[rgb(137,255,196)] hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgb(120,235,176)] transition-colors cursor-pointer"
    >
      <ArrowDownTrayIcon className="h-5 w-5" />
    </button>
  );
}
