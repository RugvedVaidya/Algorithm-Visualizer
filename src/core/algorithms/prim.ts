import type { GraphAlgorithmDefinition, GraphData, GraphTraceStep } from '../types';

const code = `function prim(graph, startNodeId) {
  let mstNodes = new Set([startNodeId]);
  let mstEdges = [];
  
  while (mstNodes.size < graph.nodes.length) {
    let minEdge = null;
    let minWeight = Infinity;
    
    for (let edge of graph.edges) {
      let u = edge.source;
      let v = edge.target;
      let weight = edge.weight || 1;
      
      let uInMST = mstNodes.has(u);
      let vInMST = mstNodes.has(v);
      
      if ((uInMST && !vInMST) || (!uInMST && vInMST)) {
        if (weight < minWeight) {
          minWeight = weight;
          minEdge = edge;
        }
      }
    }
    
    if (minEdge) {
      mstEdges.push(minEdge.id);
      mstNodes.add(minEdge.source);
      mstNodes.add(minEdge.target);
    } else {
      break;
    }
  }
}`;

export const prim: GraphAlgorithmDefinition = {
  id: 'prim',
  name: "Prim's Minimum Spanning Tree",
  type: 'graph',
  description: "An algorithm that finds a minimum spanning tree for a weighted undirected graph. This means it finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized.",
  code,
  execute: (data: GraphData) => {
    const trace: GraphTraceStep[] = [];
    const mstNodes = new Set<string>();
    const mstEdges: string[] = [];

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
    
    mstNodes.add(startNodeId);
    pushState([startNodeId], [startNodeId], [], 2);
    
    pushState([], Array.from(mstNodes), mstEdges, 3);
    
    pushState([], Array.from(mstNodes), mstEdges, 5);
    while (mstNodes.size < data.nodes.length) {
      let minEdge: any = null;
      let minWeight = Infinity;
      pushState([], Array.from(mstNodes), mstEdges, 6);
      pushState([], Array.from(mstNodes), mstEdges, 7);
      
      pushState([], Array.from(mstNodes), mstEdges, 9);
      for (const edge of data.edges) {
        const u = edge.source;
        const v = edge.target;
        const weight = edge.weight || 1;
        
        const uInMST = mstNodes.has(u);
        const vInMST = mstNodes.has(v);
        
        pushState([u, v], Array.from(mstNodes), [edge.id, ...mstEdges], 14);
        if ((uInMST && !vInMST) || (!uInMST && vInMST)) {
          pushState([u, v], Array.from(mstNodes), [edge.id, ...mstEdges], 15);
          if (weight < minWeight) {
            minWeight = weight;
            minEdge = edge;
            pushState([u, v], Array.from(mstNodes), [edge.id, ...mstEdges], 16);
          }
        }
        pushState([], Array.from(mstNodes), mstEdges, 9);
      }
      
      pushState([], Array.from(mstNodes), mstEdges, 23);
      if (minEdge) {
        mstEdges.push(minEdge.id);
        pushState([], Array.from(mstNodes), mstEdges, 24);
        
        mstNodes.add(minEdge.source);
        mstNodes.add(minEdge.target);
        pushState([minEdge.source, minEdge.target], Array.from(mstNodes), mstEdges, 25);
      } else {
        pushState([], Array.from(mstNodes), mstEdges, 28);
        break;
      }
      pushState([], Array.from(mstNodes), mstEdges, 5);
    }

    pushState([], Array.from(mstNodes), mstEdges, 32);

    return trace;
  }
};
