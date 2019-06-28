const path = require(`path`)

const createTagPages = (createPage, posts) => {
  const allTagsIndexTemplate = path.resolve(`src/templates/AllTagsIndex.js`);
  const SingleTagIndexTemplate = path.resolve(`src/templates/SingleTagIndex.js`);
  const postsByTag = {};

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = [];
        }
        postsByTag[tag].push(node);
      })
    }
  });

  const tags = Object.keys(postsByTag);

  createPage({
    path: '/tags',
    component: allTagsIndexTemplate,
    context: {
      tags: tags.sort()
    }
  })

  tags.forEach(tagName => {
    const posts = postsByTag[tagName];
    createPage({
      path: `/tags/${tagName}`,
      component: SingleTagIndexTemplate,
      context: {
        posts,
        tagName
      }
    })

  })
}

const createStaticPages = (createPage) => {
  const About = path.resolve(`src/templates/About.js`);
  const Contact = path.resolve(`src/templates/Contact.js`);
  // const AllProjects = path.resolve(`src/templates/AllProjects.js`);
  const FourOhFour = path.resolve(`src/templates/404.js`);
  

  createPage({
    path: `/about`,
    component: About
  });

  createPage({
    path: `/contact`,
    component: Contact
  });

  // createPage({
  //   path: `/projects`,
  //   component: AllProjects
  // });

  createPage({
    path: `/404.html`,
    component: FourOhFour
  });
}
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  createStaticPages(createPage);
  const blogPostTemplate = path.resolve(`src/templates/blogPost.js`);
  const SingleProjectTemplate = path.resolve(`src/templates/SingleProject.js`);
  
  // blog - Blog Home?

  // todo - add date & est time to read
  const blogs = graphql(`
    query loadPagesQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/src/pages/blogs/**/*.md"}},
        sort: {
          order: ASC,
          fields: [frontmatter___date]
        } 
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;
    createTagPages(createPage, posts);
    posts.forEach(({ node }, index) => {
        const slug = node.frontmatter.path;
        createPage({
        path: slug,
        component: blogPostTemplate,
        context: {
            pathSlug: slug,
            prev: index === 0 ? null : posts[index - 1].node,
            next: index === (posts.length -1) ? null : posts[index + 1].node
        }
      })
    })
  })

  const projects = graphql(`
    query loadPagesQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/src/pages/projects/**/*.md"}},
        sort: {
          order: ASC,
          fields: [frontmatter___date]
        } 
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              tags
              repository
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      Promise.reject(result.errors);
    }

    const projects = result.data.allMarkdownRemark.edges;
    projects.forEach(({ node }, index) => {
        const slug = node.frontmatter.path;
        createPage({
        path: slug,
        component: SingleProjectTemplate,
        context: {
            pathSlug: slug,
            prev: index === 0 ? null : projects[index - 1].node,
            next: index === (projects.length -1) ? null : projects[index + 1].node
        }
      })
    })
  })


return Promise.all([blogs, projects]);
}