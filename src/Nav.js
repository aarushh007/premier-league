import React from 'react'
import {Link}  from "react-router-dom";
import logo from './logo.png';

const Nav = () => {
    return (
        <div className="navbar">
            <Link to='/'><img alt='img' className='pl_logo' src={logo}></img></Link>
            <Link to='/'>Home</Link>
            <Link to='/'>Table</Link>
            <Link to='/'>Stats</Link>
            <Link to='/'>Rosters</Link>
        </div>
    )
}

export default Nav
