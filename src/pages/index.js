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
                    <ContentItem key={frontmatter.path}>
                        <Link to={frontmatter.path}>
                            {frontmatter.title}
                        </Link>
                    </ContentItem>
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
