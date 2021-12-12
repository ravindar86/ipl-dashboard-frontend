import './App.css';
import {TeamPage} from './pages/TeamPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import { MatchPage } from './pages/MatchPage';

function App() {
  return (
   <div className="App">
     <Router>
       <Routes>
        <Route path="/teams/:teamName/matches/:year" element={<MatchPage />} /> 
        <Route path="/teams/:teamName" element={<TeamPage />} />            
       </Routes>        
     </Router>
     
   </div>
  );
}

export default App;
