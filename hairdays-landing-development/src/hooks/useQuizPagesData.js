import { graphql, useStaticQuery } from 'gatsby';

export default function useQuizPagesData() {
  return useStaticQuery(graphql`
    {
      quizPagesJson {
        startQuizPage {
          greenLogo
          quizBannerBg
          bannerIcons
          bannerImage
          bannerImageMobile
          infoIcon
          tooltipIcon
          quizBannerPage
          uploadImageIcon
          bannerHeaderText
          bannerText
          defaultImage
        }
        dominant_hair_types {
          text
          url
          tooltip
        }
        haircare_goals {
          text
          url
        }
        hair_color {
          text
          url
        }
        hair_status {
          text
          url
        }
        hair_condition {
          text
          url
        }
        hair_porosity {
          text
          url
        }
        washing_frequency {
          text
          url
        }
        hair_texture {
          text
          url
          urlMobile
        }
        hair_density {
          text
          url
          urlMobile
        }
        hair_brands {
          text
          url
        }
        hair_products {
          text
          url
        }
        final_step {
          title
          description
          formInput {
            label
            type
            placeholder
          }
          buttonSubmit
        }
        hair_long {
          text
          url
          icon
        }
        recommendationsBlock {
          titlePage
          slider {
            title
            description
            video
            products {
              imgUrl
              name
              price
              linkUrl
            }
          }
        }
        infoBlock {
          bgImg
          title
          imgUrl
        }
        finalStepHead {
          bannerIcons
          bannerHeaderText
          bannerImage
          bannerImageMobile
        }
        downloadApp {
          imgUrl
          title
          description
          downloadGooglePlay
          downloadAppleStore
        }
      }
    }
  `);
}
