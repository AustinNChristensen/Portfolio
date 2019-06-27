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

    // diagnol
    // background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2370d9f0' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");}
    // hideout
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2370bff0' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");*, *:before, *:after {
    margin: 0;
    padding: 0;
}
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;