import React from 'react';
import Helmet from 'react-helmet';
import Header from './Header';
import Footer from './Footer';
import useSiteMetadata from '../hooks/useSiteMetadata';
import layoutStyles from '../styles/components/layout.module.scss';

export default function Layout(props) {
  const {
    site: {
      siteMetadata: { title, description },
    },
  } = useSiteMetadata();
  const { children, page } = props;

  return (
    <section className={layoutStyles.layout}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <Header page={page} />

      {children}

      <Footer page={page} />
    </section>
  );
}
