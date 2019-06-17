import React from 'react';
import { Link } from 'gatsby';
import Container from '../components/Container';
const AllTagsTemplate = ({ data, pageContext }) => {
    const { tags } = pageContext;
    return (
        <Container>
            <ul>
                {tags.map((tagName, index) => {
                    return (
                        <li key={index}>
                            <Link to={`tags/${tagName}`}>
                                {tagName}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            
        </Container>
    )
};

export default AllTagsTemplate;