import React  from 'react';
import styled from 'styled-components';

export const Footer = ({ mode, changeMode }) => {
    return null;
    // return mode === 'light' ? <FooterWrapper onClick={() => changeMode()}>Switch to dark mode</FooterWrapper> : <FooterWrapper onClick={() => changeMode()}>Switch to light mode</FooterWrapper>
}

const FooterWrapper = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
`;