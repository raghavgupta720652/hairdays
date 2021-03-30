import { graphql, useStaticQuery } from 'gatsby';

export default function getHomePagedata() {
  return useStaticQuery(graphql`
    query getLayoutData {
      layoutJson {
        blackLogo
        newLogo
        facebookIcon
        instagramIcon
        mailIcon
        resultsBannerBackgroundIcons
      }
    }
  `);
}
