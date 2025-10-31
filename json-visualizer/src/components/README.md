# Components Documentation

## Component Structure

### Core Components

#### `JsonInput.tsx`
Text area for JSON input with validation and an inline bottom-left "Visualize" button.

**Props:**
- `placeholder?: string` - Optional custom placeholder JSON

**Features:**
- Textarea for pasting/typing JSON data
- Built-in sample JSON placeholder
- "Visualize" button
- JSON validation and error handling
- Integrates with JsonContext for state management

---

#### `SearchBar.tsx`
Search input for JSONPath queries (e.g., `$.user.address.city`, `items[0].name`).

**Props:**
- `placeholder?: string` - Optional custom search placeholder

**Features:**
- JSONPath-style search input
- On submit, highlights the matching node with a thicker, darker border of its type color
- Auto-centers on the matched node (zoom preserved afterwards)
- Visual feedback (MessageBox): match found / no match

---

#### `MessageBox.tsx`
Display area for feedback messages (match found, no match, exported, etc.).

**Props:**
- `className?: string` - Optional CSS class

**Features:**
- Shows contextual messages
- Color-coded feedback (green for success, red for error)
- Auto-hides after a short delay; close button available

---


**Props:**
- `showLabels?: boolean` - Toggle between text labels and icons

**Features:**
- Zoom in/out buttons
- Fit view button
- Text or icon mode

---

### Tree Visualization

#### `TreeView/TreeView.tsx`
Main React Flow visualization component for JSON hierarchy with overlay controls.

**Props:**
- `height?: string` - Container height (default: '70vh')
- `width?: string` - Container width (default: '100%')

**Features:**
- Hierarchical node tree display
- Parent-child connections
- Auto-centers on highlighted nodes
- Click on the canvas to clear highlight (does not change current zoom)
- Background grid, minimap, and controls
- Top-right overlay buttons (Reset, Export visible viewport SVG)
- Responsive layout

---

#### `TreeView/NodeRenderer.tsx`
Custom node renderer for styled graph nodes (type-colored styling, truncation, tooltip, highlight styles).

**Props:**
- `data: NodeData` - Node data with label, path, value, type, highlight state
- `selected?: boolean` - React Flow selection state

**Features:**
- Fixed node width to maintain tidy layout
- Type-specific colors (objects: purple, arrays: green, primitives: orange)
- Search highlight: thicker, darker border in the same color family
- Hover tooltip with full label, path, and value (rendered via portal; always on top)
- Connection handles for edges

---

#### `ExportButton.tsx`
Button that exports the currently visible React Flow viewport as an SVG.

**Features:**
- Uses React Flow instance to gather nodes/edges and viewport
- Exports only what is visible to a compact SVG
- Styled square icon button; mint hover

---

## Component Architecture

All components use TypeScript for type safety and import types from `../types`.

Components communicate via:
- **JsonContext**: Global state for JSON data, nodes, edges, highlight state, and UI messages
- **Props**: Optional configuration and customization
- **Event handlers**: User interactions and state updates

## Export Structure

All components are exported from `index.ts` for convenient imports:

```typescript
import { JsonInput, SearchBar, TreeView, NodeRenderer } from './components';
```

