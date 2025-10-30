import { NodeData } from '../utils/types';

export type JsonInputProps = {
  placeholder?: string;
};

export type SearchBarProps = {
  placeholder?: string;
};

export type MessageBoxProps = {
  className?: string;
};

export type ZoomControlsProps = {
  showLabels?: boolean;
};

export type TreeViewProps = {
  height?: string;
  width?: string;
};

export type NodeRendererProps = {
  data: NodeData;
  selected?: boolean;
};

