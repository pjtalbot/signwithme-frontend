import React, { useSate } from "react"
import { Link, NavLink } from "react-router-dom"

import Search from "./Search"

const HomePage = () => {
    return (
      <div>
        <div className="bg-light p-5 rounded">
            <div className="container text-center mt-5">
                <h1 className="display-4">Welcome to SignWithMe!</h1>
                <p className="lead">Discover and save sign language GIFs from talented creators through the Giphy API. Learn, share, and connect with our inclusive platform.</p>
                <p>Start your sign language journey today with SignWithMe!</p>
            </div>
        </div>
        <Search/>
        
      </div>  

      );
}

export default HomePage