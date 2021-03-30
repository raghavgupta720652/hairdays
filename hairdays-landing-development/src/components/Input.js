import React from 'react';
import inputStyles from '../styles/components/input.module.scss';

export default function Input(props) {
  const { label, type, placeholder } = props;

  return (
    <label className={inputStyles.inputBlock}>
      <span className={inputStyles.label}>{label}</span>
      <input type={type} placeholder={placeholder} className={inputStyles.input} />
    </label>
  );
}
