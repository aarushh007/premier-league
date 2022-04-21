import React, {useState} from 'react'
import {Link}  from "react-router-dom";
import eng_logo from './eng_logo.png';
import esp_logo from './esp_logo.png';
import ita_logo from './ita_logo.png';
import ger_logo from './ger_logo.png'
import './Nav.css'

const Nav = () => {
    const [menu, setMenu] = useState(false)
    const change_league = (e) => {
        if(e.target.value === 'joe'){
            return;
        }
        localStorage.setItem('league', e.target.value)
        document.querySelector('#switch_league').value = 'joe'
        switch(localStorage.getItem('league')){
            case 'eng':
                localStorage.setItem('league_name', 'Premier League')
                break;
            case 'esp':
                localStorage.setItem('league_name', 'La Liga')
                break;
            case 'ita':
                localStorage.setItem('league_name', 'Serie A')
                break;
            case 'ger':
                localStorage.setItem('league_name', 'Bundesliga')
                break;
            default:
                localStorage.setItem('league_name', 'football')
        }
        if (window.location.pathname.match(/\/clubs\/\d+/)){
            window.location.replace(`${window.location.origin}/clubs`)
        } else {
            window.location.reload()
        }
    }
    return (
        <div className="navbar">
            <Link id='logo' to='/'>
                {localStorage.getItem('league') === 'eng' && <img alt='img' className='pl_logo' src={eng_logo}></img>}
                {localStorage.getItem('league') === 'esp' && <img alt='img' className='pl_logo' src={esp_logo}></img>}
                {localStorage.getItem('league') === 'ita' && <img alt='img' className='pl_logo' src={ita_logo}></img>}
                {localStorage.getItem('league') === 'ger' && <img alt='img' className='pl_logo' src={ger_logo}></img>}
            </Link>
            <Link to='/' className='wide'>Home</Link>
            <Link to='/table' className='wide'>Table</Link>
            <Link to='/clubs' className='wide'>Clubs</Link>
            <Link to='/' className='wide'>Fixtures</Link>
            <Link to='/' className='wide'>Results</Link>
            <Link to='/' className='wide'>Stats</Link>
            <select id='switch_league' onChange={(e) => {change_league(e)}}>
                <option value='joe'>Switch League</option>
                <option value='eng'>Premier League</option>
                <option value='esp'>La Liga</option>
                <option value='ita'>Serie A</option>
                <option value='ger'>Bundesliga</option>
            </select>
            
            <i onClick={() => setMenu(!menu)} className="fas fa-bars mobile"></i>
            {menu && (
                <div className="dropdown">
                    <Link onClick={() => {setMenu(!menu)}} to='/'>Home</Link>
                    <Link onClick={() => {setMenu(!menu)}} to='/table'>Table</Link>
                    <Link onClick={() => {setMenu(!menu)}} to='/clubs'>Clubs</Link>
                    <Link onClick={() => {setMenu(!menu)}} to='/fixtures'>Fixtures</Link>
                    <Link onClick={() => {setMenu(!menu)}} to='/'>Results</Link>
                    <Link onClick={() => {setMenu(!menu)}} to='/'>Stats</Link>
                </div>
            )}
        </div>
    )
}

export default Nav
