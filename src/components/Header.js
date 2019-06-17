import React from "react";
import styled from 'styled-components';
import { StaticQuery, graphql, Link } from 'gatsby';
const TitleAndDescription = ({ data }) => {
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
            <h2>{title}</h2>
            <p>{description}</p>
        </>
    )
}
const Header = () => {
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
            render={data => <TitleAndDescription data={data} />}
        />
    )
};

const StyledNav = styled.nav`
    display: flex;
    flex-direction: row;
    list-style-type: none;
    margin-top: 20px;
`

const StyledItem = styled.li`
    &:not(:first-child){
        margin-left: 20px;
    }
    color: #C0D9ED;
    & > a {
        color: #C0D9ED;
    }

`
export default Header;