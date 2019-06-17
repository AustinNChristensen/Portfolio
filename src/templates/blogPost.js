import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Container from '../components/Container';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

const Template = ({ data, pageContext }) => {
    const {next, prev} = pageContext;
    const { markdownRemark } = data;
    const title = markdownRemark.frontmatter.title;
    const html = markdownRemark.html;
    return (
        <Container>
            <BlogPostWrapper>
            <h1>{title}</h1>
            <div 
                className='post' 
                dangerouslySetInnerHTML={{__html: html}}
            />
            </BlogPostWrapper>
            {prev && <Link to={prev.frontmatter.path}>Last Post </Link>}
            {next && <Link to={next.frontmatter.path}>Next Post </Link>}
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
    background-color: #31515E;
    margin: 0 5%;
    padding: 0 5%;
    margin-bottom: 20px;
    box-shadow: -1px 2px 7px 4px rgba(122,132,128,1);
`
export default Template;