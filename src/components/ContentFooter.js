import React from 'react';
import styled from 'styled-components';
import TwitterIcon from '../icons/twitter.svg';
import ProfilePicture from '../icons/cropped.jpg';
export const ContentFooter = () => {
    return (
        <FooterContainer>
        <Row>            
            <ProfilePicWrapper><img alt='Austin' src={ProfilePicture} /></ProfilePicWrapper>
            <Name>Austin Christensen </Name>
            <Twitter target='_blank' href='https://twitter.com/theAustinNC'><img src={TwitterIcon} alt='twitter logo'/></Twitter>
        </Row>
        <Row>
            <TagLine>I write code, listen to podcasts, and occasionally tweet.</TagLine>
        </Row>
        </FooterContainer>
    )
}

const FooterContainer = styled.div`
    background-color: ${props => props.theme.thirdAccent};
    margin: 20px 5%;
    padding: 20px 5%;
    margin-bottom: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;


const ProfilePicWrapper = styled.div`
    & > img {
        height: 56px;
        width: auto;
        border-radius: 30px;
    }
`;

const Name = styled.p`
    color: ${props => props.theme.brandColor};
`;
const Twitter = styled.a`
    & > img {
        height: 30px;
        width: auto;
    }
`;
const TagLine = styled.p`
`;