import { create } from 'zustand';
import type { AlgorithmDefinition, TraceStep, GraphData } from '../core/types';
import { bubbleSort } from '../core/algorithms/bubbleSort';
import { mergeSort } from '../core/algorithms/mergeSort';
import { selectionSort } from '../core/algorithms/selectionSort';
import { insertionSort } from '../core/algorithms/insertionSort';
import { quickSort } from '../core/algorithms/quickSort';
import { heapSort } from '../core/algorithms/heapSort';
import { shellSort } from '../core/algorithms/shellSort';
import { cocktailShakerSort } from '../core/algorithms/cocktailShakerSort';
import { combSort } from '../core/algorithms/combSort';
import { bfs } from '../core/algorithms/bfs';
import { dfs } from '../core/algorithms/dfs';
import { dijkstra } from '../core/algorithms/dijkstra';
import { prim } from '../core/algorithms/prim';

export const algorithms: Record<string, AlgorithmDefinition> = {
  // Array Algorithms
  'bubble-sort': bubbleSort,
  'merge-sort': mergeSort,
  'selection-sort': selectionSort,
  'insertion-sort': insertionSort,
  'quick-sort': quickSort,
  'heap-sort': heapSort,
  'shell-sort': shellSort,
  'cocktail-shaker-sort': cocktailShakerSort,
  'comb-sort': combSort,
  // Graph Algorithms
  'bfs': bfs,
  'dfs': dfs,
  'dijkstra': dijkstra,
  'prim': prim,
};

const generateArray = (size: number) => {
  return Array.from({ length: size }, (_, i) => ({
    id: `id-${i}-${Math.random()}`,
    value: Math.floor(Math.random() * 100) + 10,
  }));
};

const generateGraph = (): GraphData => {
  return {
    nodes: [
      { id: 'A', label: 'A', x: 50, y: 50 },
      { id: 'B', label: 'B', x: 25, y: 150 },
      { id: 'C', label: 'C', x: 75, y: 150 },
      { id: 'D', label: 'D', x: 10, y: 250 },
      { id: 'E', label: 'E', x: 40, y: 250 },
      { id: 'F', label: 'F', x: 60, y: 250 },
      { id: 'G', label: 'G', x: 90, y: 250 },
      { id: 'H', label: 'H', x: 50, y: 350 },
    ],
    edges: [
      { id: 'A-B', source: 'A', target: 'B', weight: 4 },
      { id: 'A-C', source: 'A', target: 'C', weight: 2 },
      { id: 'B-D', source: 'B', target: 'D', weight: 5 },
      { id: 'B-E', source: 'B', target: 'E', weight: 10 },
      { id: 'C-F', source: 'C', target: 'F', weight: 3 },
      { id: 'C-G', source: 'C', target: 'G', weight: 8 },
      { id: 'E-H', source: 'E', target: 'H', weight: 4 },
      { id: 'F-H', source: 'F', target: 'H', weight: 6 },
    ]
  };
};

interface SimulatorState {
  selectedAlgorithm: string;
  arraySize: number;
  
  trace: TraceStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  playbackSpeed: number;
  
  setAlgorithm: (id: string) => void;
  setArraySize: (size: number) => void;
  resetSimulation: () => void;
  
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  setStep: (index: number) => void;
  setPlaybackSpeed: (speed: number) => void;
}

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  selectedAlgorithm: 'bubble-sort',
  arraySize: 15,
  
  trace: (algorithms['bubble-sort'] as any).execute(generateArray(15)),
  currentStepIndex: 0,
  isPlaying: false,
  playbackSpeed: 100,

  setAlgorithm: (id) => {
    const { arraySize } = get();
    const algo = algorithms[id];
    if (algo) {
      let initialTrace: TraceStep[];
      if (algo.type === 'array') {
        initialTrace = (algo as any).execute(generateArray(arraySize));
      } else {
        initialTrace = (algo as any).execute(generateGraph());
      }
      
      set({ 
        selectedAlgorithm: id, 
        trace: initialTrace,
        currentStepIndex: 0,
        isPlaying: false
      });
    }
  },

  setArraySize: (size) => {
    const { selectedAlgorithm } = get();
    const algo = algorithms[selectedAlgorithm];
    if (algo.type === 'array') {
      set({
        arraySize: size,
        trace: (algo as any).execute(generateArray(size)),
        currentStepIndex: 0,
        isPlaying: false
      });
    } else {
      set({ arraySize: size });
    }
  },

  resetSimulation: () => {
    const { selectedAlgorithm, arraySize } = get();
    const algo = algorithms[selectedAlgorithm];
    
    let initialTrace: TraceStep[];
    if (algo.type === 'array') {
      initialTrace = (algo as any).execute(generateArray(arraySize));
    } else {
      initialTrace = (algo as any).execute(generateGraph());
    }

    set({
      trace: initialTrace,
      currentStepIndex: 0,
      isPlaying: false
    });
  },

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  
  stepForward: () => {
    const { currentStepIndex, trace } = get();
    if (currentStepIndex < trace.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      set({ isPlaying: false });
    }
  },

  stepBackward: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1, isPlaying: false });
    }
  },

  setStep: (index) => set({ currentStepIndex: index }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
}));
