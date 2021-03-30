import React, { useCallback } from 'react';
import get from 'lodash.get';
import Layout from '../components/Layout';
import ContentContainer from '../components/ContentContainer';
import Stepper from '../components/Stepper';
import NavigateBackButton from '../components/NavigateBackButton';
import NavigateNextButton from '../components/NavigateNextButton';
import RangeInput from '../components/RangeInput';
import Checkbox from '../components/Checkbox';
import useQuizPagesData from '../hooks/useQuizPagesData';
import { getPageNumber } from '../hooks/useStep';
import useValue from '../hooks/useValue';
import useResize from '../hooks/useResize';
import hairTextureStyles from '../styles/pages/hairTexture.module.scss';
import haircareGoalsStyles from '../styles/pages/haircareGoals.module.scss';
import Tooltip from '../components/Tooltip';
import hairLongStyles from '../styles/pages/hairLong.module.scss';

const pageUrl = 'hair-texture';
const number = getPageNumber(pageUrl);

export default function HairTexture() {
  const width = useResize();

  const {
    quizPagesJson: {
      hair_texture: hairTexture,
      startQuizPage: { infoIcon },
    },
  } = useQuizPagesData();

  const { values, disabledNextBtn, changeValue } = useValue({
    type: width < 768 ? 'radio' : 'range',
    url: pageUrl,
  });

  const value = hairTexture.findIndex(({ text }) => text === values[pageUrl]);

  const renderCheckboxes = useCallback(
    () =>
      Object.values(hairTexture)
        .filter((item) => item.url !== '')
        .map(({ text, urlMobile }) => {
          const checked = get(values, `${pageUrl}`) === text;
          return (
            <div className={hairTextureStyles.brandsBlock} key={text}>
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
    [hairTexture, changeValue, values],
  );

  return (
    <Layout page="hair-texture">
      <ContentContainer>
        <section>
          <Stepper />

          <h1 className={hairTextureStyles.contentHeader}>
            {number}. What best describes your hair texture?
            <span className={hairTextureStyles.orangeText}> * </span>
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

        <section className={hairTextureStyles.contentSection}>
          <div className={hairTextureStyles.rangeContainer}>
            <RangeInput
              data={hairTexture}
              rangeName="hairTexture"
              pageUrl={pageUrl}
              changeValue={changeValue}
              value={value}
            />
          </div>

          <div className={hairTextureStyles.checkboxes}>{renderCheckboxes()}</div>

          <div className={hairTextureStyles.buttonsContainer}>
            <NavigateBackButton />
            <NavigateNextButton disabled={disabledNextBtn} />
          </div>
        </section>
      </ContentContainer>
    </Layout>
  );
}
