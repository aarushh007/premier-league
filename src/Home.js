import React from 'react'
import {useEffect, useState} from 'react';

const Home = () => {
    const [games, setGames] = useState([])
    const [news, setNews] = useState([])
    const [standings, setStandings] = useState([])
    useEffect(() => {
        const func = async () => {
            let r = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard');
            let json = await r.json()
            let today = json.day.date
            let allDays = json.leagues[0].calendar;
            let todayIndex = 0;
            let gameDays = []
            for (let i = 0; i< allDays.length; i++) {
                if (allDays[i].includes(today)){
                    todayIndex = i
                    gameDays.push(todayIndex)
                    gameDays.push(todayIndex + 1)
                    gameDays.push(todayIndex + 2)
                }
            }
            let matchDays = []
            for (let i = 0; i < gameDays.length; i++){
                matchDays.push(json.leagues[0].calendar[gameDays[i]])
            }
            for (let i = 0; i < matchDays.length; i++){
                matchDays[i] = matchDays[i].slice(0, 10).replace('-', '').replace('-', '')
                
            }
            let finalData = []
            for (let i = 0; i<matchDays.length;i++){
                let r = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard?dates=${matchDays[i]}`);
                let json = await r.json()
                finalData.push(json.events[0].status.type.detail)
                for (let j = 0; j < json.events.length; j++){
                    finalData.push(json.events[j]);
                }
            }
            setGames(finalData)
        }
        const news = async () => {
            fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/news')
                .then((response) => response.json())
                .then((data) => setNews(data.articles))
        }
        const table = async () => {
            fetch('https://site.api.espn.com/apis/v2/sports/soccer/eng.1/standings')
                .then((response) => response.json())
                .then((data) => setStandings(data.children[0].standings.entries))
        }
        func()
        news()
        table()
    }, [])
    return (
        <div className='home'>
            <div className="games">
            {games.length > 0 && games.map(game => {
                if (game.hasOwnProperty('status')) {
                    if (game.competitions[0].status.type.state === 'pre'){
                        return (
                            <a href={game.links[0].href} target='_blank' rel="noreferrer">
                                <div className='game'>
                                <h3>{game.competitions[0].competitors[0].team.abbreviation}</h3>
                                <img alt='img' src={game.competitions[0].competitors[0].team.logo} />
                                <p>{game.competitions[0].status.type.shortDetail.slice(7,13).replace('P', '')}</p>
                                <img alt='img' src={game.competitions[0].competitors[1].team.logo} />
                                <h3>{game.competitions[0].competitors[1].team.abbreviation}</h3>
                            </div>
                            </a>
                        )
                    } else if (game.competitions[0].status.type.state === 'post'){
                        return (
                            <a href={game.links[0].href} target='_blank' rel="noreferrer">
                            <div className='game'>
                                <h3>{game.competitions[0].competitors[0].team.abbreviation}</h3>
                                <img alt='img' src={game.competitions[0].competitors[0].team.logo} />
                                <p>{game.competitions[0].competitors[0].score} - {game.competitions[0].competitors[1].score}</p>
                                <img alt='img' src={game.competitions[0].competitors[1].team.logo} />
                                <h3>{game.competitions[0].competitors[1].team.abbreviation}</h3>
                                <span>Full Time</span>
                            </div>
                            </a>
                        )
                    } else {
                        return (
                            <a href={game.links[0].href} target='_blank' rel="noreferrer">
                            <div className='game'>
                                <h3>{game.competitions[0].competitors[0].team.abbreviation}</h3>
                                <img alt='img' src={game.competitions[0].competitors[0].team.logo} />
                                <p>{game.competitions[0].competitors[0].score} - {game.competitions[0].competitors[1].score}</p>
                                <img alt='img' src={game.competitions[0].competitors[1].team.logo} />
                                <h3>{game.competitions[0].competitors[1].team.abbreviation}</h3>
                                <span>{game.competitions[0].status.type.description}</span>
                            </div>
                            </a>
                        )
                    }
                } else {
                    return (
                        <div class='matchday'>
                            {game.toString().slice(0, -15)}
                        </div>
                    )
                }
            })}
            </div>
            <div class='news'>
                {news.length > 0 && news.map(article => {
                    return (
                        <div class='article'>
                            <img alt='img' className='news_img' src={article.images[0].url} />
                        <a href={article.links.web.href} target='_blank' rel="noreferrer">{article.headline}</a>
                        </div>
                        )
                })}
            </div>
            {standings.length > 0 && (
                <div class='simple_table'>
                <table>
                    <thead>
                        <th>Pos.</th>
                        <th>Team</th>
                        <th>Pts.</th>
                    </thead>
                    <tbody>
                        {standings.map(team => {
                            return (
                                <tr>
                                    <th>{standings.indexOf(team) + 1}</th>
                                    <th className='club_simple'>{team.team.name}</th>
                                    <th>{team.stats[6].displayValue}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    )
}

export default Home;
