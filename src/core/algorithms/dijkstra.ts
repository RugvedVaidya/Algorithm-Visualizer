import type { GraphAlgorithmDefinition, GraphData, GraphTraceStep } from '../types';

const code = `function dijkstra(graph, startNodeId) {
  let distances = {};
  let pq = new PriorityQueue();
  let visited = new Set();

  for (let node of graph.nodes) {
    distances[node.id] = Infinity;
  }
  distances[startNodeId] = 0;
  pq.push(startNodeId, 0);

  while (!pq.isEmpty()) {
    let { node: current, priority: dist } = pq.pop();
    if (visited.has(current)) continue;
    visited.add(current);

    let edges = getEdges(graph, current);
    for (let edge of edges) {
      let neighbor = edge.target === current ? edge.source : edge.target;
      let newDist = distances[current] + edge.weight;
      
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.push(neighbor, newDist);
      }
    }
  }
}`;

export const dijkstra: GraphAlgorithmDefinition = {
  id: 'dijkstra',
  name: "Dijkstra's Shortest Path",
  type: 'graph',
  description: "An algorithm for finding the shortest paths between nodes in a graph. It picks the unvisited node with the lowest distance, calculates the distance through it to each unvisited neighbor, and updates the neighbor's distance if smaller.",
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
    const startNodeId = data.nodes[0].id;

    pushState([], [], [], 1);
    
    let distances: Record<string, number> = {};
    pushState([], [], [], 2);
    
    // Priority queue simplified as a sorted array for visualization
    let pq: { id: string; dist: number }[] = [];
    pushState([], [], [], 3);
    
    let visited = new Set<string>();
    pushState([], [], [], 4);

    for (let node of data.nodes) {
      distances[node.id] = Infinity;
    }
    pushState([], [], [], 6);

    distances[startNodeId] = 0;
    pushState([startNodeId], [], [], 9);

    pq.push({ id: startNodeId, dist: 0 });
    pushState([startNodeId], [], [], 10);

    pushState([], [], [], 12);
    while (pq.length > 0) {
      // Pop the node with the smallest distance
      pq.sort((a, b) => a.dist - b.dist);
      const { id: current, dist } = pq.shift()!;
      
      pushState([current], Array.from(visited), [], 13);
      
      if (visited.has(current)) {
        pushState([current], Array.from(visited), [], 14);
        continue;
      }
      
      visited.add(current);
      pushState([current], Array.from(visited), [], 15);

      const edges = data.edges.filter(e => e.source === current || e.target === current);
      pushState([current], Array.from(visited), [], 17);

      pushState([current], Array.from(visited), [], 18);
      for (const edge of edges) {
        const neighbor = edge.source === current ? edge.target : edge.source;
        const weight = edge.weight || 1;
        const newDist = distances[current] + weight;
        
        pushState([current, neighbor], Array.from(visited), [edge.id], 19);
        pushState([current, neighbor], Array.from(visited), [edge.id], 20);
        
        pushState([current, neighbor], Array.from(visited), [edge.id], 22);
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          pushState([current, neighbor], Array.from(visited), [edge.id], 23);
          
          pq.push({ id: neighbor, dist: newDist });
          pushState([current, neighbor], Array.from(visited), [edge.id], 24);
        }
        pushState([current], Array.from(visited), [], 18);
      }
      pushState([], Array.from(visited), [], 12);
    }

    pushState([], Array.from(visited), [], 30);

    return trace;
  }
};
