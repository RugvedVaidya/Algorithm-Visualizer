import { create } from 'zustand';
import type { AlgorithmDefinition, TraceStep } from '../core/types';
import { bubbleSort } from '../core/algorithms/bubbleSort';
import { mergeSort } from '../core/algorithms/mergeSort';
import { selectionSort } from '../core/algorithms/selectionSort';
import { insertionSort } from '../core/algorithms/insertionSort';
import { quickSort } from '../core/algorithms/quickSort';
import { heapSort } from '../core/algorithms/heapSort';
import { shellSort } from '../core/algorithms/shellSort';
import { cocktailShakerSort } from '../core/algorithms/cocktailShakerSort';
import { combSort } from '../core/algorithms/combSort';

export const algorithms: Record<string, AlgorithmDefinition> = {
  'bubble-sort': bubbleSort,
  'merge-sort': mergeSort,
  'selection-sort': selectionSort,
  'insertion-sort': insertionSort,
  'quick-sort': quickSort,
  'heap-sort': heapSort,
  'shell-sort': shellSort,
  'cocktail-shaker-sort': cocktailShakerSort,
  'comb-sort': combSort,
};

const generateArray = (size: number) => {
  return Array.from({ length: size }, (_, i) => ({
    id: `id-${i}-${Math.random()}`,
    value: Math.floor(Math.random() * 100) + 10,
  }));
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
  
  trace: algorithms['bubble-sort'].execute(generateArray(15)),
  currentStepIndex: 0,
  isPlaying: false,
  playbackSpeed: 100,

  setAlgorithm: (id) => {
    const { arraySize } = get();
    const algo = algorithms[id];
    if (algo) {
      set({ 
        selectedAlgorithm: id, 
        trace: algo.execute(generateArray(arraySize)),
        currentStepIndex: 0,
        isPlaying: false
      });
    }
  },

  setArraySize: (size) => {
    const { selectedAlgorithm } = get();
    const algo = algorithms[selectedAlgorithm];
    set({
      arraySize: size,
      trace: algo.execute(generateArray(size)),
      currentStepIndex: 0,
      isPlaying: false
    });
  },

  resetSimulation: () => {
    const { selectedAlgorithm, arraySize } = get();
    const algo = algorithms[selectedAlgorithm];
    set({
      trace: algo.execute(generateArray(arraySize)),
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
