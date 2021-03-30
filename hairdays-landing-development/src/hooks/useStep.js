import { globalHistory as history } from '@reach/router';
import { quizPages } from '../configs/quiz-pages';

export default function useStep() {
  const {
    location: { pathname },
  } = history;

  const currentUrl = pathname.replace(/\/+$/, '');
  const totalSteps = quizPages.length;
  const currentStep = quizPages.findIndex(({ url }) => url === currentUrl) + 1;

  return { totalSteps, currentUrl, currentStep };
}

export const getPageNumber = (pageUrl) =>
  quizPages.findIndex(({ url }) => url === `/${pageUrl}`) + 1;
