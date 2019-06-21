import React, { useState } from 'react';
import styled from 'styled-components';

export const Footer = ({ mode, changeMode }) => {
    return mode === 'light' ? <FooterWrapper onClick={() => changeMode()}>Switch to dark mode</FooterWrapper> : <FooterWrapper onClick={() => changeMode()}>Switch to light mode</FooterWrapper>
}

const FooterWrapper = styled.div`
    position: relative;
    margin: 20px 0;
`;