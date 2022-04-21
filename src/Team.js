import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import oops from './oops.jpeg'
import './Team.css'

const Team = () => {
    let {team_id} = useParams();
    const [data, setData] = useState();
    const [fixture, setFixture] = useState();
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${localStorage.getItem('league')}.1/teams/${team_id}/roster`)
            if(res.status === 200){
                const j = await res.json()
                document.title = j.team.name;
                setData(j)
                const fixtureData = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${localStorage.getItem('league')}.1/teams/${team_id}`)
                const fixtureJson = await fixtureData.json()
                setFixture(fixtureJson.team.nextEvent[0])
            } else {
                setData('ERROR')
                return;
            }
        }
        getData()
    }, [team_id])
    let color_class = 'white';
    return (
        <div>
            <div>
                {data === 'ERROR' && (
                    <div>
                        <h1>OOPS! There was a problem :(</h1>
                        <img id='error_img' src={oops} alt='oops'></img>
                    </div>
                )}
                {(data !== 'ERROR' && data && fixture) && (
                    <div>
                        <div className='club_info'>
                        <div className='club_img_wrapper'>
                        <img alt='team logo' src={data.team.logo} />
                        </div>
                        <div className='club_info_container'>
                            <h1 className={`${color_class}`}>{data.team.name}</h1>
                            <span className={`${color_class}`}>{data.team.recordSummary} this season</span>
                            <span className={`${color_class}`}>{data.team.standingSummary}</span>
                        </div>
                        </div>
                            {fixture.competitions[0].status.type.state === 'pre' && (
                                <div className='next_fixture'>
                                <h2>Next Fixture</h2>
                                <span className='club_small'>{new Date(fixture.date).toDateString().slice(0, 10)}</span>
                                <a target='_blank' rel="noreferrer" href={fixture.links[0].href} className='club_fixture'>
                                    <span className='club_wide'>{new Date(fixture.date).toDateString().slice(0, 10)}</span>
                                    <div className='club_fixture_info'>{fixture.competitions[0].competitors[0].team.shortDisplayName} <img className='club_logo' alt='logo' src={fixture.competitions[0].competitors[0].team.logos[0].href} /> <span id='club_fixture_time'>{new Date(fixture.date).toTimeString().slice(0,5)}</span><img className='club_logo' alt='logo' src={fixture.competitions[0].competitors[1].team.logos[0].href} />{fixture.competitions[0].competitors[1].team.shortDisplayName}</div>
                                    <span className='club_wide'>{fixture.competitions[0].venue.fullName}</span>
                                </a>    
                                </div>
                            )}
                            {fixture.competitions[0].status.type.state === 'post' && (
                                <div className='next_fixture'>
                                <h2>Last Fixture</h2>
                                <span className='club_small'>{new Date(fixture.date).toDateString().slice(0, 10)}</span>
                                <a target='_blank' rel="noreferrer" href={fixture.links[0].href} className='club_fixture'>
                                    <span className='club_wide'>{new Date(fixture.date).toDateString().slice(0, 10)}</span>
                                    <div className='club_fixture_info'>{fixture.competitions[0].competitors[0].team.shortDisplayName} <img className='club_logo' alt='logo' src={fixture.competitions[0].competitors[0].team.logos[0].href} /> <span id='club_fixture_time'>{fixture.competitions[0].competitors[0].score} - {fixture.competitions[0].competitors[1].score}</span><img className='club_logo' alt='logo' src={fixture.competitions[0].competitors[1].team.logos[0].href} />{fixture.competitions[0].competitors[1].team.shortDisplayName}</div>
                                    <span className='club_wide'>{fixture.competitions[0].venue.fullName}</span>
                                </a> 
                                </div>
                            )}
                            {fixture.competitions[0].status.type.state === 'in' && (
                                <div className='next_fixture'>
                                <h2>Current Fixture</h2>
                                <span className='club_small'>{new Date(fixture.date).toDateString().slice(0, 10)}</span>
                                <a target='_blank' rel="noreferrer" href={fixture.links[0].href} className='club_fixture'>
                                    <span className='club_wide'>{new Date(fixture.date).toDateString().slice(0, 10)}</span>
                                    <div className='club_fixture_info'>{fixture.competitions[0].competitors[0].team.shortDisplayName} <img className='club_logo' alt='logo' src={fixture.competitions[0].competitors[0].team.logos[0].href} /> <div className='club_current_match'><span id='club_fixture_time'>{fixture.competitions[0].competitors[0].score} - {fixture.competitions[0].competitors[1].score}</span><span>{fixture.competitions[0].status.type.detail}</span></div><img className='club_logo' alt='logo' src={fixture.competitions[0].competitors[1].team.logos[0].href} />{fixture.competitions[0].competitors[1].team.shortDisplayName}</div>
                                    <span className='club_wide'>{fixture.competitions[0].venue.fullName}</span>
                                </a> 
                                </div>
                            )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Team
