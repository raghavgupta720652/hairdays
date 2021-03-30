import React from 'react';
import useQuizPagesData from '../hooks/useQuizPagesData';
import ContentContainer from './ContentContainer';
import infoBlockStyles from '../styles/components/infoBlock.module.scss';

export default function InfoBlock() {
  const {
    quizPagesJson: {
      infoBlock: { bgImg, title, imgUrl },
    },
  } = useQuizPagesData();

  const bgImage = { backgroundImage: `url(${bgImg})` };

  return (
    <div className={infoBlockStyles.infoBlockWrapper}>
      <ContentContainer>
        <div className={infoBlockStyles.infoBlockHolder} style={bgImage}>
          <span className={infoBlockStyles.infoBlockTitle}>{title}</span>
          <img className={infoBlockStyles.infoBlockImage} src={imgUrl} alt={title} />
        </div>
      </ContentContainer>
    </div>
  );
}
