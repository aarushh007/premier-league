import React, {useEffect, useState} from 'react'

const Table = () => {
    const [standings, setStandings] = useState([])
    useEffect(() => {
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
                <tr>
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
            </thead>
            <tbody>
            {standings.length>0 && standings.map((team) => {
                return (
                    <tr>
                        <th>{team.stats[8].value}</th>
                        <th className='club'><img alt='logo' src={team.team.logos[0].href} width='30'></img>{team.team.name}</th>
                        <th>{team.stats[3].value}</th>
                        <th>{team.stats[0].value}</th>
                        <th>{team.stats[2].value}</th>
                        <th>{team.stats[1].value}</th>
                        <th>{team.stats[4].value}</th>
                        <th>{team.stats[5].value}</th>
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
