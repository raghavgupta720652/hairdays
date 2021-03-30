import React from 'react';
import ContentContainer from './ContentContainer';
import useQuizPagesData from '../hooks/useQuizPagesData';
import downloadAppStyles from '../styles/components/downloadApp.module.scss';

export default function DownloadApp() {
  const {
    quizPagesJson: {
      downloadApp: { imgUrl, title, description, downloadGooglePlay, downloadAppleStore },
    },
  } = useQuizPagesData();

  return (
    <div className={downloadAppStyles.downloadAppWrapper}>
      <ContentContainer>
        <div className={downloadAppStyles.downloadAppBlock}>
          <img className={downloadAppStyles.downloadAppImg} src={imgUrl} alt={title} />
          <span className={downloadAppStyles.downloadAppTitle}>{title}</span>
          <p className={downloadAppStyles.downloadAppDescription}>{description}</p>
          <div className={downloadAppStyles.downloadAppList}>
            <div className={downloadAppStyles.downloadAppItem}>
              <a
                className={downloadAppStyles.downloadAppLink}
                href="https://docs.google.com/forms/d/e/1FAIpQLSf98LxDzi7i5GXTiMQY0E1x1T1XYRPHI50B2KRZhUjoIuuIHQ/viewform?embedded=true"
              >
                <img src={downloadGooglePlay} alt="Download Google Play" />
              </a>
            </div>
            <div className={downloadAppStyles.downloadAppItem}>
              <a
                className={downloadAppStyles.downloadAppLink}
                href="https://docs.google.com/forms/d/e/1FAIpQLSf98LxDzi7i5GXTiMQY0E1x1T1XYRPHI50B2KRZhUjoIuuIHQ/viewform?embedded=true"
              >
                <img src={downloadAppleStore} alt="Download Apple Store" />
              </a>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}
