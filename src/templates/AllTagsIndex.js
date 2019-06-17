import React from 'react';
import { Link } from 'gatsby';
import Header from '../components/Header';
const AllTagsTemplate = ({ data, pageContext }) => {
    const { tags } = pageContext;
    return (
        <>
        <Header />
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
            
        </>
    )
};

export default AllTagsTemplate;