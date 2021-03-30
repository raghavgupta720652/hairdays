import React, { useCallback } from 'react';
import get from 'lodash.get';
import Layout from '../components/Layout';
import ContentContainer from '../components/ContentContainer';
import Stepper from '../components/Stepper';
import RangeInput from '../components/RangeInput';
import Checkbox from '../components/Checkbox';
import NavigateBackButton from '../components/NavigateBackButton';
import NavigateNextButton from '../components/NavigateNextButton';
import { getPageNumber } from '../hooks/useStep';
import useQuizPagesData from '../hooks/useQuizPagesData';
import useResize from '../hooks/useResize';
import useValue from '../hooks/useValue';
import hairDensityStyles from '../styles/pages/hairDensity.module.scss';
import haircareGoalsStyles from '../styles/pages/haircareGoals.module.scss';
import Tooltip from '../components/Tooltip';
import hairLongStyles from '../styles/pages/hairLong.module.scss';

const pageUrl = 'hair-density';
const number = getPageNumber(pageUrl);

export default function HairDensity() {
  const width = useResize();

  const {
    quizPagesJson: {
      hair_density: hairDensity,
      startQuizPage: { infoIcon },
    },
  } = useQuizPagesData();

  const { values, disabledNextBtn, changeValue } = useValue({
    type: width < 768 ? 'radio' : 'range',
    url: pageUrl,
  });

  const value = hairDensity.findIndex(({ text }) => text === values[pageUrl]);

  const renderCheckboxes = useCallback(
    () =>
      Object.values(hairDensity)
        .filter((item) => item.url !== '')
        .map(({ text, urlMobile }) => {
          const checked = get(values, `${pageUrl}`) === text;
          return (
            <div className={hairDensityStyles.brandsBlock} key={text}>
              <Checkbox
                imageUrl={urlMobile}
                variant="round"
                checkboxName={text}
                inputType="radio"
                value={text}
                handleChange={changeValue}
                checked={checked}
              >
                {text}
              </Checkbox>
            </div>
          );
        }),
    [hairDensity, changeValue, values],
  );

  return (
    <Layout page={pageUrl}>
      <ContentContainer>
        <section>
          <Stepper />

          <h1 className={hairDensityStyles.contentHeader}>
            {number}. What best describes your hair density?
            <span className={hairDensityStyles.orangeText}> * </span>
            <span className={hairLongStyles.tooltip}>
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

        <section className={hairDensityStyles.contentSection}>
          <div className={hairDensityStyles.range}>
            <RangeInput
              data={hairDensity}
              pageUrl={pageUrl}
              changeValue={changeValue}
              value={value}
            />
          </div>

          <div className={hairDensityStyles.checkboxes}>{renderCheckboxes()}</div>

          <div className={hairDensityStyles.buttonsContainer}>
            <NavigateBackButton />
            <NavigateNextButton disabled={disabledNextBtn} />
          </div>
        </section>
      </ContentContainer>
    </Layout>
  );
}
