import type { AlgorithmDefinition, ArrayElement, TraceStep } from '../types';

const code = `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    if (min_idx !== i) {
      let temp = arr[i];
      arr[i] = arr[min_idx];
      arr[min_idx] = temp;
    }
  }
  return arr;
}`;

export const selectionSort: AlgorithmDefinition = {
  id: 'selection-sort',
  name: 'Selection Sort',
  description: 'Sorts an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.',
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

    for (let i = 0; i < n - 1; i++) {
      pushState([], [], 3); // for i
      let min_idx = i;
      pushState([], [], 4); // let min_idx = i;
      
      for (let j = i + 1; j < n; j++) {
        pushState([], [], 5); // for j
        
        pushState([j, min_idx], [], 6); // if (arr[j] < arr[min_idx])
        if (arr[j].value < arr[min_idx].value) {
          min_idx = j;
          pushState([], [], 7); // min_idx = j;
        }
      }
      
      pushState([], [], 10); // if (min_idx !== i)
      if (min_idx !== i) {
        pushState([i, min_idx], [], 11); // let temp = arr[i];
        let temp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = temp;
        pushState([], [i, min_idx], 13); // arr[min_idx] = temp; (swap complete)
      }
      sortedIndices.push(i);
    }
    sortedIndices.push(n - 1);
    pushState([], [], 16); // return arr;

    return trace;
  }
};
