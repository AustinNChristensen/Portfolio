import React from "react";
import Container from '../components/Container';
import { graphql, Link } from "gatsby";
import styled from 'styled-components';
const Layout = ({data}) => {
    const { edges } = data.allMarkdownRemark;
    return (
        <Container>
            <HomePageWrapper>
            {edges.map(edge => {
                const { frontmatter } = edge.node;
                return (
                    <PostCard key={frontmatter.path}>
                        <Link to={frontmatter.path}>
                            {frontmatter.title}
                        </Link>
                    </PostCard>
                )
            })}
            <TagsLink>
                <Link to={`/tags`}>Or, filter by tag!</Link>
            </TagsLink>
            </HomePageWrapper>
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

const HomePageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
        color: ${props => props.theme.text};
    }
`;

const ContentItem = styled.span`
    &:not(:first-child){
        margin-top: 20px;
    }
`;

const TagsLink = styled.span`
    margin-top: 20px;
`;

const PostCard = styled.div`
    text-align: center;
    background-color: ${props => props.theme.text};
    border-radius: 6px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.2), 
                0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 100%;
    width: 100%;
    padding: 15px 20px;
    line-height: 1.5;
    a {
        color: ${props => props.theme.background};
        font-weight: 700;
        font-size: 1.3em;
        text-decoration: none;
    }
}
`;