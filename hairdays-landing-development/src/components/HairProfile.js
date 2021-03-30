import React, { useCallback, useMemo } from 'react';
import Result from './Result';
import useQuizPagesData from '../hooks/useQuizPagesData';
import { quizPages as quizPagesConfig } from '../configs/quiz-pages';
import hairProfileStyles from '../styles/components/hairProfile.module.scss';

export default function HairProfile(props) {
  const { quizPagesJson } = useQuizPagesData();
  const windowGlobal = typeof window !== 'undefined' && window;

  const quizAnswers = useMemo(
    () => (windowGlobal ? JSON.parse(localStorage.getItem('quiz')) : {}),
    [],
  );

  const renderComponent = useCallback(function() {
    return Object.entries(quizAnswers).map((el, idx) => {
      const [url, answers] = el;
      const urlWithUnderscores = url.replaceAll('-', '_');
      const quizData = quizPagesJson[urlWithUnderscores];

      return (
        <div className={hairProfileStyles.results}>
          <div className={hairProfileStyles.headerContainer}>
            <span className={hairProfileStyles.header}>
              {idx + 1}. {quizPagesConfig[idx + 1].pageName}
            </span>
          </div>

          <div className={hairProfileStyles.answers}>{renderAnswers(answers, quizData, url)}</div>
        </div>
      );
    });
  }, []);

  const renderAnswers = useCallback(function(answers, quizData, url) {
    if (typeof answers === 'string') {
      const answerData = quizData.find((key) => {
        return key['text'] === answers;
      });

      return <Result data={answerData} pageUrl={url} />;
    } else {
      return Object.entries(answers)
        .filter(([key, value]) => value)
        .map((el, idx) => {
          const answerData = quizData.find((key) => {
            const [text] = el;

            return key['text'] === text;
          });

          return <Result data={answerData} pageUrl={url} />;
        });
    }
  }, []);

  return <div className={hairProfileStyles.page}>{renderComponent()}</div>;
}
