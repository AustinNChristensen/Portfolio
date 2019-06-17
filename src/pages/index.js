import React from "react";
import Container from '../components/Container';
import { graphql, Link } from "gatsby";
const Layout = ({data}) => {
    const { edges } = data.allMarkdownRemark;
    return (
        <Container>
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
            <div>
                <Link to={`/tags`}>All Tags</Link>
            </div>
        </Container>
    );
};

export const query = graphql`
    query HomepageQuery {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { glob: "**/src/pages/blogs/**/*.md"}},
            sort: {
                order: DESC, fields: [frontmatter___date]
            },
            limit: 5
        ) {
          edges {
               node {
                 frontmatter {
                   title
                   path
                   date
                   excerpt
                 }
               }
          }
        }
    }
`;
export default Layout;
