import type { GraphAlgorithmDefinition, GraphData, GraphTraceStep } from '../types';

const code = `function dfs(graph, startNodeId) {
  let visited = new Set();
  
  function explore(node) {
    visited.add(node);
    
    let neighbors = getNeighbors(graph, node);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        explore(neighbor);
      }
    }
  }
  
  explore(startNodeId);
}`;

export const dfs: GraphAlgorithmDefinition = {
  id: 'dfs',
  name: 'Depth-First Search',
  type: 'graph',
  description: 'An algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking.',
  code,
  execute: (data: GraphData) => {
    const trace: GraphTraceStep[] = [];

    const pushState = (activeN: string[], visitedN: string[], activeE: string[], line: number) => {
      trace.push({
        type: 'graph',
        graph: data,
        activeNodes: [...activeN],
        visitedNodes: [...visitedN],
        activeEdges: [...activeE],
        activeLine: line
      });
    };

    if (data.nodes.length === 0) return trace;
    const startNode = data.nodes[0].id;
    
    pushState([], [], [], 1);

    let visited = new Set<string>();
    pushState([], [], [], 2);
    
    const explore = (node: string, incomingEdge?: string) => {
      pushState([node], Array.from(visited), incomingEdge ? [incomingEdge] : [], 4);
      
      visited.add(node);
      pushState([node], Array.from(visited), incomingEdge ? [incomingEdge] : [], 5);
      
      let edges = data.edges.filter(e => e.source === node || e.target === node);
      pushState([node], Array.from(visited), incomingEdge ? [incomingEdge] : [], 7);
      
      pushState([node], Array.from(visited), incomingEdge ? [incomingEdge] : [], 8);
      for (let edge of edges) {
        let neighbor = edge.source === node ? edge.target : edge.source;
        
        pushState([node, neighbor], Array.from(visited), [edge.id], 9);
        if (!visited.has(neighbor)) {
          pushState([node, neighbor], Array.from(visited), [edge.id], 10);
          explore(neighbor, edge.id);
        }
        pushState([node], Array.from(visited), incomingEdge ? [incomingEdge] : [], 8);
      }
    };

    pushState([], Array.from(visited), [], 15);
    explore(startNode);
    
    pushState([], Array.from(visited), [], 16);

    return trace;
  }
};
