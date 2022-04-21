import React, {useState, useEffect} from 'react';
import './Clubs.css';
import { Link} from 'react-router-dom'

const Clubs = () => {
    const [teams, setTeams] = useState([])
    useEffect(() => {
        let my_league = localStorage.getItem('league')
        let my_league_name = localStorage.getItem('league_name')
        document.querySelector('meta[name=description]').setAttribute('content', `${my_league_name} Clubs`)
        document.title = `${localStorage.getItem('league_name')} Clubs`
        const getData = async () => {
            fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${my_league}.1/teams`)
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
                            <h3 style={{color: (team.team.shortDisplayName === 'Villarreal' || team.team.shortDisplayName === 'Leeds' || team.team.shortDisplayName === 'Norwich' || team.team.shortDisplayName === 'Tottenham' || team.team.shortDisplayName === 'Watford' || team.team.shortDisplayName === 'Wolves' || team.team.shortDisplayName === 'Celta Vigo' || team.team.shortDisplayName === 'Cádiz' || team.team.shortDisplayName === 'Elche' || team.team.shortDisplayName === 'Rayo' || team.team.shortDisplayName === 'Real Madrid' || team.team.shortDisplayName === 'Sevilla' || team.team.shortDisplayName === 'Valencia' || team.team.shortDisplayName === 'Juventus' || team.team.shortDisplayName === 'Spezia' || team.team.shortDisplayName === 'Dortmund' || team.team.shortDisplayName === 'Gladbach' || team.team.shortDisplayName === 'Cologne' || team.team.shortDisplayName === 'Stuttgart' || team.team.shortDisplayName === 'Wolfsburg') && '#333333'}}>{team.team.shortDisplayName}</h3>
                            <div className='team_link_wrapper'><Link className='link_lineup' to={`/clubs/${team.team.id}`} style={{color: (team.team.shortDisplayName === 'Villarreal' || team.team.shortDisplayName === 'Leeds' || team.team.shortDisplayName === 'Norwich' || team.team.shortDisplayName === 'Tottenham' || team.team.shortDisplayName === 'Watford' || team.team.shortDisplayName === 'Wolves' || team.team.shortDisplayName === 'Celta Vigo' || team.team.shortDisplayName === 'Cádiz' || team.team.shortDisplayName === 'Elche' || team.team.shortDisplayName === 'Rayo' || team.team.shortDisplayName === 'Real Madrid' || team.team.shortDisplayName === 'Sevilla' || team.team.shortDisplayName === 'Valencia' || team.team.shortDisplayName === 'Juventus' || team.team.shortDisplayName === 'Spezia' || team.team.shortDisplayName === 'Dortmund' || team.team.shortDisplayName === 'Gladbach' || team.team.shortDisplayName === 'Cologne' || team.team.shortDisplayName === 'Stuttgart' || team.team.shortDisplayName === 'Wolfsburg') && '#333333'}}>Club Profile</Link><i style={{color: (team.team.shortDisplayName === 'Villarreal' || team.team.shortDisplayName === 'Leeds' || team.team.shortDisplayName === 'Norwich' || team.team.shortDisplayName === 'Tottenham' || team.team.shortDisplayName === 'Watford' || team.team.shortDisplayName === 'Wolves' || team.team.shortDisplayName === 'Celta Vigo' || team.team.shortDisplayName === 'Cádiz' || team.team.shortDisplayName === 'Elche' || team.team.shortDisplayName === 'Rayo' || team.team.shortDisplayName === 'Real Madrid' || team.team.shortDisplayName === 'Sevilla' || team.team.shortDisplayName === 'Valencia' || team.team.shortDisplayName === 'Juventus' || team.team.shortDisplayName === 'Spezia' || team.team.shortDisplayName === 'Dortmund' || team.team.shortDisplayName === 'Gladbach' || team.team.shortDisplayName === 'Cologne' || team.team.shortDisplayName === 'Stuttgart' || team.team.shortDisplayName === 'Wolfsburg') && '#333333'}} class="fas fa-long-arrow-alt-right"></i></div>
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
