import React from 'react';
import Header from '../components/Header';
import { graphql, Link } from "gatsby";

const AllProjects = ({data}) => {
    const { edges } = data.allMarkdownRemark;
    return (
        <div>
            <Header />
            {edges.map(edge => {
                const { frontmatter } = edge.node;
                return (
                    <div key={frontmatter.path}>
                        <Link to={frontmatter.path}>
                            {frontmatter.title}
                        </Link>
                        
                    </div>
                )
            })}
        </div>
    );
};

export const query = graphql`
    query AllProjectsQuery {
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
`;
export default AllProjects;