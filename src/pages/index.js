import React from "react";
import Container from '../components/Container';
import { graphql, Link } from "gatsby";
import styled from 'styled-components';
import { getPrettyDate } from '../utils';

const Layout = ({data}) => {
    const { edges } = data.allMarkdownRemark;
    console.log(data);

    return (
        <Container>
            <HomePageWrapper>
            {edges.map(edge => {
                const { frontmatter, timeToRead } = edge.node;
                return (
                    <PostCard key={frontmatter.path}>
                        <FlexLink to={frontmatter.path}>
                            <DateString>{getPrettyDate(frontmatter.date)}</DateString>
                                <PostTitle>{frontmatter.title}</PostTitle>
                            <Excerpt>{`${frontmatter.excerpt}`}</Excerpt>
                            <TimeToRead>{`${timeToRead} min to read`}</TimeToRead>
                        </FlexLink>
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
                 timeToRead
               }
          }
        }
    }
`;
export default Layout;

const FlexLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const HomePageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
        color: ${props => props.theme.text};
    }
`;

const PostTitle = styled.h2`
    color: ${props => props.theme.background};
    font-weight: 700;
    font-size: 1.3em;
    text-decoration: none;
`;

const TimeToRead = styled.p`
    color: ${props => props.theme.hint};
    align-self: flex-end;
`;
const DateString = styled.p`
    color: ${props => props.theme.brandColor};
    align-self: flex-end;
`;

const Excerpt = styled.p`
    color: ${props => props.theme.thirdAccent};
`;

const TagsLink = styled.span`
    margin-top: 20px;
`;

const PostCard = styled.div`
    background-color: ${props => props.theme.text};
    border-radius: 6px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.2), 
                0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 50%;
    height: 100%;
    padding: 15px 20px;
    line-height: 1.5;
}
`;