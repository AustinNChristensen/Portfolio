import React from "react";
import { StaticQuery, graphql, Link } from 'gatsby';
const TitleAndDescription = ({ data }) => {
    const { siteMetadata } = data.site;
    const title = siteMetadata.title;
    const description = siteMetadata.description;
    const menuLinks = siteMetadata.menuLinks;
    return (
        <>
        <nav>
            {menuLinks.map((link, index) => {
                return (
                    <li key={index}>
                        <Link to={link.link}>{link.name}</Link>
                    </li>
                )
            })}
        </nav>
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

export default Header;