module.exports = {
  siteMetadata: {
    title: "Austin N. Christensen - Blog",
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
      },
      {
        "name": "Contact",
        "link": "/contact"
      }
    ]
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    }
  ]
}
