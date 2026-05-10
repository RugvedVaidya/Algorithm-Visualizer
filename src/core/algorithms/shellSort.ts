import type { AlgorithmDefinition, ArrayElement, TraceStep } from '../types';

const code = `function shellSort(arr) {
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let j = i;
      while (j >= gap && arr[j - gap] > arr[j]) {
        let temp = arr[j];
        arr[j] = arr[j - gap];
        arr[j - gap] = temp;
        j -= gap;
      }
    }
  }
  return arr;
}`;

export const shellSort: AlgorithmDefinition = {
  id: 'shell-sort',
  name: 'Shell Sort',
  description: 'An optimization of insertion sort that allows the exchange of items that are far apart.',
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

    pushState([], [], 2); // let n = arr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      pushState([], [], 3); // for gap...
      
      for (let i = gap; i < n; i++) {
        pushState([], [], 4); // for i...
        let j = i;
        pushState([], [], 5); // let j = i;
        
        pushState([j - gap, j], [], 6); // while...
        while (j >= gap && arr[j - gap].value > arr[j].value) {
          let temp = arr[j];
          arr[j] = arr[j - gap];
          arr[j - gap] = temp;
          
          pushState([], [j, j - gap], 9); // swap
          
          j -= gap;
          pushState([], [], 10); // j -= gap;
          
          if (j >= gap) {
             pushState([j - gap, j], [], 6); // while...
          }
        }
      }
    }
    
    for(let k=0; k<n; k++) sortedIndices.push(k);
    pushState([], [], 14); // return arr;

    return trace;
  }
};
