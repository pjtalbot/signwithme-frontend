import React from "react"
import { NavLink } from "react-router-dom"

import "./NavBar.css"



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