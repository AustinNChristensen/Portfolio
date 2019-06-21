import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';
import { Footer } from './Footer';
import { Themes } from './Theme';

const Container = ({children}) => {
    const [mode, setMode] = useState('dark');
    const switchTheme = () => {
        if(mode === 'light') {
            setMode('dark');
        } else {
            setMode('light');
        }
    }
    const theme = mode === 'light' ? Themes.light : Themes.dark;
    return (
        <ThemeProvider theme={theme}>
            <Wrapper>
                <GlobalStyle />
                <Header />
                {children}
                <Footer changeMode={() => switchTheme()} mode={mode} />
            </Wrapper>
        </ThemeProvider>
    )
}

export default Container;
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

body {
    font-family: 'Lato', sans-serif;

    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
}
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;