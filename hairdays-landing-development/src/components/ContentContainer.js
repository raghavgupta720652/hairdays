import React from 'react';
import cx from 'classnames';

import checkboxStyles from '../styles/components/contentContainer.module.scss';

export default function ContentContainer(props) {
  const { children, style, className } = props;

  return (
    <div className={cx(checkboxStyles.content, className)} style={style}>
      {children}
    </div>
  );
}
