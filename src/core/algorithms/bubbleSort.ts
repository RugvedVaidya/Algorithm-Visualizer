import type { AlgorithmDefinition, ArrayElement, ArrayTraceStep } from '../types';

const code = `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`;

export const bubbleSort: AlgorithmDefinition = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  type: 'array',
  description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  code,
  execute: (initialArray: ArrayElement[]) => {
    const trace: ArrayTraceStep[] = [];
    const arr = [...initialArray];
    const n = arr.length;
    let sortedIndices: number[] = [];

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
    
    for (let i = 0; i < n - 1; i++) {
      pushState([], [], 3); // outer loop
      
      for (let j = 0; j < n - i - 1; j++) {
        pushState([], [], 4); // inner loop
        
        pushState([j, j + 1], [], 5); // comparison
        if (arr[j].value > arr[j + 1].value) {
          pushState([j, j + 1], [], 6); // assignment start
          
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          
          pushState([], [j, j + 1], 8); // swap complete
        }
      }
      sortedIndices.push(n - i - 1);
    }
    sortedIndices.push(0);
    pushState([], [], 12); // return

    return trace;
  }
};
