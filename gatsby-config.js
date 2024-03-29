module.exports = {
  siteMetadata: {
    title: "Austin N. Christensen",
    description: "This is my blog.",
    menuLinks: [
      {
        "name": "Home",
        "link": "/"
      },
      {
        "name": "About",
        "link": "/about"
      },
      {
        "name": "Projects",
        "link": "/projects"
      }
    ]
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    `gatsby-plugin-styled-components`,
  ]
};