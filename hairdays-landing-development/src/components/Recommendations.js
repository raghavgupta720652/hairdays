import React from 'react';
import Slider from 'react-slick';
import Button from '../components/Button';
import useQuizPagesData from '../hooks/useQuizPagesData';
import recommendationsStyles from '../styles/components/recommendations.module.scss';

export default function Recommendations() {
  const {
    quizPagesJson: { recommendationsBlock },
  } = useQuizPagesData();

  const { titlePage, slider } = recommendationsBlock;

  const settings = {
    dots: true,
    infinite: false,
    arrows: false,
    adaptiveHeight: true,
  };

  const renderItem = () => {
    return slider.map((slide) => {
      const { title, description, video, products } = slide;

      const productsRender = () => {
        return products.map((item) => {
          const { imgUrl, name, price, linkUrl } = item;

          return (
            <div className={recommendationsStyles.recommendationsSlideItem} key={imgUrl}>
              <div className={recommendationsStyles.recommendationsSlideImage}>
                <a href={linkUrl} target="_blank">
                  <img src={imgUrl} alt={name} />
                </a>
              </div>
              <span className={recommendationsStyles.recommendationsSlideName}>
                <a href={linkUrl} target="_blank">
                  {name}
                </a>
              </span>
              <div className={recommendationsStyles.recommendationsSlideBottom}>
                <span className={recommendationsStyles.recommendationsSlidePrice}>{price}</span>
                <a
                  href={linkUrl}
                  target="_blank"
                  className={recommendationsStyles.recommendationsSlideButton}
                >
                  <Button variant="primary">Buy</Button>
                </a>
              </div>
            </div>
          );
        });
      };

      return (
        <div key={title}>
          <span className={recommendationsStyles.recommendationsSlideTitle}>{title}</span>
          {description ? (
            <p className={recommendationsStyles.recommendationsSlideDescription}>{description}</p>
          ) : null}
          {video ? (
            <div className={recommendationsStyles.recommendationsSlideVideo}>
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                src={video}
              />
            </div>
          ) : null}
          {products.length ? (
            <div className={recommendationsStyles.recommendationsSlideList}>{productsRender()}</div>
          ) : null}
        </div>
      );
    });
  };

  return (
    <div className={recommendationsStyles.recommendationsWrapper}>
      <span className={recommendationsStyles.recommendationsTitle}>{titlePage}</span>
      <Slider {...settings}>{renderItem()}</Slider>
    </div>
  );
}
