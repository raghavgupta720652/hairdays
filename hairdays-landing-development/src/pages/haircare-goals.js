import React, { useCallback } from 'react';
import get from 'lodash.get';
import Layout from '../components/Layout';
import ContentContainer from '../components/ContentContainer';
import Stepper from '../components/Stepper';
import useQuizPagesData from '../hooks/useQuizPagesData';
import Checkbox from '../components/Checkbox';
import NavigateBackButton from '../components/NavigateBackButton';
import NavigateNextButton from '../components/NavigateNextButton';
import useValue from '../hooks/useValue';
import { getPageNumber } from '../hooks/useStep';
import haircareGoalsStyles from '../styles/pages/haircareGoals.module.scss';
import Tooltip from '../components/Tooltip';

const pageUrl = 'haircare-goals';
const number = getPageNumber(pageUrl);

export default function HaircareGoals() {
  const {
    quizPagesJson: {
      haircare_goals: haircareGoals,
      startQuizPage: { infoIcon },
    },
  } = useQuizPagesData();

  const { values, disabledNextBtn, changeValue } = useValue({
    type: 'checkbox',
    url: pageUrl,
  });

  const renderAnswers = useCallback(
    () =>
      haircareGoals.map(({ text, url }) => {
        const checked = get(values, `${pageUrl}.${text}`, false);
        return (
          <li className={haircareGoalsStyles.hairGoalsListItem} key={text}>
            <Checkbox
              imageUrl={url}
              imageClass={haircareGoalsStyles.image}
              variant="square"
              checkboxName={text}
              value={text}
              handleChange={changeValue}
              checked={checked}
            >
              {text}
            </Checkbox>
          </li>
        );
      }),
    [haircareGoals, changeValue, values],
  );

  return (
    <Layout page="haircare-goals">
      <ContentContainer>
        <section>
          <Stepper />

          <h1 className={haircareGoalsStyles.contentHeader}>
            {number}. What are your haircare goals?
            <span className={haircareGoalsStyles.orangeText}> *</span>
            <span className={haircareGoalsStyles.tooltip}>
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

          <p className={haircareGoalsStyles.contentText}>Please select all that apply.</p>
        </section>

        <section className={haircareGoalsStyles.contentSection}>
          <ul className={haircareGoalsStyles.hairGoalsList}>{renderAnswers()}</ul>
          <div className={haircareGoalsStyles.otherOptionContainer}>
            <p className={haircareGoalsStyles.otherOptionText}>Other option</p>

            <input type="text" placeholder="Enter your option" />
          </div>
          <div className={haircareGoalsStyles.buttonsContainer}>
            <NavigateBackButton />
            <NavigateNextButton disabled={disabledNextBtn} />
          </div>
        </section>
      </ContentContainer>
    </Layout>
  );
}
