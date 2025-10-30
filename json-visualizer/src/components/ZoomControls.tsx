import { useReactFlow } from 'reactflow';
import { PlusIcon, MinusIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
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
            className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Zoom In</span>
          </button>
          <button
            type="button"
            onClick={() => zoomOut({ duration: 200 })}
            className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
          >
            <MinusIcon className="h-4 w-4" />
            <span>Zoom Out</span>
          </button>
          <button
            type="button"
            onClick={() => fitView({ duration: 300 })}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700"
          >
            <ArrowsPointingOutIcon className="h-4 w-4" />
            <span>Fit View</span>
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={() => zoomIn({ duration: 200 })} className="inline-flex items-center justify-center rounded-md bg-white p-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"><PlusIcon className="h-4 w-4" /></button>
          <button type="button" onClick={() => zoomOut({ duration: 200 })} className="inline-flex items-center justify-center rounded-md bg-white p-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"><MinusIcon className="h-4 w-4" /></button>
          <button type="button" onClick={() => fitView({ duration: 300 })} className="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"><ArrowsPointingOutIcon className="h-4 w-4" /></button>
        </>
      )}
    </div>
  );
}
