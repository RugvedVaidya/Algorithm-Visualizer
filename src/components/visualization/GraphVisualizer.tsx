import { motion } from 'framer-motion';
import { useSimulatorStore } from '../../store/useSimulatorStore';
import type { GraphTraceStep } from '../../core/types';

export const GraphVisualizer = () => {
  const { trace, currentStepIndex } = useSimulatorStore();
  const currentStep = trace[currentStepIndex];

  if (!currentStep || currentStep.type !== 'graph') return null;

  const { graph, activeNodes, visitedNodes, activeEdges } = currentStep as GraphTraceStep;

  // Calculate SVG bounds with some padding
  const minX = Math.min(...graph.nodes.map(n => n.x)) - 40;
  const maxX = Math.max(...graph.nodes.map(n => n.x)) + 40;
  const minY = Math.min(...graph.nodes.map(n => n.y)) - 40;
  const maxY = Math.max(...graph.nodes.map(n => n.y)) + 40;
  const width = maxX - minX;
  const height = maxY - minY;

  return (
    <div className="graph-visualizer">
      <svg 
        viewBox={`${minX} ${minY} ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="graph-svg"
      >
        <g className="edges">
          {graph.edges.map(edge => {
            const sourceNode = graph.nodes.find(n => n.id === edge.source);
            const targetNode = graph.nodes.find(n => n.id === edge.target);
            
            if (!sourceNode || !targetNode) return null;

            const isActive = activeEdges.includes(edge.id);
            
            return (
              <g key={edge.id}>
                <motion.line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  className={`graph-edge ${isActive ? 'active' : ''}`}
                />
                {edge.weight !== undefined && (
                  <text
                    x={(sourceNode.x + targetNode.x) / 2}
                    y={(sourceNode.y + targetNode.y) / 2}
                    dy="-5"
                    className="graph-edge-weight"
                    textAnchor="middle"
                  >
                    {edge.weight}
                  </text>
                )}
              </g>
            );
          })}
        </g>
        
        <g className="nodes">
          {graph.nodes.map(node => {
            const isActive = activeNodes.includes(node.id);
            const isVisited = visitedNodes.includes(node.id);
            
            let stateClass = 'default';
            if (isActive) stateClass = 'active';
            else if (isVisited) stateClass = 'visited';

            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                <motion.circle
                  r={8}
                  className={`graph-node ${stateClass}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
                <text className="graph-node-label" dy=".3em" textAnchor="middle">
                  {node.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
