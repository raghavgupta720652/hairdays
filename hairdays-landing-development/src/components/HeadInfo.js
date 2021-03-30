import React, { useMemo } from 'react';
import cx from 'classnames';
import ContentContainer from './ContentContainer';
import headInfoStyles from '../styles/components/headInfo.module.scss';

export default function HeadInfo(props) {
  const {
    backgroundUrl,
    title,
    description,
    imageUrl,
    imageMobileUrl,
    headerBackgroundImage,
  } = props;

  const bannerImageUrl = useMemo(() => {
    return { backgroundImage: `url(${backgroundUrl})` };
  }, []);

  const backgroundImageUrl = useMemo(() => {
    return { backgroundImage: `url(${headerBackgroundImage})` };
  }, []);

  return (
    <section className={headInfoStyles.headInfoWrapper}>
      <ContentContainer>
        <div className={headInfoStyles.headInfoSection} style={backgroundImageUrl}>
          <div className={headInfoStyles.headInfoBanner} style={bannerImageUrl}>
            <div className={headInfoStyles.headInfoContent}>
              <h1 className={headInfoStyles.headInfoTitle}>{title}</h1>
              {description ? <p className={headInfoStyles.headInfoText}>{description}</p> : null}
            </div>
          </div>
          <img className={headInfoStyles.headInfoImage} src={imageUrl} alt={title} />
          <img
            className={cx(headInfoStyles.headInfoImage, headInfoStyles.headInfoImageMobile)}
            src={imageMobileUrl}
            alt={title}
          />
        </div>
      </ContentContainer>
    </section>
  );
}
