import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {

  const [team, setTeam] = useState({ matches: [] }); // 'matches:[]' added for undefined error
  const { teamName } = useParams();

  useEffect(
    () => {
      const fetchMatches = async () => {
        console.log(teamName);
        const response = await fetch(`http://localhost:8081/teams/${teamName}`); // Rest API call
        const data = await response.json();
        setTeam(data);     // set response to the team state

      };
      fetchMatches();
    }, [teamName]);

  if (!team || !team.teamName) {
    return <h1>Team Name Not Found</h1>;
  }

  return (
    <div className="TeamPage">

      <h1>{team.teamName}</h1>

      <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />

      {team.matches.slice(1).map(match => <MatchSmallCard match={match} teamName={team.teamName} key={match.id} />)}

    </div>
  );
}