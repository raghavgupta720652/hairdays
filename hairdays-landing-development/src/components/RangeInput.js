import React, { useMemo } from 'react';
import Slider from 'rc-slider';
import cx from 'classnames';
import rangeInputStyles from '../styles/components/rangeInput.module.scss';
import 'rc-slider/assets/index.css';

const sliderHandleStyles = {
  borderColor: 'rgba(0, 0, 0, 0.1)',
  borderWidth: 1,
  height: 28,
  width: 28,
  marginTop: -13,
  backgroundColor: '#fff',
  zIndex: 3,
};

const sliderRailStyles = {
  backgroundColor: '#d8d8d8',
  height: 1,
};

const sliderTrackStyles = {
  backgroundColor: '#ff6348',
  height: 1,
};

const sliderDotStyles = {
  border: 0,
  width: 1,
  backgroundColor: '#d8d8d8',
  marginLeft: 0,
  bottom: -1,
};

const sliderActiveDotStyles = {
  backgroundColor: '#ff6348',
};

export default function RangeInput(props) {
  const { data, changeValue, value } = props;

  const renderMarks = useMemo(() => {
    const arr = data.map((item, index) => {
      const { text, url } = item;
      if (index === 0) {
        return (
          <span className={rangeInputStyles.itemFirst} key={text}>
            {text}
          </span>
        );
      }
      if (index === data.length - 1) {
        return (
          <span className={rangeInputStyles.itemLast} key={text}>
            {text}
          </span>
        );
      }
      return (
        <div
          className={cx(rangeInputStyles.item, {
            [rangeInputStyles.itemActive]: index === value,
          })}
          key={text}
        >
          <div className={rangeInputStyles.image}>
            <img src={url} alt={text} />
          </div>
          <span>{text}</span>
        </div>
      );
    });
    return { ...arr };
  }, [data, value]);

  const changedData = (index) => changeValue(data[index].text);

  return (
    <div className={rangeInputStyles.wrapper}>
      <Slider
        min={0}
        max={data.length - 1}
        marks={renderMarks}
        onAfterChange={changedData}
        step={null}
        defaultValue={value}
        className="range"
        handleStyle={sliderHandleStyles}
        railStyle={sliderRailStyles}
        trackStyle={sliderTrackStyles}
        dotStyle={sliderDotStyles}
        activeDotStyle={sliderActiveDotStyles}
      />
    </div>
  );
}
