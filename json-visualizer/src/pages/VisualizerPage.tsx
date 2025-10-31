import { useContext, useEffect } from 'react';
import { ArrowPathIcon, MoonIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import JsonInput from '../components/JsonInput';
import SearchBar from '../components/SearchBar';
import MessageBox from '../components/MessageBox';
import TreeView from '../components/TreeView/TreeView';
import ExportButton from '../components/ExportButton';
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
		<div className="p-4 pt-2 space-y-4">
	        <MessageBox />
			<div className="flex items-center justify-between gap-6 mb-4 rounded-lg border border-[rgba(137,255,196,0.3)] bg-[rgba(225,250,234,0.9)] p-5 shadow-[0_4px_6px_-1px_rgba(137,255,196,0.3),0_2px_4px_-1px_rgba(137,255,196,0.2)] backdrop-blur-sm">
				<h4 className="w-1/3 text-2xl font-bold flex items-center gap-2 whitespace-nowrap">
					<CodeBracketIcon className="h-7 w-7" />
					JSON <span className="text-[rgb(34,225,133)]">Visualizer</span>
				</h4>
				<div className="w-2/3 flex items-center gap-3 min-w-0">
					<div className="flex-1 min-w-0">
						<SearchBar />
					</div>
					{/* <div className="flex items-center gap-2 flex-shrink-0">
						<button
							type="button"
							className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 whitespace-nowrap"
							onClick={() => {
								const root = document.documentElement;
								root.classList.toggle('dark');
								setMessage(root.classList.contains('dark') ? 'Dark mode enabled' : 'Light mode enabled');
							}}
							>
							<MoonIcon className="h-4 w-4" />
							<span>Toggle Theme</span>
						</button>
					</div> */}
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
							<div className="relative">
								<TreeView height="80vh" />
								<div className="absolute top-3 right-3 flex items-center gap-2">
									<button
										aria-label="Reset graph"
										type="button"
									className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-[rgb(137,255,196)] hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgb(120,235,176)] transition-colors cursor-pointer"
										onClick={() => {
											setRawInput('');
											setJsonData(null);
											setNodes([]);
											setEdges([]);
											setHighlightedNodeId(null);
											setMessage('Cleared');
										}}
									>
										<ArrowPathIcon className="h-5 w-5" />
									</button>
									<ExportButton />
								</div>
							</div>
							</ReactFlowProvider>
						</div>
					</div>
			</div>
    
		</div>
  );
}
