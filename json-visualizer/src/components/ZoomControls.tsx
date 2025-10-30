import { useReactFlow } from 'reactflow';
import { ZoomControlsProps } from './types';

export default function ZoomControls({ showLabels = true }: ZoomControlsProps) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  return (
    <div className="flex gap-2">
      {showLabels ? (
        <>
          <button
            type="button"
            onClick={() => zoomIn({ duration: 200 })}
            className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
          >
            Zoom In
          </button>
          <button
            type="button"
            onClick={() => zoomOut({ duration: 200 })}
            className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
          >
            Zoom Out
          </button>
          <button
            type="button"
            onClick={() => fitView({ duration: 300 })}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700"
          >
            Fit View
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={() => zoomIn({ duration: 200 })} className="rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50">+</button>
          <button type="button" onClick={() => zoomOut({ duration: 200 })} className="rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50">-</button>
          <button type="button" onClick={() => fitView({ duration: 300 })} className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow hover:bg-indigo-700">⌂</button>
        </>
      )}
    </div>
  );
}
