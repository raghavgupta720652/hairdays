import React, { useMemo } from 'react';
import useLayoutData from '../hooks/useLayoutData';
import footerStyles from '../styles/components/footer.module.scss';

export default function Footer(props) {
  const {
    layoutJson: { facebookIcon, instagramIcon, mailIcon },
  } = useLayoutData();

  const { page } = props;

  const displayFooter = useMemo(() => {
    if (page !== 'home' && page !== 'start-quiz' && page !== 'results') {
      return { display: 'none' };
    }

    return {};
  }, []);

  return (
    <div className={footerStyles.content} style={displayFooter}>
      <footer className={footerStyles.footer}>
        <div className={footerStyles.copyright}>
          <p>MyHairDays.com &copy; 2021</p>
        </div>

        <div className={footerStyles.policy}>
          <a href="#"> Terms of service</a>
          <a className={footerStyles.privacy} href="#">
            Privacy
          </a>
        </div>

        <div className={footerStyles.contacts}>
          <a href="mailto:beta@myhairdays.com" className={footerStyles.imageContainer}>
            <img src={mailIcon} alt="" />
          </a>
          <a href="https://www.facebook.com/myhairdays" className={footerStyles.imageContainer}>
            <img src={facebookIcon} alt="" />
          </a>
          <a href="https://www.instagram.com/myhairdays/" className={footerStyles.imageContainer}>
            <img src={instagramIcon} alt="" />
          </a>
        </div>
      </footer>
    </div>
  );
}
