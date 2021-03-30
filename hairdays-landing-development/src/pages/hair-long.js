import React, { useCallback, useState } from 'react';
import { navigate } from 'gatsby';
import useQuizPagesData from '../hooks/useQuizPagesData';
import Checkbox from '../components/Checkbox';
import Layout from '../components/Layout';
import ContentContainer from '../components/ContentContainer';
import Stepper from '../components/Stepper';
import NavigateBackButton from '../components/NavigateBackButton';
import hairLongStyles from '../styles/pages/hairLong.module.scss';
import useValue from '../hooks/useValue';
import get from 'lodash.get';
import NavigateNextButton from '../components/NavigateNextButton';
import { getPageNumber } from '../hooks/useStep';
import haircareGoalsStyles from '../styles/pages/haircareGoals.module.scss';
import Tooltip from '../components/Tooltip';

const pageUrl = 'hair-long';
const number = getPageNumber(pageUrl);

export default function HairColors() {
  const [image, changeNumberOfImage] = useState('default');

  const {
    quizPagesJson: {
      startQuizPage: { defaultImage, infoIcon },
      hair_long: hairLong,
    },
  } = useQuizPagesData();

  const { values, disabledNextBtn, changeValue } = useValue({
    type: 'radio',
    url: pageUrl,
  });

  const renderHairLong = () => {
    return hairLong.map((item, idx) => {
      const { text } = item;
      const checked = get(values, `${pageUrl}`) === text;

      return (
        <div key={text} className={hairLongStyles[`checkbox${idx}`]}>
          <Checkbox
            onClick={() => changeImage(idx)}
            variant="round"
            checkboxName={text}
            inputType="radio"
            value={text}
            handleChange={changeValue}
            checked={checked}
            className={hairLongStyles.checkbox}
          >
            {text}
          </Checkbox>
        </div>
      );
    });
  };

  const renderImage = () => {
    return (
      <img
        className={hairLongStyles.hairsLongImage}
        src={image === 'default' ? defaultImage : hairLong[image].url}
        alt=""
      />
    );
  };

  const changeImage = useCallback((idx) => {
    changeNumberOfImage(idx);
  }, []);

  const navigateToNextPage = useCallback(function() {
    navigate('/washing-frequency');
  }, []);

  return (
    <Layout page="hair-long">
      <ContentContainer>
        <section className={hairLongStyles.headerContainer}>
          <Stepper />

          <h1 className={hairLongStyles.contentHeader}>
            {number}. How long is your hair?
            <span className={hairLongStyles.orangeText}> * </span>
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

          <p className={hairLongStyles.contentText}>Please select all that apply.</p>
        </section>

        <section className={hairLongStyles.contentSection}>
          <div className={hairLongStyles.wrapper}>
            <div className={hairLongStyles.hairsLongImageContainer}>{renderImage(image)}</div>

            <ul className={hairLongStyles.list}>{renderHairLong()}</ul>
          </div>

          <div className={hairLongStyles.buttonsContainer}>
            <NavigateBackButton />
            <NavigateNextButton disabled={disabledNextBtn} />
          </div>
        </section>
      </ContentContainer>
    </Layout>
  );
}
