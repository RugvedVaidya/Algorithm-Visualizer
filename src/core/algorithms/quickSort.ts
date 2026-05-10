import type { AlgorithmDefinition, ArrayElement, TraceStep } from '../types';

const code = `function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = (low - 1);
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return (i + 1);
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}`;

export const quickSort: AlgorithmDefinition = {
  id: 'quick-sort',
  name: 'Quick Sort',
  description: 'A divide-and-conquer algorithm that picks a pivot and partitions the array around the pivot.',
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

    const doSwap = (i: number, j: number) => {
      pushState([i, j], [], 23); // function swap...
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      pushState([], [i, j], 26); // arr[j] = temp;
    };

    const partition = (low: number, high: number) => {
      pushState([], [], 9); // function partition...
      let pivot = arr[high];
      pushState([high], [], 10); // let pivot = arr[high];
      
      let i = (low - 1);
      pushState([], [], 11); // let i = ...
      
      for (let j = low; j <= high - 1; j++) {
        pushState([], [], 12); // for j...
        
        pushState([j, high], [], 13); // if (arr[j] < pivot)
        if (arr[j].value < pivot.value) {
          i++;
          pushState([], [], 14); // i++
          pushState([], [], 15); // swap(arr, i, j)
          doSwap(i, j);
        }
      }
      pushState([], [], 18); // swap(arr, i + 1, high)
      doSwap(i + 1, high);
      
      sortedIndices.push(i + 1); // Pivot is in its final position
      pushState([], [], 19); // return (i + 1)
      return (i + 1);
    };

    const doQuickSort = (low: number, high: number) => {
      pushState([], [], 1); // function quickSort...
      pushState([], [], 2); // if (low < high)
      if (low < high) {
        pushState([], [], 3); // let pi = partition...
        let pi = partition(low, high);
        
        pushState([], [], 4); // quickSort(arr, low, pi - 1)
        doQuickSort(low, pi - 1);
        
        pushState([], [], 5); // quickSort(arr, pi + 1, high)
        doQuickSort(pi + 1, high);
      } else if (low === high) {
        if (!sortedIndices.includes(low)) sortedIndices.push(low);
      }
    };

    pushState([], [], 1);
    doQuickSort(0, n - 1);
    
    // Mark all as sorted at the end
    for(let k=0; k<n; k++) {
      if(!sortedIndices.includes(k)) sortedIndices.push(k);
    }
    pushState([], [], 1);

    return trace;
  }
};
