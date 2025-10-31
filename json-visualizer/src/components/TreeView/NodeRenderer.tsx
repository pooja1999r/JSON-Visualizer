import { Handle, Position } from 'reactflow';
import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { NodeRendererProps } from '../types';
import { NodeType } from '../../utils/types';
import { JsonContext } from '../../context/JsonContext';

export default function NodeRenderer({ data, selected }: NodeRendererProps) {
  const ctx = useContext(JsonContext);
  const isHighlighted = Boolean(data.highlighted);
  const type = data.type as NodeType | undefined;

  const colorClass = type === 'object' ? 'text-violet-600' : type === 'array' ? 'text-green-600' : 'text-amber-500';
  const normalBorder = type === 'object' ? 'border-violet-600' : type === 'array' ? 'border-green-600' : 'border-amber-500';
  const highlightedBorder = type === 'object' ? 'border-violet-800' : type === 'array' ? 'border-green-800' : 'border-amber-700';
  const borderClass = isHighlighted ? highlightedBorder : normalBorder;
  const borderWidthClass = isHighlighted ? 'border-4' : 'border-2';

  const fullTooltip = `${data.label}\n${data.path}${data.value !== undefined ? `\nValue: ${String(data.value)}` : ''}`;
  const [isHovering, setIsHovering] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <>
    <div
      className={[
        'relative group w-[140px] max-w-[140px] rounded-md bg-white p-2 shadow-sm',
        borderClass,
        borderWidthClass,
        selected ? 'ring-2 ring-green-600' : ''
      ].join(' ').trim()}
      onMouseEnter={() => setIsHovering(true)}
      onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setIsHovering(false)}
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
      <div className={[colorClass, 'font-semibold truncate'].join(' ')} title={data.label}>
        {data.label}
      </div>
      <div className="mt-1 text-xs text-gray-500 truncate" title={data.path}>
        {data.path}
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
    {isHovering && createPortal(
      <div
        role="tooltip"
        style={{ position: 'fixed', left: tooltipPos.x + 12, top: tooltipPos.y + 12 }}
        className="pointer-events-none z-[2147483647] w-max max-w-sm whitespace-pre-line rounded-md bg-white px-2 py-1 text-[11px] font-medium text-gray-900 border border-[rgb(137,255,196)] shadow-lg"
      >
        {fullTooltip}
      </div>,
      document.body
    )}
    </>
  );
}
