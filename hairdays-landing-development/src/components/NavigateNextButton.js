import React, { useCallback } from 'react';
import { navigate } from '@reach/router';
import Button from './Button';
import { quizPages } from '../configs/quiz-pages';
import useStep from '../hooks/useStep';

export default function NavigateNextButton({ disabled = false, pageUrl, text = 'Next' }) {
  const { currentStep } = useStep(pageUrl);
  const nextUrl = quizPages[currentStep].url;

  const navigateToNextPage = useCallback(() => {
    navigate(nextUrl);
  }, [nextUrl]);

  return (
    <Button variant="primary" type="button" onClick={navigateToNextPage} disabled={disabled}>
      {text}
    </Button>
  );
}
