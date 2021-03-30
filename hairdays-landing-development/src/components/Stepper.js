import React, { useCallback } from 'react';
import useStep from '../hooks/useStep';
import steppersStyles from '../styles/components/stepper.module.scss';

export default function Stepper({ pageUrl }) {
  const { totalSteps, currentStep } = useStep(pageUrl);

  const renderSteps = useCallback(() => {
    const steps = [];

    for (let i = 1; i <= totalSteps; i++) {
      if (i <= currentStep) {
        steps.push(
          <li
            key={i}
            className={
              i === currentStep
                ? `${steppersStyles.step} ${steppersStyles.active}`
                : `${steppersStyles.step} ${steppersStyles.passed}`
            }
          />,
        );
      } else {
        steps.push(<li key={i} className={steppersStyles.step} />);
      }
    }

    return steps;
  }, [currentStep, totalSteps]);

  return <ul className={steppersStyles.stepperContainer}>{renderSteps()} </ul>;
}
