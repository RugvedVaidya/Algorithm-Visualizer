import type { GraphAlgorithmDefinition, GraphData, GraphTraceStep } from '../types';

const code = `function bfs(graph, startNodeId) {
  let queue = [startNodeId];
  let visited = new Set();
  visited.add(startNodeId);

  while (queue.length > 0) {
    let current = queue.shift();
    
    let neighbors = getNeighbors(graph, current);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`;

export const bfs: GraphAlgorithmDefinition = {
  id: 'bfs',
  name: 'Breadth-First Search',
  type: 'graph',
  description: 'An algorithm for traversing or searching tree or graph data structures. It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level.',
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

    let queue: string[] = [startNode];
    pushState([startNode], [], [], 2);
    
    let visited = new Set<string>();
    pushState([startNode], [], [], 3);
    
    visited.add(startNode);
    pushState([startNode], [startNode], [], 4);

    pushState([startNode], [startNode], [], 6);
    while (queue.length > 0) {
      let current = queue.shift()!;
      pushState([current], Array.from(visited), [], 7);
      
      let edges = data.edges.filter(e => e.source === current || e.target === current);
      pushState([current], Array.from(visited), [], 9);
      
      pushState([current], Array.from(visited), [], 10);
      for (let edge of edges) {
        let neighbor = edge.source === current ? edge.target : edge.source;
        
        pushState([current, neighbor], Array.from(visited), [edge.id], 11);
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          pushState([current, neighbor], Array.from(visited), [edge.id], 12);
          
          queue.push(neighbor);
          pushState([current, neighbor], Array.from(visited), [edge.id], 13);
        }
        pushState([current], Array.from(visited), [], 10);
      }
      pushState([], Array.from(visited), [], 6);
    }
    
    pushState([], Array.from(visited), [], 17);

    return trace;
  }
};
