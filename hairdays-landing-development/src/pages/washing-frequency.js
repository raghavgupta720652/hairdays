import React, { useCallback } from 'react';
import get from 'lodash.get';
import Layout from '../components/Layout';
import ContentContainer from '../components/ContentContainer';
import Checkbox from '../components/Checkbox';
import Stepper from '../components/Stepper';
import NavigateBackButton from '../components/NavigateBackButton';
import NavigateNextButton from '../components/NavigateNextButton';
import useQuizPagesData from '../hooks/useQuizPagesData';
import useValue from '../hooks/useValue';
import { getPageNumber } from '../hooks/useStep';
import washingFrequencyStyles from '../styles/pages/washingFrequency.module.scss';
import haircareGoalsStyles from '../styles/pages/haircareGoals.module.scss';
import Tooltip from '../components/Tooltip';

const pageUrl = 'washing-frequency';
const number = getPageNumber(pageUrl);

export default function WashingFrequency() {
  const {
    quizPagesJson: {
      washing_frequency: washingFrequency,
      startQuizPage: { infoIcon },
    },
  } = useQuizPagesData();

  const { values, disabledNextBtn, changeValue } = useValue({
    type: 'radio',
    url: pageUrl,
  });

  const renderAnswers = useCallback(
    () =>
      washingFrequency.map(({ text, url }) => {
        const checked = get(values, `${pageUrl}`) === text;
        return (
          <li className={washingFrequencyStyles.listItem} key={text}>
            <Checkbox
              imageUrl={url}
              variant="round"
              checkboxName={text}
              inputType="radio"
              value={text}
              handleChange={changeValue}
              checked={checked}
            >
              {text}
            </Checkbox>
          </li>
        );
      }),
    [washingFrequency, changeValue, values],
  );

  return (
    <Layout page={pageUrl}>
      <ContentContainer>
        <section>
          <Stepper />

          <h1 className={washingFrequencyStyles.contentHeader}>
            {number}. How often do you wash your hair?
            <span className={washingFrequencyStyles.tooltip}>
              <img
                data-tip
                data-for="toolbox"
                className={haircareGoalsStyles.infoIcon}
                src={infoIcon}
                alt=""
              />
              <Tooltip id="toolbox" place="right" borderColor="#34ccbf">
                <span>
                  Tooltip with explanation how to define hair type. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </span>
              </Tooltip>
            </span>
          </h1>
        </section>

        <section className={washingFrequencyStyles.contentSection}>
          <ul className={washingFrequencyStyles.list}>{renderAnswers()}</ul>

          <div className={washingFrequencyStyles.buttonsContainer}>
            <NavigateBackButton />
            <NavigateNextButton disabled={disabledNextBtn} />
          </div>
        </section>
      </ContentContainer>
    </Layout>
  );
}
