import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import Layout from '../components/Layout';
import Stepper from '../components/Stepper';
import HeadInfo from '../components/HeadInfo';
import ContentContainer from '../components/ContentContainer';
import NavigateNextButton from '../components/NavigateNextButton';
import useQuizPagesData from '../hooks/useQuizPagesData';
import { getPageNumber } from '../hooks/useStep';
import startQuizPageStyles from '../styles/pages/startQuiz.module.scss';
import 'react-dropzone-uploader/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import haircareGoalsStyles from '../styles/pages/haircareGoals.module.scss';
import Tooltip from '../components/Tooltip';

const pageUrl = 'start-quiz';
const number = getPageNumber(pageUrl);

export default function StartQuizPage() {
  const {
    quizPagesJson: {
      startQuizPage: {
        bannerIcons,
        bannerImage,
        bannerImageMobile,
        bannerHeaderText,
        bannerText,
        infoIcon,
        uploadImageIcon,
      },
    },
  } = useQuizPagesData();

  const uploadImageUrl = { backgroundImage: `url(${uploadImageIcon})` };

  return (
    <Layout page={pageUrl} data-tip="photoToolbox">
      <HeadInfo
        backgroundUrl={bannerIcons}
        title={bannerHeaderText}
        description={bannerText}
        imageUrl={bannerImage}
        imageMobileUrl={bannerImageMobile}
      />

      <ContentContainer>
        <section className={startQuizPageStyles.quizPageContent}>
          <Stepper />

          <h1 className={startQuizPageStyles.contentHeader}>
            {number}. Please upload or take a picture that shows your hair type.
            <span className={startQuizPageStyles.orangeText}> * </span>
            <span className={startQuizPageStyles.tooltip}>
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

          <p className={startQuizPageStyles.contentText}>
            Please take a picture of your hair down and in its natural state. The best style for
            hair analysis is in a wash and go.
          </p>

          <div>
            <Dropzone
              classNames={{ dropzone: startQuizPageStyles.dropzone }}
              accept="image/*"
              canRestart
              inputContent={
                <div className={startQuizPageStyles.dropzoneLabelContainer} data-tip data-for="box">
                  <Tooltip id="box" place="left" borderColor="#ff5256">
                    <span>
                      Sorry, Layla could not detect your hair type. Make sure that your hair texture
                      is clearly visible and that your photo resolution is at least 640 x 480.
                      Please try again.
                    </span>
                  </Tooltip>
                  <div className={startQuizPageStyles.dropzoneImage} style={uploadImageUrl} />

                  <p>Upload photo</p>
                </div>
              }
            />
          </div>
          <NavigateNextButton />
        </section>
      </ContentContainer>
    </Layout>
  );
}
