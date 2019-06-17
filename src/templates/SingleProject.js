import React from 'react';
import Container from '../components/Container';
import {Link, graphql } from 'gatsby';

const SingleProject = ({ data, pageContext }) => {
    const {next, prev} = pageContext;
    const { markdownRemark } = data;
    const title = markdownRemark.frontmatter.title;
    const html = markdownRemark.html;
    return (
        <Container>
            <h1>{title}</h1>
            <div 
                className='post' 
                dangerouslySetInnerHTML={{__html: html}}
            />
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
export default SingleProject;