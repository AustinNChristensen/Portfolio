import React from 'react';
import Container from '../components/Container';
import { graphql, Link } from "gatsby";

const AllProjects = ({data}) => {
    const { edges } = data.allMarkdownRemark;
    return (
        <Container>
            {edges.map(edge => {
                const { frontmatter } = edge.node;
                return ( <p>Coming soon!</p>
                    // <div key={frontmatter.path}>
                    //     <Link to={frontmatter.path}>
                    //         {frontmatter.title}
                    //     </Link>
                        
                    // </div>
                )
            })}
        </Container>
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