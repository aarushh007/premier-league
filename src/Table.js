import React, {useEffect, useState} from 'react'

const Table = () => {
    const [standings, setStandings] = useState([])
    useEffect(() => {
        document.title = 'Premier League Table'
        const getData = async () => {
            fetch('https://site.api.espn.com/apis/v2/sports/soccer/eng.1/standings')
                .then((response) => response.json())
                .then((data) => setStandings(data.children[0].standings.entries))
        }
        getData()
    }, [])
    return (
        <div>
            <h1>Table</h1>
            <table className='main_table'>
            <thead>
            <tr className='wide_table'>
                    <th>Position</th>
                    <th>Club</th>
                    <th>Games Played</th>
                    <th>Games Won</th>
                    <th>Games Drawn</th>
                    <th>Games Lost</th>
                    <th>Goals For</th>
                    <th>Goals Against</th>
                    <th>Goal Difference</th>
                    <th>Points</th>
                </tr>
                <tr className='small_table'>
                    <th className='notverysmall'>Pos</th>
                    <th>Club</th>
                    <th>GP</th>
                    <th className='very_small_table'>WDL</th>
                    <th className='notverysmall'>W</th>
                    <th className='notverysmall'>D</th>
                    <th className='notverysmall'>L</th>
                    <th className='notverysmall'>GF</th>
                    <th className='notverysmall'>GA</th>
                    <th>GD</th>
                    <th>Pts</th>
                </tr>
            </thead>
            <tbody>
            {standings.length>0 && standings.map((team) => {
                return (
                    <tr>
                        <th className='notverysmall'>{team.stats[8].value}</th>
                        <th className='club'><span className='very_small_table'>{team.stats[8].value} ⋅ </span><img alt='logo' src={team.team.logos[0].href} width='30'></img><span className='notverysmall'>{team.team.name}</span><span className='very_small_table'>{team.team.abbreviation}</span></th>
                        <th>{team.stats[3].value}</th>
                        <th className='very_small_table wdl'>{team.stats[12].displayValue}</th>
                        <th className='notverysmall'>{team.stats[0].value}</th>
                        <th className='notverysmall'>{team.stats[2].value}</th>
                        <th className='notverysmall'>{team.stats[1].value}</th>
                        <th className='notverysmall'>{team.stats[4].value}</th>
                        <th className='notverysmall'>{team.stats[5].value}</th>
                        <th>{team.stats[9].value}</th>
                        <th>{team.stats[6].value}</th>
                    </tr>
                )
            })}
            </tbody>
            </table>
        </div>
    )
}

export default Table
