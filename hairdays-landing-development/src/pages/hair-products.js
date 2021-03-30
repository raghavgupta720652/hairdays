import React, { useCallback } from 'react';
import get from 'lodash.get';
import Layout from '../components/Layout';
import ContentContainer from '../components/ContentContainer';
import Stepper from '../components/Stepper';
import Checkbox from '../components/Checkbox';
import NavigateBackButton from '../components/NavigateBackButton';
import NavigateNextButton from '../components/NavigateNextButton';
import useQuizPagesData from '../hooks/useQuizPagesData';
import useValue from '../hooks/useValue';
import { getPageNumber } from '../hooks/useStep';
import hairProductsStyles from '../styles/pages/hairProducts.module.scss';
import haircareGoalsStyles from '../styles/pages/haircareGoals.module.scss';
import Tooltip from '../components/Tooltip';

const pageUrl = 'hair-products';
const number = getPageNumber(pageUrl);

export default function HairProducts() {
  const {
    quizPagesJson: {
      hair_products: hairProducts,
      startQuizPage: { infoIcon },
    },
  } = useQuizPagesData();

  const { values, disabledNextBtn, changeValue } = useValue({
    type: 'checkbox',
    url: pageUrl,
  });

  const renderAnswers = useCallback(
    () =>
      hairProducts.map(({ text, url }) => {
        const checked = get(values, `${pageUrl}.${text}`, false);

        return (
          <li className={hairProductsStyles.productsItem} key={text}>
            <Checkbox
              imageUrl={url}
              imageClass={hairProductsStyles.checkboxText}
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
    [hairProducts, changeValue, values],
  );

  return (
    <Layout page={pageUrl}>
      <ContentContainer>
        <section>
          <Stepper />

          <h1 className={hairProductsStyles.contentHeader}>
            <span>{number}. Where do you typically shop for haircare products?</span>
            <span className={hairProductsStyles.orangeText}> * </span>
            <span className={hairProductsStyles.tooltip}>
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
          <span className={hairProductsStyles.mobileDescription}>
            Please select all that apply.
          </span>
        </section>

        <section className={hairProductsStyles.contentSection}>
          <div className={hairProductsStyles.productsWrap}>
            <ul className={hairProductsStyles.productsList}>{renderAnswers()}</ul>

            <div className={hairProductsStyles.otherOptionContainer}>
              <p className={hairProductsStyles.otherOptionText}>Other option</p>
              <input type="text" placeholder="Enter other brand(s) here" />
            </div>
          </div>
          <div className={hairProductsStyles.buttonsContainer}>
            <NavigateBackButton />
            <NavigateNextButton disabled={disabledNextBtn} />
          </div>
        </section>
      </ContentContainer>
    </Layout>
  );
}
