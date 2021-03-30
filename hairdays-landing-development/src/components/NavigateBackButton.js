import React, { useCallback } from 'react';
import { navigate } from '@reach/router';
import Button from './Button';
import useStep from '../hooks/useStep';
import { quizPages } from '../configs/quiz-pages';

export default function NavigateBackButton() {
  const { currentStep } = useStep();

  const prevStep = currentStep < 1 ? 0 : currentStep - 2;
  const prevUrl = quizPages[prevStep].url;
  const navigateToPrevPage = useCallback(() => navigate(prevUrl), [prevUrl]);

  return (
    <Button variant="secondary" type="button" onClick={navigateToPrevPage}>
      Back
    </Button>
  );
}
