export type AlgorithmType = 'array' | 'graph';

export interface ArrayElement {
  id: string;
  value: number;
}

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  weight?: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface ArrayTraceStep {
  type: 'array';
  array: ArrayElement[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  activeLine: number;
}

export interface GraphTraceStep {
  type: 'graph';
  graph: GraphData;
  activeNodes: string[];
  visitedNodes: string[];
  activeEdges: string[];
  activeLine: number;
}

export type TraceStep = ArrayTraceStep | GraphTraceStep;

export interface ArrayAlgorithmDefinition {
  id: string;
  name: string;
  type: 'array';
  description: string;
  code: string;
  execute: (data: ArrayElement[]) => ArrayTraceStep[];
}

export interface GraphAlgorithmDefinition {
  id: string;
  name: string;
  type: 'graph';
  description: string;
  code: string;
  execute: (data: GraphData) => GraphTraceStep[];
}

export type AlgorithmDefinition = ArrayAlgorithmDefinition | GraphAlgorithmDefinition;
