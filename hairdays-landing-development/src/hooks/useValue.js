import { useState, useEffect } from 'react';

const checkDisabled = (value) => (value ? !Object.values(value).some((item) => item) : true);

export default function useValue({ type, url }) {
  const windowGlobal = typeof window !== 'undefined' && window;

  if (windowGlobal) {
    if (!localStorage.getItem('quiz')) {
      localStorage.setItem('quiz', JSON.stringify({}));
    }
    const [values, setValues] = useState(JSON.parse(localStorage.getItem('quiz')));
    const [disabledNextBtn, setDisabled] = useState(checkDisabled(values[url]));

    useEffect(() => {
      if (!values[url]) {
        const val = {
          ...values,
          [url]: {},
        };
        setValues(val);
        localStorage.setItem('quiz', JSON.stringify(val));
      }
    }, [url, values]);

    let changeValue;

    if (type === 'checkbox') {
      changeValue = (evt) => {
        const answers = JSON.parse(localStorage.getItem('quiz'));
        const value = { ...answers[url], [evt.target.value]: evt.target.checked };
        const val = {
          ...answers,
          [url]: value,
        };
        localStorage.setItem('quiz', JSON.stringify(val));
        setValues(val);

        setDisabled(checkDisabled(value));
      };
    }

    if (type === 'radio') {
      changeValue = (evt) => {
        const answers = JSON.parse(localStorage.getItem('quiz'));
        const val = { ...answers, [url]: evt.target.value };
        localStorage.setItem('quiz', JSON.stringify(val));
        setValues(val);

        const disabled = !answers[url];
        if (disabled !== disabledNextBtn) {
          setDisabled(disabled);
        }
      };
    }

    if (type === 'range') {
      changeValue = (value) => {
        const answers = JSON.parse(localStorage.getItem('quiz'));
        const val = { ...answers, [url]: value };
        localStorage.setItem('quiz', JSON.stringify(val));
        setValues(val);

        const disabled = !answers[url];
        if (disabled !== disabledNextBtn) {
          setDisabled(disabled);
        }
      };
    }

    return { values, disabledNextBtn, changeValue };
  }
  return { values: {}, disabledNextBtn: false, changeValue: () => {} };
}
