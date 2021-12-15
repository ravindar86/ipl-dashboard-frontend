import React from 'react';
import { Link } from 'react-router-dom';

import './MatchDetailCard.scss';

export const MatchDetailCard = ({teamName, match}) => {
    if(!match) 
      return null;

    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    const otherTeamRoute = `/teams/${otherTeam}`;
    const isMatchWon = teamName===match.matchWinner;

    return (
     <div className={isMatchWon ? 'MatchDetailCard won-card' : 'MatchDetailCard lost-card'} >
       <div>         
          <span className='vs'>vs</span>
          <h1><Link to={otherTeamRoute}> {otherTeam} </Link></h1>
          <h2 className='match-date'>{match.date}</h2>
          <h4 className='match-venue'>at {match.venue}</h4>
          <h4 className='match-result'>{match.matchWinner} won by {match.resultMargin} {match.result}</h4>
       </div>

       <div className='additional-detail'>
          <h3>First Innings</h3>
          <p><Link to={`/teams/${match.team1}`}>{match.team1}</Link></p>
          <h3>Second Innings</h3>
          <p><Link to={`/teams/${match.team2}`}>{match.team2}</Link></p>
          <h3>Player of Match</h3>
          <p>{match.playerOfMatch}</p>
          <h3>Umpires</h3>
          <p>{match.umpire1},{match.umpire2}</p>
       </div>
     </div>
    );
  }