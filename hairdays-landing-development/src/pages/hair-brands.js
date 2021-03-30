import React from 'react';
import get from 'lodash.get';
import Layout from '../components/Layout';
import Stepper from '../components/Stepper';
import ContentContainer from '../components/ContentContainer';
import Checkbox from '../components/Checkbox';
import NavigateBackButton from '../components/NavigateBackButton';
import NavigateNextButton from '../components/NavigateNextButton';
import useQuizPagesData from '../hooks/useQuizPagesData';
import { getPageNumber } from '../hooks/useStep';
import hairBrandsStyles from '../styles/pages/hairBrands.module.scss';
import useValue from '../hooks/useValue';
import haircareGoalsStyles from '../styles/pages/haircareGoals.module.scss';
import Tooltip from '../components/Tooltip';

const pageUrl = 'hair-brands';
const number = getPageNumber(pageUrl);

export default function HairBrands() {
  const {
    quizPagesJson: {
      hair_brands: hairBrands,
      startQuizPage: { infoIcon },
    },
  } = useQuizPagesData();

  const { values, disabledNextBtn, changeValue } = useValue({
    type: 'checkbox',
    url: pageUrl,
  });

  const renderAnswers = () => {
    let letter;
    return hairBrands.map((item) => {
      const { url, text } = item;
      const checked = get(values, `${pageUrl}.${text}`, false);

      const firstLetter = text.toLowerCase()[0];

      if (letter !== firstLetter) {
        letter = firstLetter;

        return (
          <React.Fragment key={text}>
            <span className={hairBrandsStyles.brandsTitle}>{letter}</span>

            <div className={hairBrandsStyles.brandsBlock}>
              <Checkbox
                imageUrl={url}
                imageClass={hairBrandsStyles.checkboxText}
                variant="square"
                checkboxName={text}
                value={text}
                handleChange={changeValue}
                checked={checked}
              >
                {text}
              </Checkbox>
            </div>
          </React.Fragment>
        );
      }

      return (
        <div className={hairBrandsStyles.brandsBlock} key={text}>
          <Checkbox
            imageUrl={url}
            imageClass={hairBrandsStyles.checkboxText}
            variant="square"
            checkboxName={text}
            value={text}
            handleChange={changeValue}
            checked={checked}
          >
            {text}
          </Checkbox>
        </div>
      );
    });
  };

  return (
    <Layout page={pageUrl}>
      <ContentContainer>
        <section>
          <Stepper />

          <h1 className={hairBrandsStyles.contentHeader}>
            <span>{number}. What haircare brand do you use?</span>
            <span className={hairBrandsStyles.orangeText}> * </span>
            <span className={hairBrandsStyles.tooltip}>
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
          <span className={hairBrandsStyles.mobileDescription}>Please select all that apply.</span>
        </section>
        <section className={hairBrandsStyles.contentSection}>
          <div className={hairBrandsStyles.productsWrap}>
            <div className={hairBrandsStyles.brandsList}>{renderAnswers()}</div>

            <div className={hairBrandsStyles.otherOptionContainer}>
              <p className={hairBrandsStyles.otherOptionText}>Other option</p>
              <input type="text" placeholder="Enter other brand(s) here" />
            </div>
          </div>

          <div className={hairBrandsStyles.buttonsContainer}>
            <NavigateBackButton />
            <NavigateNextButton disabled={disabledNextBtn} />
          </div>
        </section>
      </ContentContainer>
    </Layout>
  );
}
