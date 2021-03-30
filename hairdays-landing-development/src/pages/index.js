import React from 'react';
import { navigate } from 'gatsby';
import Layout from '../components/Layout';
import ContentContainer from '../components/ContentContainer';
import Button from '../components/Button';
import getHomePageData from '../hooks/useHomePageData';
import homePageStyles from '../styles/pages/home.module.scss';
import 'normalize.css';

export default function IndexPage() {
  const {
    homePageJson: {
      bannerText,
      quizBanner,
      quizBannerImage,
      greenLogo,
      bannerHeaderText,
      mainContentLogo,
      mainContentHeader,
      downloadGooglePlay,
      downloadAppleStore,
      aboutUsImg,
      mobileQuizBanner,
    },
  } = getHomePageData();
  const bannerImageUrl = () => ({ backgroundImage: `url(${quizBanner})` });
  const bannerImageMobileUrl = () => ({ backgroundImage: `url(${mobileQuizBanner})` });

  function navigateToStartQuiz() {
    navigate(
      'https://docs.google.com/forms/d/e/1FAIpQLSf98LxDzi7i5GXTiMQY0E1x1T1XYRPHI50B2KRZhUjoIuuIHQ/viewform?embedded=true',
    );
  }

  return (
    <Layout page="home" bgColor="inherit">
      <ContentContainer>
        <div className={homePageStyles.bgWrapper} style={bannerImageUrl()}>
          <section className={homePageStyles.headerSection} style={bannerImageMobileUrl()}>
            <div className={homePageStyles.homePageQuizBanner}>
              <h1 className={homePageStyles.quizBannerHeader}>{bannerHeaderText}</h1>
              <p className={homePageStyles.quizBannerText}>{bannerText}</p>
              <img className={homePageStyles.quizBannerImageMobile} src={quizBannerImage} />
              <Button
                className={homePageStyles.quizButton}
                variant="secondary"
                onClick={navigateToStartQuiz}
              >
                Request to Join!
              </Button>
            </div>
          </section>
        </div>

        <section className={homePageStyles.homePageContent}>
          <div className={homePageStyles.whereToGetInfoContainer}>
            <img className={homePageStyles.mainPageContentLogo} src={greenLogo} alt="" />

            <h1 className={homePageStyles.mainContentHeader}>{mainContentHeader}</h1>

            <p className={homePageStyles.mainContentText}>
              We simplify your hair journey by allowing you to track everything about your hair.
            </p>

            <div className={homePageStyles.downloadButtonsContainer}>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf98LxDzi7i5GXTiMQY0E1x1T1XYRPHI50B2KRZhUjoIuuIHQ/viewform?embedded=true"
                className={homePageStyles.downloadButton}
              >
                <img src="/uploads/google-button.jpg" alt="" />
              </a>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf98LxDzi7i5GXTiMQY0E1x1T1XYRPHI50B2KRZhUjoIuuIHQ/viewform?embedded=true"
                className={homePageStyles.downloadButton}
              >
                <img src="/uploads/apple-button.jpg" alt="" />
              </a>
            </div>
          </div>

          <img className={homePageStyles.image} src={mainContentLogo} alt="" />
        </section>
      </ContentContainer>
    </Layout>
  );
}
