import { motion } from 'framer-motion';
import { useSimulatorStore } from '../../store/useSimulatorStore';
import type { ArrayTraceStep } from '../../core/types';

export const ArrayVisualizer = () => {
  const { trace, currentStepIndex } = useSimulatorStore();
  const currentStep = trace[currentStepIndex];

  if (!currentStep || currentStep.type !== 'array') return null;

  const { array, comparing, swapping, sorted } = currentStep as ArrayTraceStep;

  const maxVal = Math.max(...array.map((item: any) => item.value), 1);

  return (
    <div className="array-visualizer">
      <div className="bars-container">
        {array.map((item: any, index: number) => {
          let stateClass = 'default';
          if (sorted.includes(index)) stateClass = 'sorted';
          else if (swapping.includes(index)) stateClass = 'swapping';
          else if (comparing.includes(index)) stateClass = 'comparing';

          return (
            <motion.div
              layout
              key={item.id}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`bar ${stateClass}`}
              style={{
                height: `${(item.value / maxVal) * 100}%`,
              }}
            >
              <span className="bar-label">{item.value}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
