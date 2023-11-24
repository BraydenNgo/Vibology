import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return(
        <nav className='nav-bar'>
            <Link to="/">Dashboard</Link>
            <Link to="/analyzer">Analyzer</Link>
            <Link to="/playlists">Playlists</Link>
            <Link to="/about">About</Link>
        </nav>
    );
}
export default Navbar;