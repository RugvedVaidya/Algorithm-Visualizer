import { useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { useSimulatorStore, algorithms } from '../../store/useSimulatorStore';

export const PlaybackControls = () => {
  const store = useSimulatorStore();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (store.isPlaying) {
      intervalRef.current = window.setInterval(() => {
        store.stepForward();
      }, store.playbackSpeed);
    } else if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [store.isPlaying, store.playbackSpeed, store.currentStepIndex, store.trace.length]);

  return (
    <div className="playback-controls">
      <div className="controls-row top-row">
        <select 
          className="algo-select"
          value={store.selectedAlgorithm}
          onChange={(e) => store.setAlgorithm(e.target.value)}
        >
          {Object.values(algorithms).map(algo => (
            <option key={algo.id} value={algo.id}>{algo.name}</option>
          ))}
        </select>
        
        <div className="main-buttons">
          <button onClick={store.resetSimulation} title="Reset" className="control-btn icon-btn"><RotateCcw size={20} /></button>
          <button onClick={store.stepBackward} disabled={store.currentStepIndex === 0} title="Step Backward" className="control-btn icon-btn"><SkipBack size={20} /></button>
          <button onClick={store.isPlaying ? store.pause : store.play} title={store.isPlaying ? 'Pause' : 'Play'} className="control-btn play-btn">
            {store.isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>
          <button onClick={store.stepForward} disabled={store.currentStepIndex >= store.trace.length - 1} title="Step Forward" className="control-btn icon-btn"><SkipForward size={20} /></button>
        </div>

        <div className="speed-control">
          <label>Speed</label>
          <input 
            type="range" 
            min="10" 
            max="1000" 
            step="10"
            value={1010 - store.playbackSpeed}
            onChange={(e) => store.setPlaybackSpeed(1010 - parseInt(e.target.value))}
          />
        </div>
      </div>
      
      <div className="timeline-row">
        <input 
          type="range" 
          className="timeline-slider"
          min={0}
          max={store.trace.length - 1}
          value={store.currentStepIndex}
          onChange={(e) => store.setStep(parseInt(e.target.value))}
        />
        <div className="step-counter">
          Step {store.currentStepIndex + 1} / {store.trace.length}
        </div>
      </div>
    </div>
  );
};
