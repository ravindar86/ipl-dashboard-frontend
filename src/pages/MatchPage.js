import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { YearSelector } from '../components/YearSelector';

import './MatchPage.scss';

export const MatchPage = () => {

  const [matches, setMatches] = useState([]);  
  const {teamName, year}= useParams();
 
  useEffect(
    () => {
      const fetchMatches = async () => {
          console.log(teamName + " " + year);
        //const response = await fetch(`http://localhost:8081/teams/${teamName}/matches?year=${year}`); // Rest API call
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/teams/${teamName}/matches?year=${year}`); // Rest API call
        const data = await response.json();
        setMatches(data);     // set response to the matches state
      };
      fetchMatches();
    }, [teamName, year]);


  return (
    <div className="MatchPage">

      <div className='year-selector'>
        <h3 className='home-page-redirect'><Link to={`/`} > Home </Link></h3>
        <h3>Select Year</h3>
        <YearSelector teamName={teamName} />
      </div>
      <div>
        
      <div className="page-header-section">          
        <h1 className="page-heading">
          {teamName} matches in year {year}
        </h1>
        <Link className='team-link' to={`/teams/${teamName}`}>Team Page</Link>
      </div>

        {
            matches.map(match => <MatchDetailCard teamName={teamName} match={match} key={match.id} />)
        }
      </div>
    </div>
  );
}