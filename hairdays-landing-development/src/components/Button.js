import React from 'react';
import cx from 'classnames';
import buttonStyles from '../styles/components/button.module.scss';

export default function Button(props) {
  const { children, variant, className } = props;
  return (
    <div className={buttonStyles.buttonContainer}>
      <button
        {...props}
        className={cx(
          {
            [buttonStyles.primaryButton]: variant === 'primary',
            [buttonStyles.secondaryButton]: variant === 'secondary',
          },
          className,
        )}
      >
        {children}
      </button>
    </div>
  );
}
