import React, { Fragment, useMemo } from 'react';
import cx from 'classnames';
import checkboxStyles from '../styles/components/checkbox.module.scss';

export default function Checkbox(props) {
  const { children, imageUrl, checkboxName, handleChange, checked, value } = props;

  const renderImage = useMemo(
    () => imageUrl && <img className={props.imageClass} src={imageUrl} alt="" />,
    [],
  );
  return (
    <Fragment>
      {renderImage}

      <label
        className={cx(checkboxStyles.inputContainer, props?.className)}
        onClick={props?.onClick}
      >
        <input type={props.inputType || 'checkbox'} value={value} name={checkboxName} checked={checked} onChange={handleChange} />

        <span
          className={cx({
            [checkboxStyles.checkmarkRound]: props.variant === 'round',
            [checkboxStyles.checkmarkSquare]: props.variant === 'square',
          })}
        />

        {children}
      </label>
    </Fragment>
  );
}
