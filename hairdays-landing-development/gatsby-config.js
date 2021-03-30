const config = require('./config.json');
const infoData = require('./content/data/info.json');

module.exports = {
  // this makes the site config available to forestry cms
  siteMetadata: {
    title: config.title,
    description: config.description,
    repoUrl: config.repository_url,
    infoData,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
    },
    {
      resolve: 'gatsby-transformer-remark',
    },
    {
      resolve: 'gatsby-plugin-react-helmet',
    },
    {
      resolve: 'gatsby-transformer-yaml',
    },
    {
      resolve: 'gatsby-transformer-json',
    },
    {
      resolve: 'gatsby-transformer-sharp',
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'json',
        path: `${__dirname}/content/data`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/content/data`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/uploads`,
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 75,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          'gatsby-remark-normalize-paths',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
  ],
};
