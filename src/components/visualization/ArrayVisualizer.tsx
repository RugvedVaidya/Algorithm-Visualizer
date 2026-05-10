import { motion } from 'framer-motion';
import { useSimulatorStore } from '../../store/useSimulatorStore';

export const ArrayVisualizer = () => {
  const { trace, currentStepIndex } = useSimulatorStore();
  const currentStep = trace[currentStepIndex];

  if (!currentStep) return null;

  const { array, comparing, swapping, sorted } = currentStep;

  const maxVal = Math.max(...array.map(item => item.value), 1);

  return (
    <div className="array-visualizer">
      <div className="bars-container">
        {array.map((item, index) => {
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
