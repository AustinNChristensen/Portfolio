import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Container from '../components/Container';

const SingleTagTemplate = ({pageContext }) => {
    const { posts, tagName } = pageContext;
    return (
        <Container>
            Posts about {`${tagName}`}
                <PostList>
                    {posts.map((post, index) => {
                        return (
                        <PostCard key={index}>
                            <Link to={post.frontmatter.path}>
                                {post.frontmatter.title}
                            </Link>
                        </PostCard>
                        )
                    })}
                </PostList>
        </Container>
    )
};

export default SingleTagTemplate;

const PostList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
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