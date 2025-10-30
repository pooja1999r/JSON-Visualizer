import { Handle, Position } from 'reactflow';
import { useContext } from 'react';
import { NodeRendererProps } from '../types';
import { NodeType } from '../../utils/types';
import { JsonContext } from '../../context/JsonContext';

export default function NodeRenderer({ data, selected }: NodeRendererProps) {
  const ctx = useContext(JsonContext);
  const isHighlighted = Boolean(data.highlighted);
  const type = data.type as NodeType | undefined;

  const colorClass = type === 'object' ? 'text-violet-600' : type === 'array' ? 'text-green-600' : 'text-amber-500';
  const borderClass = isHighlighted ? 'border-red-500' : (type === 'object' ? 'border-violet-600' : type === 'array' ? 'border-green-600' : 'border-amber-500');

  return (
    <div
      className={[
        'min-w-[120px] rounded-md border-2 bg-white p-2 shadow-sm',
        borderClass,
        selected ? 'ring-2 ring-blue-300' : ''
      ].join(' ').trim()}
      title={`${data.path}${data.value !== undefined ? `: ${String(data.value)}` : ''}`}
      onClick={() => {
        if (navigator && 'clipboard' in navigator) {
          navigator.clipboard.writeText(data.path).then(() => {
            ctx?.setMessage('Path copied');
          }).catch(() => {
            ctx?.setMessage('Failed to copy');
          });
        } else {
          ctx?.setMessage('Clipboard not available');
        }
      }}
    >
      <div className={[colorClass, 'font-semibold'].join(' ')}>{data.label}</div>
      <div className="mt-1 text-xs text-gray-500">{data.path}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
