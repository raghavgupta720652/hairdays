import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import { Link, navigate } from 'gatsby';
import useLayoutData from '../hooks/useLayoutData';
import headerStyles from '../styles/components/header.module.scss';

const activeStyle = { color: '#00C9C9' };
const headerLinks = [
  // {
  //   url: '/#about-us',
  //   text: 'About us',
  // },
  // {
  //   url: '',
  //   text: 'Features',
  // },
  // {
  //   url: '/start-quiz',
  //   text: 'Quiz',
  // },
  // {
  //   url: '/blog',
  //   text: 'Blog',
  // },
  {
    url:
      'https://docs.google.com/forms/d/e/1FAIpQLSf98LxDzi7i5GXTiMQY0E1x1T1XYRPHI50B2KRZhUjoIuuIHQ/viewform?embedded=true',
    text: 'Request to Join',
  },
  {
    url: 'mailto:beta@myhairdays.com',
    text: 'Contact Us',
  },
];

export default function Header(props) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('smooth-scroll')('a[href*="#"]');
    }
  }, []);

  const {
    layoutJson: { blackLogo },
  } = useLayoutData();

  const { page } = props;

  const navigateToHomePage = useCallback(function() {
    if (page === 'home') {
      return;
    }

    navigate('/');
  }, []);

  const [menuActive, toggleMenu] = useState(false);

  const handleMenu = () => toggleMenu(!menuActive);

  const renderNavLinks = function() {
    return headerLinks.map((item) => {
      const { url, text } = item;
      return (
        <a href={url} className={headerStyles.headerNavLink} key={text}>
          {text}
        </a>
      );
    });
  };

  return (
    <div className={headerStyles.content}>
      <header className={headerStyles.header}>
        <div className={headerStyles.headerContainer}>
          <img className={headerStyles.logo} onClick={navigateToHomePage} src={blackLogo} alt="" />
          <div className={headerStyles.burgerMenu} onClick={handleMenu}></div>
          <nav
            className={cx({
              [headerStyles.headerNav]: true,
              [headerStyles.headerNavActive]: menuActive,
            })}
          >
            <span className={headerStyles.closeMenu} onClick={handleMenu}></span>
            {renderNavLinks()}
          </nav>
        </div>
      </header>
    </div>
  );
}
