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
    <div className="flex gap-3">
      <div className="w-1/3 flex" style={{ display: 'flex' }}>
        <JsonInput />
      </div>
      <div className="w-2/3 flex flex-col space-y-3" style={{ display: 'flex', flexDirection: 'column' }}>
        <SearchBar />
        <MessageBox />
        <ReactFlowProvider>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Graph Controls</div>
            <ZoomControls />
          </div>
          <TreeView />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
