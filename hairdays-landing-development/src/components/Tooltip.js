import React from 'react';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import tooltipStyles from '../styles/components/tooltip.module.scss';

export default function Tooltip(props) {
  const { children, id, place, borderColor } = props;
  return (
    <ReactTooltip
      effect="solid"
      className={tooltipStyles.libTooltip}
      id={id}
      place={place}
      multiline={true}
      border
      backgroundColor="#fff"
      textColor="#000"
      borderColor={borderColor}
    >
      {children}
    </ReactTooltip>
  );
}
