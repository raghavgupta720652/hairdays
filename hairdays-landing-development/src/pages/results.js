import React, { useCallback } from 'react';
import Layout from '../components/Layout';
import ContentContainer from '../components/ContentContainer';
import DownloadApp from '../components/DownloadApp';
import HairProfile from '../components/HairProfile';
import Recommendations from '../components/Recommendations';
import InfoBlock from '../components/InfoBlock';
import { getPageNumber } from '../hooks/useStep';
import resultsStyles from '../styles/pages/results.module.scss';
import getHomePageData from '../hooks/useHomePageData';
import HeadInfo from '../components/HeadInfo';
import useQuizPagesData from '../hooks/useQuizPagesData';
import useLayoutData from '../hooks/useLayoutData';

const pageUrl = 'results';
const number = getPageNumber(pageUrl);

export default function HaircareGoals() {
  const {
    quizPagesJson: {
      startQuizPage: { bannerIcons, bannerImage, bannerImageMobile, bannerHeaderText, bannerText },
    },
  } = useQuizPagesData();

  const {
    layoutJson: { resultsBannerBackgroundIcons },
  } = useLayoutData();

  return (
    <Layout page={pageUrl}>
      <HeadInfo
        headerBackgroundImage={resultsBannerBackgroundIcons}
        title="Your Quiz Results"
        imageUrl={bannerImage}
        imageMobileUrl={bannerImageMobile}
      />

      <ContentContainer>
        <h1 className={resultsStyles.pageHeader}>Hair Profile</h1>

        <HairProfile />

        <h1 className={resultsStyles.hairProfileHeader}>Understanding your hair profile</h1>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
          architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
          amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut
          labore et dolore magnam aliquam quaerat voluptatem.
        </p>
        <ul className={resultsStyles.listRecommendations}>
          <li>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo.
          </li>
          <li>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </li>
          <li>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
            velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam
            aliquam quaerat voluptatem.
          </li>
        </ul>
      </ContentContainer>

      <InfoBlock />

      <ContentContainer>
        <Recommendations />
      </ContentContainer>

      <DownloadApp />
    </Layout>
  );
}
