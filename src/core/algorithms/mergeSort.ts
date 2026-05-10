import type { AlgorithmDefinition, ArrayElement, TraceStep } from '../types';

const code = `function mergeSort(arr, l, r) {
  if (l >= r) return;
  let m = l + Math.floor((r - l) / 2);
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  inPlaceMerge(arr, l, m, r);
}

function inPlaceMerge(arr, start, mid, end) {
  let start2 = mid + 1;
  if (arr[mid] <= arr[start2]) return;

  while (start <= mid && start2 <= end) {
    if (arr[start] <= arr[start2]) {
      start++;
    } else {
      let index = start2;
      while (index !== start) {
        let temp = arr[index];
        arr[index] = arr[index - 1];
        arr[index - 1] = temp;
        index--;
      }
      start++;
      mid++;
      start2++;
    }
  }
}`;

export const mergeSort: AlgorithmDefinition = {
  id: 'merge-sort',
  name: 'Merge Sort',
  description: 'An in-place variation of Merge Sort to correctly visualize element movements without duplicating references.',
  code,
  execute: (initialArray: ArrayElement[]) => {
    const trace: TraceStep[] = [];
    const arr = [...initialArray];
    const n = arr.length;

    const pushState = (comparing: number[], swapping: number[], activeLine: number) => {
      trace.push({
        array: [...arr],
        comparing,
        swapping,
        sorted: [], 
        activeLine
      });
    };

    const inPlaceMerge = (start: number, mid: number, end: number) => {
      pushState([], [], 9); // function inPlaceMerge...
      let start2 = mid + 1;
      pushState([], [], 10); // let start2...
      
      pushState([mid, start2], [], 11); // if (arr[mid] <= arr[start2])
      if (arr[mid].value <= arr[start2].value) return;

      pushState([], [], 13); // while...
      while (start <= mid && start2 <= end) {
        pushState([start, start2], [], 14); // comparison
        if (arr[start].value <= arr[start2].value) {
          start++;
          pushState([], [], 15); // start++
        } else {
          let index = start2;
          pushState([], [], 17); // let index = start2
          
          pushState([], [], 18); // while (index !== start)
          while (index !== start) {
            let temp = arr[index];
            arr[index] = arr[index - 1];
            arr[index - 1] = temp;
            pushState([], [index, index - 1], 21); // swap animation
            index--;
          }
          start++;
          mid++;
          start2++;
          pushState([], [], 25); // increment pointers
        }
        pushState([], [], 13); // while...
      }
    };

    const doMergeSort = (l: number, r: number) => {
      pushState([], [], 1); // function mergeSort...
      pushState([], [], 2); // if (l >= r) return;
      if (l >= r) return;
      
      let m = l + Math.floor((r - l) / 2);
      pushState([], [], 3); // let m = ...
      
      pushState([], [], 4); // mergeSort(arr, l, m);
      doMergeSort(l, m);
      
      pushState([], [], 5); // mergeSort(arr, m + 1, r);
      doMergeSort(m + 1, r);
      
      pushState([], [], 6); // inPlaceMerge(arr, l, m, r);
      inPlaceMerge(l, m, r);
    };

    pushState([], [], 1);
    doMergeSort(0, n - 1);
    
    // Mark all as sorted at the end
    trace.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: n }, (_, i) => i),
      activeLine: 1
    });

    return trace;
  }
};
