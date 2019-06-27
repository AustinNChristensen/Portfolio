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
                Beyond technology, I find myself frequently reading about <Highlight>human optimization</Highlight>,
                extreme sports, and security.
            </Paragraph>
        </Container>
    )
}

export default About;

const Header = styled.h1`
    color: ${props => props.theme.text};
    background: ${props => props.theme.background};
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
    background: ${props => props.theme.background};
    width: 50%;
    line-height: 1.8;
    font-weight: 400;
    font-size: 18px;
    padding: 5px;
`;