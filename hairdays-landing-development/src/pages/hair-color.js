import React, { useCallback } from 'react';
import get from 'lodash.get';
import Layout from '../components/Layout';
import ContentContainer from '../components/ContentContainer';
import Checkbox from '../components/Checkbox';
import Stepper from '../components/Stepper';
import NavigateBackButton from '../components/NavigateBackButton';
import NavigateNextButton from '../components/NavigateNextButton';
import useQuizPagesData from '../hooks/useQuizPagesData';
import { getPageNumber } from '../hooks/useStep';
import useValue from '../hooks/useValue';
import Tooltip from '../components/Tooltip';
import haircareGoalsStyles from '../styles/pages/haircareGoals.module.scss';

const pageUrl = 'hair-color';
const number = getPageNumber(pageUrl);

export default function HairColor() {
  const {
    quizPagesJson: {
      hair_color: hairColor,
      startQuizPage: { infoIcon },
    },
  } = useQuizPagesData();

  const { values, disabledNextBtn, changeValue } = useValue({
    type: 'radio',
    url: pageUrl,
  });

  const renderAnswers = useCallback(
    () =>
      hairColor.map(({ text, url }) => {
        const checked = get(values, `${pageUrl}`) === text;
        return (
          <li className={haircareGoalsStyles.hairGoalsListItem} key={text}>
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
    [hairColor, changeValue, values],
  );

  return (
    <Layout page={pageUrl}>
      <ContentContainer>
        <section>
          <Stepper />

          <h1 className={haircareGoalsStyles.contentHeader}>
            {number}. What is your hair color in your uploaded photo?
            <span className={haircareGoalsStyles.orangeText}> * </span>
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

          <p className={haircareGoalsStyles.contentText}>
            Please select the color that best matches your hair color hue.
          </p>
        </section>

        <section className={haircareGoalsStyles.contentSection}>
          <ul className={haircareGoalsStyles.hairGoalsList}>{renderAnswers()}</ul>

          <div className={haircareGoalsStyles.buttonsContainer}>
            <NavigateBackButton />
            <NavigateNextButton disabled={disabledNextBtn} />
          </div>
        </section>
      </ContentContainer>
    </Layout>
  );
}
