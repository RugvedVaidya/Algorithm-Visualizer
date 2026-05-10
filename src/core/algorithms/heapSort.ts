import type { AlgorithmDefinition, ArrayElement, TraceStep } from '../types';

const code = `function heapSort(arr) {
  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(arr, i, 0);
  }
}

function heapify(arr, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest])
    largest = l;
  if (r < n && arr[r] > arr[largest])
    largest = r;
  if (largest != i) {
    let swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    heapify(arr, n, largest);
  }
}`;

export const heapSort: AlgorithmDefinition = {
  id: 'heap-sort',
  name: 'Heap Sort',
  description: 'A comparison-based sorting technique based on Binary Heap data structure.',
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

    const heapify = (nParam: number, i: number) => {
      pushState([], [], 14); // function heapify...
      let largest = i;
      pushState([], [], 15); // let largest = i;
      let l = 2 * i + 1;
      let r = 2 * i + 2;
      pushState([], [], 17); // let l, r ...
      
      pushState([l, largest], [], 18); // if l < n && arr[l] > arr[largest]
      if (l < nParam && arr[l].value > arr[largest].value) {
        largest = l;
        pushState([], [], 19); // largest = l
      }
      
      pushState([r, largest], [], 20); // if r < n && arr[r] > arr[largest]
      if (r < nParam && arr[r].value > arr[largest].value) {
        largest = r;
        pushState([], [], 21); // largest = r
      }
      
      pushState([], [], 22); // if largest != i
      if (largest != i) {
        pushState([i, largest], [], 23); // let swap...
        let swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        pushState([], [i, largest], 25); // swap done
        
        pushState([], [], 26); // heapify(arr, n, largest)
        heapify(nParam, largest);
      }
    };

    pushState([], [], 2); // let n = arr.length
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      pushState([], [], 3); // for i ...
      pushState([], [], 4); // heapify...
      heapify(n, i);
    }
    
    for (let i = n - 1; i > 0; i--) {
      pushState([], [], 5); // for i ...
      
      pushState([0, i], [], 6); // temp = arr[0]
      let temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      pushState([], [0, i], 8); // arr[i] = temp
      
      sortedIndices.push(i);
      
      pushState([], [], 9); // heapify...
      heapify(i, 0);
    }
    
    sortedIndices.push(0);
    pushState([], [], 11); // done

    return trace;
  }
};
