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
import hairConditionStyles from '../styles/pages/hairCondition.module.scss';
import haircareGoalsStyles from '../styles/pages/haircareGoals.module.scss';
import Tooltip from '../components/Tooltip';

const pageUrl = 'hair-condition';
const number = getPageNumber(pageUrl);

export default function HairColors() {
  const {
    quizPagesJson: {
      hair_condition: hairCondition,
      startQuizPage: { infoIcon },
    },
  } = useQuizPagesData();

  const { values, disabledNextBtn, changeValue } = useValue({
    type: 'checkbox',
    url: pageUrl,
  });

  const renderAnswers = useCallback(
    () =>
      hairCondition.map(({ text, url }) => {
        const checked = get(values, `${pageUrl}.${text}`, false);
        return (
          <li className={hairConditionStyles.listItem} key={text}>
            <Checkbox
              imageUrl={url}
              imageClass={hairConditionStyles.checkboxText}
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
    [hairCondition, changeValue, values],
  );

  return (
    <Layout page={pageUrl}>
      <ContentContainer>
        <section>
          <Stepper />

          <h1 className={hairConditionStyles.contentHeader}>
            {number}. What best describes your hair condition?
            <span className={hairConditionStyles.orangeText}> * </span>
            <span className={hairConditionStyles.tooltip}>
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

          <p className={hairConditionStyles.contentText}>Please select all that apply.</p>
        </section>

        <section className={hairConditionStyles.contentSection}>
          <ul className={hairConditionStyles.list}>
            {renderAnswers()}

            <li className={hairConditionStyles.otherOptionContainer}>
              <p className={hairConditionStyles.otherOptionText}>Other option</p>

              <input type="text" placeholder="Enter your option" />
            </li>
          </ul>

          <div className={hairConditionStyles.buttonsContainer}>
            <NavigateBackButton />
            <NavigateNextButton disabled={disabledNextBtn} />
          </div>
        </section>
      </ContentContainer>
    </Layout>
  );
}
