import React from 'react';
import Container from '../components/Container';
import styled from 'styled-components';

const About = () => {
    return (
        <Container>
            <Header><Name>Austin Christensen</Name></Header>
            <Paragraph>
                I'm a self-described autodidact and epicurean with an affinity for <Highlight>software development</Highlight> ,
                <Highlight> wine</Highlight>,&nbsp;and <Highlight>single-barrel bourbon</Highlight>.
                Between podcast episodes and blog posts I write software using <Highlight>React</Highlight> in Chicago.
            </Paragraph>
            <Paragraph>
                Beyond technology, I find myself frequently reading about <Highlight>Human Optimization</Highlight>,
                extreme sports, and security.
            </Paragraph>
        </Container>
    )
}

export default About;

const Header = styled.h1`
    color: ${props => props.theme.text};
    align-self: flex-start;
    margin-left: 100px;
    padding-bottom: 5px;
`;

const Name = styled.span`
    color: ${props => props.theme.brandColor};
    border-bottom: 1px solid ${props => props.theme.mainAccent};
`;

const Highlight = styled.span`
    color: ${props => props.theme.brandColor};
`;

const Paragraph = styled.p`
    color: ${props => props.theme.text};
    width: 50%;
    line-height: 1.8;
    font-weight: 400;
    font-size: 18px;
`;

const InterestList = styled.ul`
    color: ${props => props.theme.text};
    list-style: none;
`;

const InterestItem = styled.li`
    &:not(:first-child){
        margin-top: 8px;
    }
`;