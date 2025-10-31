# JSON Visualizer

A fast, modern JSON structure visualizer built with React, Vite, Tailwind CSS, and React Flow. Paste JSON, visualize its hierarchy as a graph, search by JSONPath, and export the current view to SVG.

## Features

- Visualize JSON as an interactive React Flow graph
  - Fixed-width nodes with clean truncation for long labels/paths
  - Hover tooltip shows full label, path and value (portal-based, always on top)
- JSON input with inline "Visualize" button anchored bottom-left of the textarea
- JSONPath search (e.g. `$.user.address.city` or `items[0].name`)
  - Matches highlight with darker, thicker type-colored borders
  - Auto-centers on the matched node (preserving zoom thereafter)
  - Click on the canvas to clear highlight without changing zoom
- Top-right overlay controls on the graph
  - Reset graph state
  - Export visible viewport to SVG (only what you currently see)
  - Used the React flow Controls for zoom in, zoom-out and Fit content
- Theming and polish
  - Mint-green header and controls styling
  - Search and action buttons with hover and focus rings
  - Consistent cursor-pointer on actionable controls
- Non-intrusive MessageBox for feedback with auto-dismiss

## Getting Started

### Prerequisites
- Node.js 18+

### Install
```bash
npm install
```

### Run (development)
```bash
npm run dev
```
The app runs with Vite. Open the URL shown in the terminal (typically `http://localhost:5173`).

### Build
```bash
npm run build
```
Build artifacts are generated in `build/`.

### Preview production build
```bash
npm run preview
```

## How to Use

1. Paste or type JSON into the left textarea
   - Click "Visualize" to parse and render the graph.
2. Search for a node using JSONPath
   - Example: `$.user.address.city` or `items[0].name`
   - Matching node gets a darker, thicker border based on type.
   - Graph auto-centers on first match. Zoom level is preserved afterward.
3. Explore the graph
   - Hover a node to see a white tooltip with full label and path.
   - Click on the canvas to clear any highlight.
4. Export
   - Use the top-right download icon to export the currently visible viewport as an SVG.

## Keyboard/Mouse Tips
- Pan/Zoom: React Flow defaults (drag to pan, wheel to zoom)
- Click canvas: Clear search highlight

## Tech Stack
- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- React Flow 11
- Heroicons 2

## Project Structure
- `src/components/JsonInput.tsx`: JSON textarea and visualize button
- `src/components/SearchBar.tsx`: JSONPath search input and button
- `src/components/MessageBox.tsx`: transient feedback messages
- `src/components/TreeView/TreeView.tsx`: React Flow graph
- `src/components/TreeView/NodeRenderer.tsx`: node UI, truncation, tooltip, highlight styles
- `src/components/ExportButton.tsx`: exports visible viewport as SVG
- `src/utils/exportReactFlowView.ts`: export utilities
- `src/context/JsonContext.tsx`: shared app state

## Notes
- If a search doesn’t match, a message is shown; messages auto-dismiss or can be closed.
- Export only includes nodes/edges visible in the current viewport for concise snapshots.

## License
This project is for demonstration purposes. Adjust and reuse as needed.
