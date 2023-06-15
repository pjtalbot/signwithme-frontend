import React from "react"
import { NavLink } from "react-router-dom"

import "./NavBar.css"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavBar = () => {
    return (
        
            <nav className="NavBar">
                
                    <NavLink exact to="/">Home</NavLink>
                <NavLink exact to="/profile">Favorites</NavLink>
                <NavLink exact to="/search">Search</NavLink>
            </nav>
        
    )
}

export default NavBar