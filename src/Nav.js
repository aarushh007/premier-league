import React, {useState} from 'react'
import {Link}  from "react-router-dom";
import logo from './logo.png';
import './Nav.css'

const Nav = () => {
    const [menu, setMenu] = useState(false)
    return (
        <div className="navbar">
            <Link to='/'><img alt='img' className='pl_logo' src={logo}></img></Link>
            <Link to='/' className='wide'>Home</Link>
            <Link to='/table' className='wide'>Table</Link>
            <Link to='/fixtures' className='wide'>Fixtures</Link>
            <Link to='/' className='wide'>Results</Link>
            <Link to='/' className='wide'>Stats</Link>
            <Link to='/' className='wide'>Rosters</Link>
            <i onClick={() => setMenu(!menu)} className="fas fa-bars mobile"></i>
            {menu && (
                <div className="dropdown">
                    <Link to='/'>Home</Link>
                    <Link to='/table'>Table</Link>
                    <Link to='/fixtures'>Fixtures</Link>
                    <Link to='/'>Results</Link>
                    <Link to='/'>Stats</Link>
                    <Link to='/'>Rosters</Link>
                </div>
            )}
        </div>
    )
}

export default Nav
