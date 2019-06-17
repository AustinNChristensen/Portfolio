import React from 'react';
import { Link } from 'gatsby';
import Container from '../components/Container';
const SingleTagTemplate = ({pageContext }) => {
    const { posts, tagName } = pageContext;
    return (
        <Container>
            Posts about {`${tagName}`}
            <div>
                <ul>
                    {posts.map((post, index) => {
                        return (
                        <li key={index}>
                            <Link to={post.frontmatter.path}>
                                {post.frontmatter.title}
                            </Link>
                        </li>
                        )
                    })}
                </ul>
            </div>
        </Container>
    )
};

export default SingleTagTemplate;