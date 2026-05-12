import type { AlgorithmDefinition, ArrayElement, ArrayTraceStep } from '../types';

const code = `function cocktailShakerSort(arr) {
  let is_swapped = true;
  let start = 0;
  let end = arr.length - 1;

  while (is_swapped) {
    is_swapped = false;
    for (let i = start; i < end; ++i) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        is_swapped = true;
      }
    }
    if (!is_swapped) break;
    
    is_swapped = false;
    end = end - 1;
    for (let i = end - 1; i >= start; --i) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        is_swapped = true;
      }
    }
    start = start + 1;
  }
  return arr;
}`;

export const cocktailShakerSort: AlgorithmDefinition = {
  id: 'cocktail-shaker-sort',
  name: 'Cocktail Shaker Sort',
  type: 'array',
  description: 'A bidirectional bubble sort that traverses the array in both directions alternatively.',
  code,
  execute: (initialArray: ArrayElement[]) => {
    const trace: ArrayTraceStep[] = [];
    const arr = [...initialArray];
    const n = arr.length;
    const sortedIndices: number[] = [];

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

    let is_swapped = true;
    pushState([], [], 2);
    let start = 0;
    pushState([], [], 3);
    let end = n - 1;
    pushState([], [], 4);

    pushState([], [], 6); // while
    while (is_swapped) {
      is_swapped = false;
      pushState([], [], 7);
      
      for (let i = start; i < end; ++i) {
        pushState([], [], 8); // for i
        pushState([i, i + 1], [], 9); // if
        if (arr[i].value > arr[i + 1].value) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          pushState([], [i, i + 1], 12); // swap
          is_swapped = true;
          pushState([], [], 13);
        }
      }
      sortedIndices.push(end);
      
      pushState([], [], 16); // if !is_swapped
      if (!is_swapped) break;
      
      is_swapped = false;
      pushState([], [], 18);
      
      end = end - 1;
      pushState([], [], 19);
      
      for (let i = end - 1; i >= start; --i) {
        pushState([], [], 20); // for i
        pushState([i, i + 1], [], 21); // if
        if (arr[i].value > arr[i + 1].value) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          pushState([], [i, i + 1], 24); // swap
          is_swapped = true;
          pushState([], [], 25);
        }
      }
      sortedIndices.push(start);
      start = start + 1;
      pushState([], [], 28);
      pushState([], [], 6); // while loop back
    }
    
    for(let k=0; k<n; k++) {
      if (!sortedIndices.includes(k)) sortedIndices.push(k);
    }
    pushState([], [], 30); // return arr;

    return trace;
  }
};
