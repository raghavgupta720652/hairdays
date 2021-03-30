import React, { useCallback } from 'react';
import { navigate } from 'gatsby';
import useQuizPagesData from '../hooks/useQuizPagesData';
import Layout from '../components/Layout';
import ContentContainer from '../components/ContentContainer';
import Stepper from '../components/Stepper';
import Input from '../components/Input';
import Button from '../components/Button';
import DownloadApp from '../components/DownloadApp';
import finalStepStyles from '../styles/pages/finalStep.module.scss';

export default function FinalStep() {
  const {
    quizPagesJson: { final_step: finalStep },
  } = useQuizPagesData();

  const { title, description, formInput, buttonSubmit } = finalStep;

  const renderFormInput = () => {
    return formInput.map((item) => {
      const { label, type, placeholder } = item;

      return (
        <div className={finalStepStyles.formItem} key={label}>
          <Input label={label} type={type} placeholder={placeholder} />
        </div>
      );
    });
  };

  const navigateToNextPage = useCallback(function(e) {
    e.preventDefault();
    navigate('/results');
  }, []);

  return (
    <Layout page="final-step">
      <ContentContainer>
        <Stepper />

        <div className={finalStepStyles.wrapper}>
          <h1 className={finalStepStyles.title}>{title}</h1>
          <p className={finalStepStyles.description}>{description}</p>
          <form>
            {renderFormInput()}
            <Button variant="primary" onClick={navigateToNextPage}>
              {buttonSubmit}
            </Button>
          </form>
        </div>
      </ContentContainer>
    </Layout>
  );
}
