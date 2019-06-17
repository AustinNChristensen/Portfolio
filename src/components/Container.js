import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const Container = ({children}) => {
    return (
        <Wrapper>
            <GlobalStyle />
            <Header />
            {children}
        </Wrapper>
    )
}

export default Container;
const GlobalStyle = createGlobalStyle`
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

body {
    background-color: #2D364F;
    color: #BDD4E7;
}
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;