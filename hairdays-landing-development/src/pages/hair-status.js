import React, { useCallback } from 'react';
import get from 'lodash.get';
import Layout from '../components/Layout';
import ContentContainer from '../components/ContentContainer';
import Stepper from '../components/Stepper';
import Checkbox from '../components/Checkbox';
import NavigateBackButton from '../components/NavigateBackButton';
import NavigateNextButton from '../components/NavigateNextButton';
import useQuizPagesData from '../hooks/useQuizPagesData';
import { getPageNumber } from '../hooks/useStep';
import hairStatusStyles from '../styles/pages/hairStatus.module.scss';
import useValue from '../hooks/useValue';
import haircareGoalsStyles from '../styles/pages/haircareGoals.module.scss';
import Tooltip from '../components/Tooltip';

const pageUrl = 'hair-status';
const number = getPageNumber(pageUrl);

export default function HairStatus() {
  const {
    quizPagesJson: {
      hair_status: hairStatus,
      startQuizPage: { infoIcon },
    },
  } = useQuizPagesData();

  const { values, disabledNextBtn, changeValue } = useValue({
    type: 'checkbox',
    url: pageUrl,
  });

  const renderAnswers = useCallback(
    () =>
      hairStatus.map(({ text, url }) => {
        const checked = get(values, `${pageUrl}.${text}`, false);
        return (
          <li className={hairStatusStyles.listItem} key={text}>
            <Checkbox
              imageUrl={url}
              imageClass={hairStatusStyles.image}
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
    [hairStatus, changeValue, values],
  );

  return (
    <Layout page={pageUrl}>
      <ContentContainer>
        <section>
          <Stepper />

          <h1 className={hairStatusStyles.contentHeader}>
            {number}. What is your hair status in your uploaded photo?
            <span className={hairStatusStyles.orangeText}> * </span>
            <span className={hairStatusStyles.tooltip}>
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

          <p className={hairStatusStyles.contentText}>
            How would you describe your hair? Please select all that apply.
          </p>
        </section>

        <section className={hairStatusStyles.contentSection}>
          <ul className={hairStatusStyles.list}>{renderAnswers()}</ul>

          <div className={hairStatusStyles.buttonsContainer}>
            <NavigateBackButton />
            <NavigateNextButton disabled={disabledNextBtn} />
          </div>
        </section>
      </ContentContainer>
    </Layout>
  );
}
