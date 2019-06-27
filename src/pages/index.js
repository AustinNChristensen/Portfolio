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
                        <CardFront>
                            <DateString>{getPrettyDate(frontmatter.date)}</DateString>
                            <PostTitle>{frontmatter.title}</PostTitle>
                            <PostTags>{frontmatter.tags.map((tag, idx) => {
                               return (idx === 0 ? <Tag>{`${tag}`}</Tag> : <Tag>{`, ${tag}`}</Tag> )
                            })}</PostTags>
                        </CardFront>
                        <CardBack>
                            <Excerpt>{`"${frontmatter.excerpt}"`}</Excerpt>
                            <Row>
                                <TimeToRead>{`${timeToRead} min to read`}</TimeToRead>
                                <ColorLink to={frontmatter.path}>Read More</ColorLink>
                            </Row>
                        </CardBack>
                    </PostCard>
                )
            })}
            <TagsLink>
                <ColorLink to={`/tags`}>Or, filter by tag!</ColorLink>
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
                   tags
                 }
                 timeToRead
               }
          }
        }
    }
`;
export default Layout;

const CardFront = styled.div`
    transition: all .8s ease;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 3px;
    overflow: hidden
    box-shadow: 0 1.5rem 4rem rgba(#000000, .15);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
`;

const PostTags = styled.p`
    color: ${props => props.theme.brandColor};
    position: absolute;
    bottom: 25px;
    word-spacing: 5px;
`;

const Tag = styled.span`
    // margin: 0 5px;
`;

const CardBack = styled.div`
    transition: all .8s ease;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 3px;
    overflow: hidden
    box-shadow: 0 1.5rem 4rem rgba(#000000, .15);
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: rotateY(180deg);
`;

const Row = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
`;
const PostCard = styled.div`
    background-color: ${props => props.theme.text};
    border-radius: 6px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.2), 
                0 1px 5px 0 rgba(0, 0, 0, 0.12);
    width: 250px;
    height: 200px;
    padding: 15px 35px;
    line-height: 1.5;
    perspective: 150rem;
    position: relative
    &:hover ${CardFront} {
        transform: rotateY(-180deg);
    }

    &:hover ${CardBack} {
        transform: rotateY(0);
    }
}
`;

const PostTitle = styled.h2`
    color: ${props => props.theme.background};
    font-weight: 700;
    font-size: 1.3em;
    text-decoration: none;
    text-align: center;
    margin-top: 20px;
`;

const HomePageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TimeToRead = styled.p`
    color: ${props => props.theme.brandColor};
    align-self: flex-start;
    position: absolute;
    left: 20px;
    bottom: 10px;
`;
const DateString = styled.p`
    color: ${props => props.theme.brandColor};
    align-self: flex-end;
    margin-right: 10px;
`;

const Excerpt = styled.span`
    color: ${props => props.theme.background};
    padding: 20px 20px;
    margin-bottom: 0;
    margin-top: 0;
    margin: 0;
`;

const ColorLink = styled(Link)`
    color: ${props => props.theme.brandColor};
    position: absolute;
    right: 20px;
    bottom: 10px;
`;

const TagsLink = styled.span`
    margin-top: 20px;
`;