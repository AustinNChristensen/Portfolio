import React, { useContext } from "react";

import { ThemeConsumer } from 'styled-components';
import Container from '../components/Container';
import { graphql, Link } from "gatsby";
import styled from 'styled-components';
import DarkTimerIcon from '../icons/dark-timer.svg';
import LightTimerIcon from '../icons/light-timer.svg';
import icon from '../icons/light-timer.svg';
import { getPrettyDate } from '../utils';

const Layout = ({ data, theme }) => {
    // console.log(ThemeContext, ThemeConsumer);
    // let icon = DarkTimerIcon;
    // if (themeContext === 'dark'){
    //     icon = DarkTimerIcon;
    // } else {
    //     icon = LightTimerIcon;
    // }

    const { edges } = data.allMarkdownRemark;
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
                               return <Tag key={tag}>{`${tag} `}</Tag>
                            })}</PostTags>
                        </CardFront>
                        <CardBack>
                            <Excerpt>{`"${frontmatter.excerpt}"`}</Excerpt>
                            <Row>
                                <TimeToRead><img src={icon} alt='timer' />{`${timeToRead} min to read`}</TimeToRead>
                                <ReadMoreLink to={frontmatter.path}>Read More</ReadMoreLink>
                            </Row>
                        </CardBack>
                    </PostCard>
                )
            })}
            <TagsLink>
                <ColoredLink to={`/tags`}>Or, filter by tag!</ColoredLink>
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
    overflow: hidden;
    box-shadow: 0 1.5rem 4rem rgba(#000000, .15);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
`;

const PostTags = styled.div`
    color: ${props => props.theme.brandColor};
    position: absolute;
    bottom: 25px;
    display: flex;
    flex-direction: row;
    // justify-content: space-between;
    flex-wrap: wrap;
`;

const Tag = styled.p`
    background: ${props => props.theme.contrastBrandColor};
    color: ${props => props.theme.text};
    padding: 2px 4px;
    border-radius: 5px;
    text-align: center;
    width: auto;
    margin: 3px 5px;
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
    overflow: hidden;
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
    &:not(:first-child){
        margin-top: 25px;
    }
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
    position: relative;
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
    margin-top: 30px;
`;

const HomePageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TimeToRead = styled.p`
    color: ${props => props.theme.contrastBrandColor};
    align-self: flex-start;
    position: absolute;
    left: 20px;
    bottom: 10px;
    & > img {
        height: 15px;
        width: auto;
        margin-right: 3px;
    }
`;
const DateString = styled.p`
    color: ${props => props.theme.contrastBrandColor};
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

const ReadMoreLink = styled(Link)`
    color: ${props => props.theme.contrastBrandColor};
    position: absolute;
    right: 20px;
    bottom: 10px;
`;

const ColoredLink = styled(Link)`
    color: ${props => props.theme.contrastBrandColor};
    background: ${props => props.theme.background};
    padding: 5px;
`;

const TagsLink = styled.span`
    margin-top: 20px;
`;