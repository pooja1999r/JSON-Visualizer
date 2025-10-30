import { useContext, useEffect } from 'react';
import { ArrowPathIcon, ArrowDownTrayIcon, MoonIcon } from '@heroicons/react/24/outline';
import JsonInput from '../components/JsonInput';
import SearchBar from '../components/SearchBar';
import MessageBox from '../components/MessageBox';
import ZoomControls from '../components/ZoomControls';
import TreeView from '../components/TreeView/TreeView';
import { JsonContext } from '../context/JsonContext';
import { jsonToNodes } from '../utils/jsonToNodes';
import { ReactFlowProvider } from 'reactflow';

export default function VisualizerPage() {
  const ctx = useContext(JsonContext);
  if (!ctx) return null;
  const { jsonData, setNodes, setEdges, setRawInput, setJsonData, setMessage, setHighlightedNodeId } = ctx;

  useEffect(() => {
    if (jsonData !== null) {
      const { nodes, edges } = jsonToNodes(jsonData);
      setNodes(nodes);
      setEdges(edges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [jsonData, setNodes, setEdges]);

	return (
		<div className="p-4 space-y-4">
	    <MessageBox />
      <div className="flex items-center justify-between mb-4 rounded-md border border-gray-200 bg-gray-100 p-4 shadow-sm">
        <h4 className="text-2xl text-center font-bold">JSON Visualizer</h4>
        <div className="flex w-4/5 items-center gap-2">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
              onClick={() => {
                const root = document.documentElement;
                root.classList.toggle('dark');
                setMessage(root.classList.contains('dark') ? 'Dark mode enabled' : 'Light mode enabled');
              }}
            >
              <MoonIcon className="h-4 w-4" />
              <span>Toggle Theme</span>
            </button>
          </div>
        </div>
		</div>
	      <div className="flex gap-4">
				<div className="w-1/3 flex">
		    		<div className="w-full">
		    			<JsonInput />
		    		</div>
				</div>
				<div className="w-2/3 flex">
					<div className="w-full space-y-3">
						<ReactFlowProvider>
							<div className="flex items-center justify-between h-12 mt-2 mb-2">
								<div className="text-sm text-gray-600">Graph Controls</div>
								<div className="flex items-center gap-2">
									<ZoomControls />
									<button
										type="button"
                                    className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
										onClick={() => {
											setRawInput('');
											setJsonData(null);
											setNodes([]);
											setEdges([]);
											setHighlightedNodeId(null);
											setMessage('Cleared');
										}}
									>
                                        <ArrowPathIcon className="h-4 w-4" />
                                        <span>Reset</span>
									</button>
									<button
										type="button"
                                        className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
										onClick={() => {
											const { nodes, edges } = ctx;
											if (!nodes.length) { setMessage('No graph to export'); return; }

											const PADDING = 32, NODE_W = 140, NODE_H = 60;
											let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
											for (const n of nodes) {
												const x1 = n.position.x, y1 = n.position.y;
												const x2 = x1 + NODE_W, y2 = y1 + NODE_H;
												if (x1 < minX) minX = x1; if (y1 < minY) minY = y1;
												if (x2 > maxX) maxX = x2; if (y2 > maxY) maxY = y2;
											}
											const width = (maxX - minX) + PADDING * 2;
											const height = (maxY - minY) + PADDING * 2;

											const idTo = new Map(nodes.map(n => [n.id, n] as const));
											const color = (t: string, hl?: boolean) => hl ? '#ef4444' : (t === 'object' ? '#7c3aed' : t === 'array' ? '#16a34a' : '#f59e0b');

											const edgesSvg = edges.map(e => {
												const s = idTo.get(e.source), t = idTo.get(e.target);
												if (!s || !t) return '';
												const x1 = (s.position.x - minX) + PADDING + NODE_W / 2;
												const y1 = (s.position.y - minY) + PADDING + NODE_H;
												const x2 = (t.position.x - minX) + PADDING + NODE_W / 2;
												const y2 = (t.position.y - minY) + PADDING;
												return `<line x1=\"${x1}\" y1=\"${y1}\" x2=\"${x2}\" y2=\"${y2}\" stroke=\"#94a3b8\" stroke-width=\"2\" />`;
											}).join('');

											const nodesSvg = nodes.map(n => {
												const x = (n.position.x - minX) + PADDING;
												const y = (n.position.y - minY) + PADDING;
												const stroke = color(n.type, (n.data as any).highlighted);
												const label = (n.data as any).label ?? '';
												const path = (n.data as any).path ?? '';
												return `<g>
  <rect x=\"${x}\" y=\"${y}\" rx=\"8\" ry=\"8\" width=\"${NODE_W}\" height=\"${NODE_H}\" fill=\"#ffffff\" stroke=\"${stroke}\" stroke-width=\"2\" />
  <text x=\"${x + 8}\" y=\"${y + 20}\" font-size=\"12\" font-weight=\"600\" fill=\"${stroke}\">${label}</text>
  <text x=\"${x + 8}\" y=\"${y + 38}\" font-size=\"10\" fill=\"#6b7280\">${path}</text>
</g>`;
											}).join('');

											const svg = `<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>\\n<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"${width}\\" height=\\"${height}\\" viewBox=\\"0 0 ${width} ${height}\\" style=\\"background:#ffffff\\">\\n${edgesSvg}\\n${nodesSvg}\\n</svg>`;

											const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
											const url = URL.createObjectURL(blob);
											const a = document.createElement('a');
											a.href = url; a.download = 'tree.svg';
											document.body.appendChild(a); a.click(); document.body.removeChild(a);
											URL.revokeObjectURL(url);
											setMessage('Downloaded tree.svg');
										}}
									>
                                        <ArrowDownTrayIcon className="h-4 w-4" />
                                        <span>Download SVG</span>
									</button>
								</div>
							</div>
							<TreeView height="80vh" />
						</ReactFlowProvider>
					</div>
				</div>
	      </div>
    
		</div>
  );
}
