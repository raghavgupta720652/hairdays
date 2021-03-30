import React from 'react';
import resultStyles from '../styles/components/result.module.scss';

export default function Result(props) {
  const {
    data: { text, url, icon },
    pageUrl,
  } = props;

  const imgUrl = pageUrl === 'hair-long' ? icon : url;

  return (
    <div className={resultStyles.result}>
      <img className={resultStyles.img} src={imgUrl} alt="" />

      <span className={resultStyles.text}>{text}</span>
    </div>
  );
}
