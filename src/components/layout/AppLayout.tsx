import { PlaybackControls } from '../controls/PlaybackControls';
import { CodeViewer } from '../editor/CodeViewer';
import { ArrayVisualizer } from '../visualization/ArrayVisualizer';
import { useSimulatorStore, algorithms } from '../../store/useSimulatorStore';

export const AppLayout = () => {
  const { selectedAlgorithm } = useSimulatorStore();
  const algoInfo = algorithms[selectedAlgorithm];

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="logo-area">
          <div className="logo-icon"></div>
          <h1>AlgoVisualizer</h1>
        </div>
        <div className="header-info">
          <h2>{algoInfo.name}</h2>
          <p>{algoInfo.description}</p>
        </div>
      </header>

      <main className="app-main">
        <div className="visualization-pane">
          <ArrayVisualizer />
          <PlaybackControls />
        </div>
        <div className="sidebar-pane">
          <CodeViewer />
        </div>
      </main>
    </div>
  );
};
