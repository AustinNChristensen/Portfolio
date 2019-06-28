import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Container from '../components/Container';
import { ContentFooter } from '../components/ContentFooter';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

const Template = ({ data, pageContext }) => {
    const {next, prev} = pageContext;
    const { markdownRemark } = data;
    const title = markdownRemark.frontmatter.title;
    const html = markdownRemark.html;
    return (
        <Container>
            <BlogTitle>{title}</BlogTitle>
            <BlogPostWrapper>
            <BlogPost 
                className='post' 
                dangerouslySetInnerHTML={{__html: html}}
            />
            </BlogPostWrapper>
            {prev && <Link to={prev.frontmatter.path}>Last Post </Link>}
            {next && <Link to={next.frontmatter.path}>Next Post </Link>}
            <ContentFooter/>
        </Container>
    )
};

export const query = graphql`
    query($pathSlug: String!) {
        markdownRemark(frontmatter: {
             path: {
                 eq: $pathSlug 
                } 
            }) {
                html
                frontmatter {
                    title
                }
            }
    }
`;

const BlogPostWrapper = styled.article`
    background-color: ${props => props.theme.thirdAccent};
    margin: 20px 5%;
    padding: 20px 5%;
    margin-bottom: 20px;
    border-radius: 10px;
`
const BlogTitle = styled.h1`
    color: ${props => props.theme.brandColor};
    text-align: center;
    background: ${props => props.theme.background};
    padding: 13px;
`;

const BlogPost = styled.div`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    a {
        color: ${props => props.theme.brandColor};
    }
    p,
    ol,
    ul,
    a {
        font-size: 1.2rem;
        line-height: 1.5;
    }

`
export default Template;