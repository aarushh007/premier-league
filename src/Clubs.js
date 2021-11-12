import React, {useState, useEffect} from 'react';
import './Clubs.css';
import { Link} from 'react-router-dom'

const Clubs = () => {
    const [teams, setTeams] = useState([])
    useEffect(() => {
        document.querySelector('meta[name=description]').setAttribute('content', 'All Premier League Clubs')
        document.title = 'Premier League Clubs'
        const getData = async () => {
            fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/teams')
                .then((data) => data.json())
                .then((data) => setTeams(data.sports[0].leagues[0].teams))
        }
        getData()
    },[])
    return (
        <div>
            <div className='teams'>
            {teams && (
                teams.map(team => {
                    return (
                        <Link to={`/clubs/${team.team.id}`} className='team' style={{backgroundColor: `#${team.team.color}`}}>
                            <div className='img_wrapper'><img alt='team logo' src={team.team.logos[0].href} /></div>
                            <div className='teamname_wrapper'>
                            <h3 style={{color: (team.team.shortDisplayName === 'Leeds' || team.team.shortDisplayName === 'Norwich' || team.team.shortDisplayName === 'Tottenham' || team.team.shortDisplayName === 'Watford' || team.team.shortDisplayName === 'Wolves') && '#333333'}}>{team.team.shortDisplayName}</h3>
                            <div className='team_link_wrapper'><Link className='link_lineup' to={`/clubs/${team.team.id}`} style={{color: (team.team.shortDisplayName === 'Leeds' || team.team.shortDisplayName === 'Norwich' || team.team.shortDisplayName === 'Tottenham' || team.team.shortDisplayName === 'Watford' || team.team.shortDisplayName === 'Wolves') && '#333333'}}>Club Profile</Link><i style={{color: (team.team.shortDisplayName === 'Leeds' || team.team.shortDisplayName === 'Norwich' || team.team.shortDisplayName === 'Tottenham' || team.team.shortDisplayName === 'Watford' || team.team.shortDisplayName === 'Wolves') && '#333333'}} class="fas fa-long-arrow-alt-right"></i></div>
                            </div>
                        </Link>
                    )
                })
            )}
            </div>
        </div>
    )
}

export default Clubs
