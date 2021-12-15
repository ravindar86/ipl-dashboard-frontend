import React, { useEffect, useState } from 'react';

import './HomePage.scss';
import { TeamTile } from '../components/TeamTile';


export const HomePage = () => {

  const [teams, setTeams] = useState([]); // 'matches:[]' added for undefined error
  
  useEffect(
    () => {
      const fetchTeams = async () => {
        const response = await fetch(`http://localhost:8081/teams`); // Rest API call
        const data = await response.json();
        setTeams(data);     // set response to the team state
      };
      fetchTeams();
    }, []);

  return (
    <div className="HomePage">
      <div className="header-section">
        <h1 className='app-name'>IPL Dashboard</h1>
      </div>
      <div className='team-grid'>
         {teams.map(team => <TeamTile teamName={team.teamName} />)}
      </div>
    </div>
  );
}