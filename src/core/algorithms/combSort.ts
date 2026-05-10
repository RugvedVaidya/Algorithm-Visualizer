import type { AlgorithmDefinition, ArrayElement, TraceStep } from '../types';

const code = `function combSort(arr) {
  let n = arr.length;
  let gap = n;
  let swapped = true;

  while (gap !== 1 || swapped === true) {
    gap = Math.floor((gap * 10) / 13);
    if (gap < 1) gap = 1;

    swapped = false;
    for (let i = 0; i < n - gap; i++) {
      if (arr[i] > arr[i + gap]) {
        let temp = arr[i];
        arr[i] = arr[i + gap];
        arr[i + gap] = temp;
        swapped = true;
      }
    }
  }
  return arr;
}`;

export const combSort: AlgorithmDefinition = {
  id: 'comb-sort',
  name: 'Comb Sort',
  description: 'An improvement over Bubble Sort that uses a gap sequence to eliminate turtles (small values near the end).',
  code,
  execute: (initialArray: ArrayElement[]) => {
    const trace: TraceStep[] = [];
    const arr = [...initialArray];
    const n = arr.length;
    const sortedIndices: number[] = [];

    const pushState = (comparing: number[], swapping: number[], activeLine: number) => {
      trace.push({
        array: [...arr],
        comparing,
        swapping,
        sorted: [...sortedIndices],
        activeLine
      });
    };

    let gap = n;
    pushState([], [], 3);
    let swapped = true;
    pushState([], [], 4);

    pushState([], [], 6); // while
    while (gap !== 1 || swapped === true) {
      gap = Math.floor((gap * 10) / 13);
      if (gap < 1) gap = 1;
      pushState([], [], 8);

      swapped = false;
      pushState([], [], 10);
      
      for (let i = 0; i < n - gap; i++) {
        pushState([], [], 11);
        pushState([i, i + gap], [], 12);
        
        if (arr[i].value > arr[i + gap].value) {
          let temp = arr[i];
          arr[i] = arr[i + gap];
          arr[i + gap] = temp;
          pushState([], [i, i + gap], 15);
          swapped = true;
          pushState([], [], 16);
        }
      }
      pushState([], [], 6);
    }
    
    for(let k=0; k<n; k++) sortedIndices.push(k);
    pushState([], [], 20); // return arr;

    return trace;
  }
};
