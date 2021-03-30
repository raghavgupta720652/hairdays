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
import dominantHairTypesStyles from '../styles/pages/dominantHairTypes.module.scss';
import haircareGoalsStyles from '../styles/pages/haircareGoals.module.scss';
import Tooltip from '../components/Tooltip';

const pageUrl = 'dominant-hair-types';
const number = getPageNumber(pageUrl);

export default function DominantHairTypes() {
  const {
    quizPagesJson: {
      dominant_hair_types: dominantHairTypes,
      startQuizPage: { infoIcon, tooltipIcon },
    },
  } = useQuizPagesData();

  const { values, disabledNextBtn, changeValue } = useValue({
    type: 'radio',
    url: pageUrl,
  });

  const renderAnswers = useCallback(
    () =>
      dominantHairTypes.map(({ text, url, tooltip }) => {
        const checked = get(values, `${pageUrl}`) === text;
        return (
          <li className={dominantHairTypesStyles.dominantHairListItem} key={text}>
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
            {tooltip && (
              <span className={dominantHairTypesStyles.tooltip}>
                <img
                  data-tip
                  data-for="toolbox"
                  className={haircareGoalsStyles.infoIcon}
                  src={tooltipIcon}
                  alt={text}
                />
                <Tooltip id="toolbox" place="right" borderColor="#34ccbf">
                  <span>
                    Layla detected your hair type as this. But you can also select a different hair
                    type on your own.
                  </span>
                </Tooltip>
              </span>
            )}
          </li>
        );
      }),
    [dominantHairTypes, changeValue, values, tooltipIcon],
  );

  return (
    <Layout page={pageUrl}>
      <ContentContainer>
        <section>
          <Stepper />

          <h1 className={dominantHairTypesStyles.contentHeader}>
            <span>
              {number}. Pick the hair texture that
              <br /> best matches your dominant hair type.
            </span>
            <span className={dominantHairTypesStyles.orangeText}> * </span>
            <span className={haircareGoalsStyles.tooltip}>
              <img
                data-tip
                data-for="toolbox-head"
                className={haircareGoalsStyles.infoIcon}
                src={infoIcon}
                alt=""
              />
              <Tooltip id="toolbox-head" place="right" borderColor="#34ccbf">
                <span>
                  Tooltip with explanation how to define hair type. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </span>
              </Tooltip>
            </span>
          </h1>
        </section>

        <ul className={dominantHairTypesStyles.dominantHairTypesList}>{renderAnswers()}</ul>

        <div className={dominantHairTypesStyles.buttonsContainer}>
          <NavigateBackButton />
          <NavigateNextButton disabled={disabledNextBtn} />
        </div>
      </ContentContainer>
    </Layout>
  );
}
