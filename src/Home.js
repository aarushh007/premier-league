import React from 'react'
import {useEffect, useState} from 'react';
import './Home.css';

const Home = () => {
    const [games, setGames] = useState([])
    const [news, setNews] = useState([])
    useEffect(() => {
        document.title = 'Premier League Home'
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
                if(json.events[0].status.type.detail.toString() !== 'FT') {
                    finalData.push(json.events[0].status.type.detail.toString().slice(0, -15))
                } else {
                    let date = new Date(json.events[0].date)
                    let todaysDate = new Date()
                    if(date.getDate() === todaysDate.getDate()){
                        finalData.push('Today')
                    } else {finalData.push('Recently')}
                }
                for (let j = 0; j < json.events.length; j++){
                    finalData.push(json.events[j]);
                }
            }
            setGames(finalData)
        }
        const getNews = async () => {
            fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/news')
                .then((response) => response.json())
                .then((data) => setNews(data.articles))
        }
        func()
        getNews()
    }, [])
    const removeFakeNews = () => {
        for(let i = 0; i < news.length; i++){
            if(news[i].images.length === 0){
                setNews(news.splice(i, 1))
            }
        }
    }
    removeFakeNews()
    const refreshData = async () => {
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
            if(json.events[0].status.type.detail.toString().slice(0, -15)) {
                finalData.push(json.events[0].status.type.detail.toString().slice(0, -15))
            } else {
                finalData.push('yo')
            }
            for (let j = 0; j < json.events.length; j++){
                finalData.push(json.events[j]);
            }
        }
        setGames(finalData)
    }
    return (
        <div className='home'>
            <div className="games">
            {games.length > 0 && games.map(game => {
                if (game.hasOwnProperty('status')) {
                    if (game.competitions[0].status.type.state === 'pre'){
                        return (
                            <a className='game_container' href={game.links[0].href} target='_blank' rel="noreferrer">
                                <div className='game'>
                                <div className='game_info'>
                                <h3>{game.competitions[0].competitors[0].team.abbreviation}</h3>
                                <img alt='img' src={game.competitions[0].competitors[0].team.logo} />
                                <p>{game.competitions[0].status.type.shortDetail.slice(6,12).replace('P', '').replace('A', '').replace(' ', '')}</p>
                                <img alt='img' src={game.competitions[0].competitors[1].team.logo} />
                                <h3>{game.competitions[0].competitors[1].team.abbreviation}</h3>
                                </div>
                            </div>
                            </a>
                        )
                    } else if (game.competitions[0].status.type.state === 'post'){
                        return (
                            <a className='game_container' href={game.links[0].href} target='_blank' rel="noreferrer">
                            <div className='game'>
                                <div className='game_info'>
                                <h3>{game.competitions[0].competitors[0].team.abbreviation}</h3>
                                <img alt='img' src={game.competitions[0].competitors[0].team.logo} />
                                <p>{game.competitions[0].competitors[0].score} - {game.competitions[0].competitors[1].score}</p>
                                <img alt='img' src={game.competitions[0].competitors[1].team.logo} />
                                <h3>{game.competitions[0].competitors[1].team.abbreviation}</h3>
                                </div>
                                <span>Full Time</span>
                            </div>
                            </a>
                        )
                    } else {
                        return (
                            <a className='game_container' href={game.links[0].href} target='_blank' rel="noreferrer">
                            <div className='game'>
                                <div className='game_info'>
                                <h3>{game.competitions[0].competitors[0].team.abbreviation}</h3>
                                <img alt='img' src={game.competitions[0].competitors[0].team.logo} />
                                <p>{game.competitions[0].competitors[0].score} - {game.competitions[0].competitors[1].score}</p>
                                <img alt='img' src={game.competitions[0].competitors[1].team.logo} />
                                <h3>{game.competitions[0].competitors[1].team.abbreviation}</h3>
                                </div>
                                <span>{game.competitions[0].status.type.detail}</span>
                            </div>
                            </a>
                        )
                    }
                } else {
                    return (
                        <div className='matchday'>
                            <span>{game}</span>
                            {games.indexOf(game) === 0 && <button className='refresh_button' onClick={() => {
                                refreshData();
                            }}>Refresh <i class="fas fa-sync-alt"></i></button>}
                        </div>
                    )
                }
            })}
            </div>
            <div class='news'>
                {news.length > 0 && news.map(article => {
                    return (
                        <div className='art_container'>
                        {article.images.length > 0 && <div class='article'>
                        <img alt='img' className='news_img' src={article.images[0].url} />
                        <a href={article.links.web.href} target='_blank' rel="noreferrer">{article.headline}</a>
                        </div>}
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Home;
