import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Container from '../components/Container';

const AllTagsTemplate = ({ data, pageContext }) => {
    const { tags } = pageContext;
    return (
        <Container>
            <TagList>
                {tags.map((tagName, index) => {
                    return (
                        <TagCard key={index}>
                            <Link to={`tags/${tagName}`}>
                                {tagName}
                            </Link>
                        </TagCard>
                    )
                })}
            </TagList>
            
        </Container>
    )
};

export default AllTagsTemplate;

const TagList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

const TagCard = styled.li`
    text-align: center;
    background-color: ${props => props.theme.text};
    border-radius: 6px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.2), 
                0 1px 5px 0 rgba(0, 0, 0, 0.12);
    height: 100%;
    width: 150px;
    margin: 20px 20px;
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