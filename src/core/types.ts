export interface ArrayElement {
  id: string;
  value: number;
}

export interface TraceStep {
  array: ArrayElement[];
  comparing: number[]; // Indices of elements being compared
  swapping: number[];  // Indices of elements being swapped
  sorted: number[];    // Indices of elements fully sorted
  activeLine: number;  // Line number of the code being executed
}

export interface AlgorithmDefinition {
  id: string;
  name: string;
  description: string;
  code: string;
  execute: (array: ArrayElement[]) => TraceStep[];
}
