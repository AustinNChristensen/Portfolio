import React from "react";
import styled from 'styled-components';
import { StaticQuery, graphql, Link } from 'gatsby';
const TitleAndDescription = ({ data, changeMode, mode }) => {
    const { siteMetadata } = data.site;
    const title = siteMetadata.title;
    const description = siteMetadata.description;
    const menuLinks = siteMetadata.menuLinks;
    return (
        <>
        <StyledNav>
            {menuLinks.map((link, index) => {
                return (
                    <StyledItem key={index}>
                        <Link to={link.link}>{link.name}</Link>
                    </StyledItem>
                )
            })}
        </StyledNav>
            {/* <SiteTitle>{title}</SiteTitle> */}
            {/* <p>{description}</p> */}
        </>
    )
}
const Header = ({ changeMode, mode }) => {
    return (
        <StaticQuery
            query={graphql`
            query {
                site {
                    siteMetadata {
                      title
                      description
                      menuLinks {
                          name
                          link
                      }
                    }
                } 
            }
            `}
            render={data => <TitleAndDescription mode={mode} changeMode={changeMode} data={data} />}
        />
    )
};
const StyledNav = styled.nav`
    background: ${props => props.theme.background};
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    list-style-type: none;
    margin-top: 20px;
    margin-bottom: 20px;
    color: ${props => props.theme.text};
`
const SiteTitle = styled.h2`
    color: ${props => props.theme.brandColor};
`;
const StyledItem = styled.li`
    &:not(:first-child){
        margin-left: 20px;
    }
    & > a {
        color: ${props => props.theme.text};
    }

`
export default Header;