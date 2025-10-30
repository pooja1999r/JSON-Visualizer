import React from 'react';
import './App.css';
import { JsonProvider } from './context/JsonContext';
import VisualizerPage from './pages/VisualizerPage';

const App: React.FC = () => {
  return (
    <div className="App" style={{ padding: 16 }}>
      <JsonProvider>
        <VisualizerPage />
      </JsonProvider>
    </div>
  );
};

export default App;
