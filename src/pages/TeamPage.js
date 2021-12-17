import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.scss';
import { wait, waitFor } from '@testing-library/react';

export const TeamPage = () => {

  const [team, setTeam] = useState({ matches: [] }); // 'matches:[]' added for undefined error
  const { teamName } = useParams();

  useEffect(
    () => {
      const fetchMatches = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/teams/${teamName}`); // Rest API call
        const data = await response.json();
        setTeam(data);     // set response to the team state
      };
      fetchMatches();
    }, [teamName]);

  if (!team || !team.teamName) {
    return <center><h1>Loading... Please wait...</h1></center>;
  }

  return (
    <div className="TeamPage">
      
      <div className="team-name-section">
        <h3 className='home-page-redirect'><Link to={`/`} > Home </Link></h3>
        <h1 className='team-name'>{team.teamName}</h1>
      </div>

      <div className="win-loss-section">
        Wins/Losses
        <PieChart
          data={[
            { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d' },           
            { title: 'Wins', value: team.totalWins, color: '#4da375' }
          ]}
        />
      </div>

      <div className='match-detail-section'>
         <h3>Latest Matches</h3>
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
      </div>

      {team.matches.slice(1).map(match => <MatchSmallCard match={match} teamName={team.teamName} key={match.id} />)}

      <div className='more-link'>
          <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>
            More >
          </Link>
      </div>
    </div>
  );
}