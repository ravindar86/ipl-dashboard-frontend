import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';

export const MatchPage = () => {

  const [matches, setMatches] = useState([]);  
  const {teamName, year}= useParams();
 
  useEffect(
    () => {
      const fetchMatches = async () => {
          console.log(teamName + " " + year);
        const response = await fetch(`http://localhost:8081/teams/${teamName}/matches?year=${year}`); // Rest API call
        const data = await response.json();
        setMatches(data);     // set response to the matches state
      };
      fetchMatches();
    }, [teamName, year]);


  return (
    <div className="MatchPage">
        <h1>Match Page</h1>
        {
            matches.map(match => <MatchDetailCard teamName={teamName} match={match} key={match.id} />)
        }
    </div>
  );
}