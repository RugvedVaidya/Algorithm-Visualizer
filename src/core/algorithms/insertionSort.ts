import type { AlgorithmDefinition, ArrayElement, ArrayTraceStep } from '../types';

const code = `function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      let temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;
      j--;
    }
  }
  return arr;
}`;

export const insertionSort: AlgorithmDefinition = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  type: 'array',
  description: 'Builds the final sorted array one item at a time by repeatedly taking the next element and swapping it into its correct position.',
  code,
  execute: (initialArray: ArrayElement[]) => {
    const trace: ArrayTraceStep[] = [];
    const arr = [...initialArray];
    const n = arr.length;
    const sortedIndices: number[] = [0];

    const pushState = (comparing: number[], swapping: number[], activeLine: number) => {
      trace.push({
        type: 'array',
        array: [...arr],
        comparing,
        swapping,
        sorted: [...sortedIndices],
        activeLine
      });
    };

    pushState([], [], 2); // let n = arr.length;

    for (let i = 1; i < n; i++) {
      pushState([], [], 3); // for i
      let j = i;
      pushState([], [], 4); // let j = i;
      
      pushState([j - 1, j], [], 5); // while...
      while (j > 0 && arr[j - 1].value > arr[j].value) {
        let temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
        
        pushState([], [j, j - 1], 8); // swap
        
        j--;
        pushState([], [], 9); // j--;
        
        if (j > 0) {
          pushState([j - 1, j], [], 5); // while...
        }
      }
      
      sortedIndices.push(i);
    }
    
    pushState([], [], 12); // return arr;

    return trace;
  }
};
