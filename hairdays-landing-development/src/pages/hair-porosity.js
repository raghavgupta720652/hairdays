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
import hairPorosityStyles from '../styles/pages/hairPorosity.module.scss';
import haircareGoalsStyles from '../styles/pages/haircareGoals.module.scss';
import Tooltip from '../components/Tooltip';

const pageUrl = 'hair-porosity';
const number = getPageNumber(pageUrl);

export default function HairPorosity() {
  const {
    quizPagesJson: {
      hair_porosity: hairPorosity,
      startQuizPage: { infoIcon },
    },
  } = useQuizPagesData();

  const { values, disabledNextBtn, changeValue } = useValue({
    type: 'radio',
    url: pageUrl,
  });

  const renderAnswers = useCallback(
    () =>
      hairPorosity.map(({ text, url }) => {
        const checked = get(values, `${pageUrl}`) === text;
        return (
          <li className={hairPorosityStyles.listItem} key={text}>
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
    [hairPorosity, changeValue, values],
  );

  return (
    <Layout page={pageUrl}>
      <ContentContainer>
        <section>
          <Stepper />

          <h1 className={hairPorosityStyles.contentHeader}>
            {number}. What is your hair porosity?
            <span className={hairPorosityStyles.orangeText}> * </span>
            <span className={hairPorosityStyles.tooltip}>
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

          <p className={hairPorosityStyles.contentText}>Please select all that apply.</p>
        </section>

        <section className={hairPorosityStyles.contentSection}>
          <ul className={hairPorosityStyles.list}>{renderAnswers()}</ul>

          <div className={hairPorosityStyles.buttonsContainer}>
            <NavigateBackButton />
            <NavigateNextButton disabled={disabledNextBtn} />
          </div>
        </section>
      </ContentContainer>
    </Layout>
  );
}
