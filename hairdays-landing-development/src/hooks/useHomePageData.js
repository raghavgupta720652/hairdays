import { graphql, useStaticQuery } from 'gatsby';

export default function getHomePageData() {
  return useStaticQuery(graphql`
    query getHomePageData {
      homePageJson {
        greenLogo
        quizBanner
        quizBannerImage
        bannerHeaderText
        bannerText
        mainContentLogo
        mainContentHeader
        downloadGooglePlay
        downloadAppleStore
        aboutUsImg
        mobileQuizBanner
      }
    }
  `);
}
