import { useContext, useEffect } from 'react';
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
  const { jsonData, setNodes, setEdges } = ctx;

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
			<div className="w-4/5">
				<SearchBar />
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
							<div className="flex items-center justify-between">
								<div className="text-sm text-gray-600">Graph Controls</div>
								<ZoomControls />
							</div>
							<TreeView height="75vh" />
						</ReactFlowProvider>
					</div>
				</div>
	      </div>
    
		</div>
  );
}
